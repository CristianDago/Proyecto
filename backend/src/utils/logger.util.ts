import path from "path";
import fs from "fs";
import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

const __dirname = import.meta.dirname;

const logDir = path.join(__dirname, "../../logs");

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const transportFile = new DailyRotateFile({
  filename: "app-%DATE%.log",
  dirname: logDir,
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "14d",
  level: "info",
});

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",

  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message}`;
    })
  ),

  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
      level: process.env.NODE_ENV === "production" ? "info" : "debug",
    }),

    transportFile,
  ],

  exceptionHandlers: [
    new DailyRotateFile({
      filename: "exceptions-%DATE%.log",
      dirname: logDir,
      datePattern: "YYYY-MM-DD",
      zippedArchive: true,
      maxSize: "10m",
      maxFiles: "7d",
    }),
  ],
  rejectionHandlers: [
    new DailyRotateFile({
      filename: "rejections-%DATE%.log",
      dirname: logDir,
      datePattern: "YYYY-MM-DD",
      zippedArchive: true,
      maxSize: "10m",
      maxFiles: "7d",
    }),
  ],
});

export default logger;
