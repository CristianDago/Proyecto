import "dotenv/config";
import express from "express";
import cors from "cors";
import userRoute from "./routes/user.route";
import studentRoute from "./routes/student.route";
import authRoute from "./routes/auth.route";
import { httpErrorHandle } from "./middlewares/http.error.handle.middleware";
import rateLimit from "express-rate-limit";
import openapiSpecification from "./config/swagger";
import swaggerUi from "swagger-ui-express";
import morgan from "morgan";

const app = express();

app.use(morgan("dev"));

const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  methods: process.env.CORS_METHODS?.split(","),
  allowedHeaders: process.env.CORS_HEADERS?.split(","),
};
app.use(cors(corsOptions));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification));

app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message:
    "Demasiadas solicitudes desde esta IP, por favor inténtalo más tarde.",
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/students", studentRoute);

app.use(httpErrorHandle);

export default app;
