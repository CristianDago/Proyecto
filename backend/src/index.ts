import "dotenv/config";
import app from "./app";
import { sequelizeStudent, sequelizeUser } from "./config/sequelize";
import { createServer } from "http";
import logger from "./utils/logger.util";

const port = process.env.PORT || 3000;

const server = createServer(app);

const main = async () => {
  try {
    await sequelizeUser.authenticate();
    await sequelizeUser.sync();
    logger.info("Base de datos userdb conectada.");
  } catch (error) {
    logger.error("Error conectando a userdb:", error);
    process.exit(1);
  }

  try {
    await sequelizeStudent.authenticate();
    await sequelizeStudent.sync();
    logger.info("Base de datos profiledb conectada.");
  } catch (error) {
    logger.error("Error conectando a profiledb:", error);
    process.exit(1);
  }

  server.listen(port, () => {
    logger.info(`Servidor encendido en puerto ${port}`);
  });

  const gracefulShutdown = async (signal: string) => {
    logger.info(`${signal} recibida. Iniciando apagado...`);

    try {
      await new Promise<void>((resolve, reject) => {
        server.close((err) => {
          if (err) {
            logger.error("Error cerrando el servidor HTTP:", err);
            return reject(err);
          }
          logger.info("Servidor HTTP cerrado.");
          resolve();
        });
      });

      await sequelizeUser.close();
      logger.info("Conexión a userdb cerrada.");
      await sequelizeStudent.close();
      logger.info("Conexión a profiledb cerrada.");

      await new Promise<void>((resolve) => {
        logger.on("finish", () => {
          logger.info("Todos los logs han sido vaciados al disco.");
          resolve();
        });
        logger.end();
      });
      process.exit(0);
    } catch (error) {
      logger.error("Error durante el apagado elegante:", error);
      process.exit(1);
    }
  };
  process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
  process.on("SIGINT", () => gracefulShutdown("SIGINT"));
};

main();
