import 'dotenv/config';
import express, { Router } from 'express';
import cors from 'cors';
import { IsUUID, PrimaryKey, Default, DataType, Column, AllowNull, Unique, Model, Table, BeforeCreate, BeforeUpdate, Sequelize } from 'sequelize-typescript';
import moment from 'moment-timezone';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path, { dirname } from 'path';
import { google } from 'googleapis';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import multer from 'multer';
import Joi from 'joi';
import winston from 'winston';
import rateLimit from 'express-rate-limit';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import morgan from 'morgan';
import { createServer } from 'http';
import { Server } from 'socket.io';

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};
let User = class extends Model {
};
__decorateClass([
  IsUUID(4),
  PrimaryKey,
  Default(DataType.UUIDV4),
  Column(DataType.UUID)
], User.prototype, "id", 2);
__decorateClass([
  AllowNull(false),
  Unique,
  Column(DataType.STRING)
], User.prototype, "email", 2);
__decorateClass([
  AllowNull(false),
  Column(DataType.STRING)
], User.prototype, "password", 2);
__decorateClass([
  AllowNull(false),
  Column(DataType.STRING)
], User.prototype, "role", 2);
User = __decorateClass([
  Table
], User);
let Student = class extends Model {
  static adjustDates(instance) {
    const adjustDateToChileTimezone = (date) => {
      return moment(date).tz("America/Santiago").toDate();
    };
    if (instance.birthdate) {
      instance.birthdate = adjustDateToChileTimezone(instance.birthdate);
    }
    if (instance.contactDate) {
      instance.contactDate = adjustDateToChileTimezone(instance.contactDate);
    }
  }
};
__decorateClass([
  IsUUID(4),
  PrimaryKey,
  Default(DataType.UUIDV4),
  Column(DataType.UUID)
], Student.prototype, "id", 2);
__decorateClass([
  AllowNull(true),
  Column(DataType.STRING)
], Student.prototype, "email", 2);
__decorateClass([
  AllowNull(false),
  Column(DataType.STRING)
], Student.prototype, "name", 2);
__decorateClass([
  AllowNull(false),
  Column(DataType.STRING)
], Student.prototype, "lastname", 2);
__decorateClass([
  Column(DataType.STRING)
], Student.prototype, "rut", 2);
__decorateClass([
  Column(DataType.DATE)
], Student.prototype, "birthdate", 2);
__decorateClass([
  Column(DataType.STRING)
], Student.prototype, "sex", 2);
__decorateClass([
  Column(DataType.TEXT)
], Student.prototype, "address", 2);
__decorateClass([
  Column(DataType.STRING)
], Student.prototype, "nationality", 2);
__decorateClass([
  Column(DataType.STRING)
], Student.prototype, "source", 2);
__decorateClass([
  Column(DataType.TEXT)
], Student.prototype, "contact", 2);
__decorateClass([
  AllowNull(true),
  Column(DataType.STRING)
], Student.prototype, "phone", 2);
__decorateClass([
  Column(DataType.DATE)
], Student.prototype, "contactDate", 2);
__decorateClass([
  Column(DataType.STRING)
], Student.prototype, "call1", 2);
__decorateClass([
  Column(DataType.STRING)
], Student.prototype, "call2", 2);
__decorateClass([
  Column(DataType.STRING)
], Student.prototype, "call3", 2);
__decorateClass([
  Column(DataType.STRING)
], Student.prototype, "comments1", 2);
__decorateClass([
  Column(DataType.STRING)
], Student.prototype, "comments2", 2);
__decorateClass([
  Column(DataType.STRING)
], Student.prototype, "comments3", 2);
__decorateClass([
  Column(DataType.STRING)
], Student.prototype, "positiveFeedback", 2);
__decorateClass([
  Column(DataType.TEXT)
], Student.prototype, "linkDni", 2);
__decorateClass([
  Column(DataType.TEXT)
], Student.prototype, "birthCertificate", 2);
__decorateClass([
  Column(DataType.TEXT)
], Student.prototype, "studyCertificate", 2);
__decorateClass([
  Column(DataType.TEXT)
], Student.prototype, "studentImage", 2);
__decorateClass([
  Column(DataType.STRING)
], Student.prototype, "school", 2);
__decorateClass([
  Column(DataType.STRING)
], Student.prototype, "course", 2);
__decorateClass([
  Column(DataType.STRING)
], Student.prototype, "communicationPreference", 2);
__decorateClass([
  Default(DataType.NOW),
  Column(DataType.DATE)
], Student.prototype, "createdAt", 2);
__decorateClass([
  BeforeCreate,
  BeforeUpdate
], Student, "adjustDates", 1);
Student = __decorateClass([
  Table
], Student);

class HttpError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
    Error.captureStackTrace(this, this.constructor);
  }
}

const allowedRolesArray$1 = [
  "admin",
  "catcher",
  "editor",
  "visit"
];
const registerUser = async (email, password, role) => {
  const existingUser = await User.findOne({ where: { email } });
  if (!allowedRolesArray$1.includes(role)) {
    throw new HttpError("El rol no es v\xE1lido.", 403);
  }
  if (existingUser) {
    throw new HttpError("El email ya est\xE1 registrado", 409);
  }
  const salt = await bcryptjs.genSalt(10);
  const passwordHashed = await bcryptjs.hash(password, salt);
  const newUser = await User.create({
    email: email.toLowerCase(),
    password: passwordHashed,
    role
  });
  return newUser;
};
const findUserById = async (id) => {
  const user = await User.findByPk(id);
  if (!user) throw new HttpError("El ID de usuario no es v\xE1lido", 404);
  const { password, ...sanitizedUser } = user.toJSON();
  return sanitizedUser;
};
const findUserByEmail = async (email) => {
  const user = await User.findOne({ where: { email: email.toLowerCase() } });
  if (!user) throw new HttpError("El email no se encuentra registrado", 404);
  return user;
};
const modifyUserById = async (id, email, password, role) => {
  if (!allowedRolesArray$1.includes(role)) {
    throw new HttpError("El rol no es v\xE1lido.", 403);
  }
  const user = await User.findByPk(id);
  if (!user) {
    throw new HttpError("No se pudo actualizar el usuario: ID inv\xE1lido", 400);
  }
  const salt = await bcryptjs.genSalt(10);
  const passwordHashed = await bcryptjs.hash(password, salt);
  await user.update({ email, password: passwordHashed, role });
  const { password: _, ...sanitizedUser } = user.get();
  return sanitizedUser;
};
const removeUserById = async (id) => {
  const user = await User.findByPk(id);
  if (!user) {
    throw new HttpError("No se encontr\xF3 el usuario para eliminar", 404);
  }
  await user.destroy();
  return { message: "Usuario eliminado correctamente" };
};
const listAllUsers = async () => {
  const users = await User.findAll();
  if (!users.length) {
    throw new HttpError("No se encontraron usuarios registrados", 404);
  }
  const sanitizedUsers = users.map((user) => {
    const { password, ...rest } = user.get();
    return rest;
  });
  return sanitizedUsers;
};
const userService = {
  registerUser,
  findUserById,
  findUserByEmail,
  removeUserById,
  modifyUserById,
  listAllUsers
};

const createUserHandler = async (req, res, next) => {
  try {
    const { email, password, role } = req.body;
    const newUser = await userService.registerUser(email, password, role);
    res.json({ newUser });
  } catch (error) {
    next(error);
  }
};
const getUserByIdHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await userService.findUserById(id);
    res.json(user);
  } catch (error) {
    next(error);
  }
};
const updateUserHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { email, password, role } = req.body;
    const user = await userService.modifyUserById(id, email, password, role);
    res.json(user);
  } catch (error) {
    next(error);
  }
};
const deleteUserHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await userService.removeUserById(id);
    res.json(user);
  } catch (error) {
    next(error);
  }
};
const getAllUsersHandler = async (req, res, next) => {
  try {
    const users = await userService.listAllUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
};
const userController = {
  getAllUsersHandler,
  getUserByIdHandler,
  createUserHandler,
  deleteUserHandler,
  updateUserHandler
};

const secret = process.env.JWT_SECRET;
if (!secret) {
  throw new Error("JWT_SECRET must be provided");
}
const generateAccessToken = (email, uid) => {
  return jwt.sign({ email, uid }, secret, {
    expiresIn: "24h"
    // Asegúrate de que expiresIn sea una cadena como "1h" o un número
  });
};
const verifyAccessToken = (token) => {
  return jwt.verify(token, secret);
};

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ error: "No se proporcion\xF3 un token" });
    return;
  }
  const token = authHeader.split(" ")[1];
  try {
    const payload = verifyAccessToken(token);
    req.email = payload.email;
    req.uid = payload.uid;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Token inv\xE1lido" });
  }
};

const router$2 = Router();
router$2.use(verifyToken);
router$2.get("/", userController.getAllUsersHandler);
router$2.post("/", userController.createUserHandler);
router$2.get("/:id", userController.getUserByIdHandler);
router$2.put("/:id", userController.updateUserHandler);
router$2.delete("/:id", userController.deleteUserHandler);

const createStudent = async (studentData) => {
  const { phone, name, lastname } = studentData;
  const validateField = (field, fieldName) => {
    if (!field) {
      throw new HttpError(`${fieldName} es obligatorio`, 400);
    }
  };
  validateField(name, "El nombre");
  validateField(lastname, "El apellido");
  validateField(phone, "El n\xFAmero de tel\xE9fono");
  const existingStudent = await Student.findOne({ where: { phone } });
  if (existingStudent) {
    throw new HttpError("El n\xFAmero de tel\xE9fono ya est\xE1 registrado", 409);
  }
  const newStudent = await Student.create(studentData);
  const { id, ...studentWithoutId } = newStudent.toJSON();
  return studentWithoutId;
};
const getStudentById = async (id) => {
  const student = await Student.findByPk(id);
  if (!student) throw new HttpError("El ID de estudiante no es v\xE1lido", 404);
  const { id: studentId, ...studentWithoutId } = student.toJSON();
  return studentWithoutId;
};
const getStudentByEmail = async (email) => {
  const student = await Student.findOne({ where: { email } });
  if (!student) throw new HttpError("El email no se encuentra registrado", 404);
  return student;
};
const deleteStudentById = async (id) => {
  const student = await Student.findByPk(id);
  if (!student) {
    throw new HttpError("No se encontr\xF3 el estudiante para eliminar", 404);
  }
  await student.destroy();
  return student;
};
const updateStudentById = async (id, studentData) => {
  if (studentData.phone) {
    const existingStudent = await Student.findOne({
      where: { phone: studentData.phone }
    });
    if (existingStudent && existingStudent.id !== id) {
      throw new HttpError(
        "El n\xFAmero de tel\xE9fono ya est\xE1 registrado por otro estudiante",
        400
      );
    }
  }
  const student = await Student.findByPk(id);
  if (!student) {
    throw new HttpError(
      "No se pudo actualizar el estudiante: ID inv\xE1lido",
      400
    );
  }
  await student.update(studentData);
  const { id: studentId, ...studentWithoutId } = student.toJSON();
  return studentWithoutId;
};
const getAllStudents = async () => {
  const students = await Student.findAll();
  if (!students.length) {
    throw new HttpError("No se encontraron estudiantes registrados", 404);
  }
  return students.map((student) => student.toJSON());
};
const studentService = {
  createStudent,
  getStudentById,
  getStudentByEmail,
  deleteStudentById,
  updateStudentById,
  getAllStudents
};

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname$1 = dirname(__filename);
const CREDENTIALS_PATH = path.join(
  __dirname$1,
  "..",
  "config",
  "google.credentials.json"
);
const auth = new google.auth.GoogleAuth({
  keyFile: CREDENTIALS_PATH,
  scopes: ["https://www.googleapis.com/auth/drive"]
});
const driveService = google.drive({ version: "v3", auth });
const uploadFileToDrive = async (filePath, fileName) => {
  const fileMetadata = {
    name: fileName
  };
  const parents = process.env.GOOGLE_DRIVE_FOLDER_ID ? [process.env.GOOGLE_DRIVE_FOLDER_ID] : [];
  if (parents.length > 0) {
    fileMetadata.parents = parents;
  }
  const media = {
    mimeType: "image/jpeg",
    // Cambiar según el tipo de archivo que se está subiendo
    body: fs.createReadStream(filePath)
  };
  const response = await driveService.files.create({
    requestBody: fileMetadata,
    media,
    fields: "id, webViewLink, webContentLink"
  });
  return response.data;
};
const setFilePublic = async (fileId) => {
  await driveService.permissions.create({
    fileId,
    requestBody: {
      role: "reader",
      type: "anyone"
    }
  });
};

function transformStringsToUppercase(obj) {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }
  const transformedObj = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      if (typeof value === "string" && value !== "undefined") {
        transformedObj[key] = value.toUpperCase();
      } else if (typeof value === "object" && value !== null) {
        transformedObj[key] = transformStringsToUppercase(value);
      } else {
        transformedObj[key] = value;
      }
    }
  }
  return transformedObj;
}
const handleFileUpload = async (file) => {
  try {
    const filePath = path.join("uploads", file.filename);
    const uploadedFile = await uploadFileToDrive(filePath, file.filename);
    await setFilePublic(uploadedFile.id ?? "");
    fs.unlinkSync(filePath);
    return { link: uploadedFile.webViewLink || uploadedFile.webContentLink };
  } catch (error) {
    console.error("Error al subir el archivo:", error);
    return null;
  }
};
const createStudentHandler = async (req, res, next) => {
  try {
    let studentData = req.body;
    console.log("req.body antes de transformar:", studentData);
    for (const key in studentData) {
      if (studentData[key] === "undefined") {
        studentData[key] = null;
      }
    }
    studentData = transformStringsToUppercase(studentData);
    console.log("req.body despu\xE9s de transformar:", studentData);
    console.log("birthdate recibido:", studentData.birthdate);
    console.log("contactDate recibido:", studentData.contactDate);
    const birthdate = studentData.birthdate ? moment(studentData.birthdate).toDate() : null;
    const contactDate = studentData.contactDate ? moment(studentData.contactDate).toDate() : null;
    const studentImageLink = req.files?.["studentImage"]?.[0] ? await handleFileUpload(req.files["studentImage"][0]) : void 0;
    const birthCertificateLink = req.files?.["birthCertificate"]?.[0] ? await handleFileUpload(req.files["birthCertificate"][0]) : void 0;
    const studyCertificateLink = req.files?.["studyCertificate"]?.[0] ? await handleFileUpload(req.files["studyCertificate"][0]) : void 0;
    const linkDniLink = req.files?.["linkDni"]?.[0] ? await handleFileUpload(req.files["linkDni"][0]) : void 0;
    const newStudent = await studentService.createStudent({
      ...studentData,
      birthdate,
      contactDate,
      studentImage: studentImageLink?.link,
      birthCertificate: birthCertificateLink?.link,
      studyCertificate: studyCertificateLink?.link,
      linkDni: linkDniLink?.link
    });
    res.json(newStudent);
  } catch (error) {
    next(error);
  }
};
const getStudentByIdHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const student = await studentService.getStudentById(id);
    res.json(student);
  } catch (error) {
    next(error);
  }
};
const updateStudentHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    let studentData = req.body;
    studentData = transformStringsToUppercase(studentData);
    const updatedData = { ...studentData };
    if (req.files?.["studentImage"]?.[0]) {
      const uploaded = await handleFileUpload(req.files["studentImage"][0]);
      updatedData.studentImage = uploaded?.link;
    }
    if (req.files?.["birthCertificate"]?.[0]) {
      const uploaded = await handleFileUpload(req.files["birthCertificate"][0]);
      updatedData.birthCertificate = uploaded?.link;
    }
    if (req.files?.["studyCertificate"]?.[0]) {
      const uploaded = await handleFileUpload(req.files["studyCertificate"][0]);
      updatedData.studyCertificate = uploaded?.link;
    }
    if (req.files?.["linkDni"]?.[0]) {
      const uploaded = await handleFileUpload(req.files["linkDni"][0]);
      updatedData.linkDni = uploaded?.link;
    }
    const updatedStudent = await studentService.updateStudentById(id, updatedData);
    res.json(updatedStudent);
  } catch (error) {
    next(error);
  }
};
const deleteStudentHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedStudent = await studentService.deleteStudentById(id);
    res.json(deletedStudent);
  } catch (error) {
    next(error);
  }
};
const getAllStudentsHandler = async (req, res, next) => {
  try {
    const students = await studentService.getAllStudents();
    res.json(students);
  } catch (error) {
    next(error);
  }
};
const studentController = {
  createStudentHandler,
  getStudentByIdHandler,
  updateStudentHandler,
  deleteStudentHandler,
  getAllStudentsHandler
};

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

const router$1 = Router();
router$1.use(verifyToken);
router$1.get("/", studentController.getAllStudentsHandler);
router$1.post(
  "/",
  upload.fields([
    { name: "studentImage", maxCount: 1 },
    { name: "birthCertificate", maxCount: 1 },
    { name: "studyCertificate", maxCount: 1 },
    { name: "linkDni", maxCount: 1 }
  ]),
  studentController.createStudentHandler
);
router$1.get("/:id", studentController.getStudentByIdHandler);
router$1.put(
  "/:id",
  upload.fields([
    { name: "studentImage", maxCount: 1 },
    { name: "birthCertificate", maxCount: 1 },
    { name: "studyCertificate", maxCount: 1 },
    { name: "linkDni", maxCount: 1 }
  ]),
  studentController.updateStudentHandler
);
router$1.delete("/:id", studentController.deleteStudentHandler);

const authenticateUser = async (email, password) => {
  const user = await userService.findUserByEmail(email);
  if (!user) {
    throw new HttpError("El email no est\xE1 registrado", 404);
  }
  const { email: userEmail, id: userId, password: userPassword } = user.get();
  if (!userEmail || !userId) {
    console.error("Datos incompletos del usuario:", user);
    throw new HttpError("Error interno: datos del usuario incompletos", 500);
  }
  const isValidPassword = await bcryptjs.compare(password, userPassword);
  if (!isValidPassword) {
    throw new HttpError("La contrase\xF1a es incorrecta", 401);
  }
  const token = generateAccessToken(userEmail, userId);
  return token;
};
const createUserAccount = async (email, password, role) => {
  const newUser = await userService.registerUser(email, password, role);
  const user = newUser.get();
  const token = generateAccessToken(user.email, user.id);
  return token;
};
const authService = {
  authenticateUser,
  createUserAccount
};

const allowedRolesArray = ["admin", "catcher", "editor", "visit"];
const emailSchema = Joi.string().email().required().messages({
  "string.email": "El formato del correo electr\xF3nico es inv\xE1lido.",
  "string.empty": "El campo de correo electr\xF3nico no puede estar vac\xEDo.",
  "any.required": "El correo electr\xF3nico es obligatorio."
});
const passwordSchema = Joi.string().min(6).required().messages({
  "string.min": "La contrase\xF1a debe tener al menos 6 caracteres.",
  "string.empty": "El campo de contrase\xF1a no puede estar vac\xEDo.",
  "any.required": "La contrase\xF1a es obligatoria."
});
const roleSchema = Joi.string().valid(...allowedRolesArray).required().messages({
  "any.only": `El rol debe ser uno de los siguientes: ${allowedRolesArray.join(
    ", "
  )}.`,
  "any.required": "El rol es obligatorio.",
  "string.empty": "El campo de rol no puede estar vac\xEDo."
});
const userLoginSchema = Joi.object({
  email: emailSchema,
  password: passwordSchema
});
const userRegisterSchema = Joi.object({
  email: emailSchema,
  password: passwordSchema,
  role: roleSchema
  // Validación de rol
});

const handleLogin = async (req, res, next) => {
  try {
    const { error, value } = userLoginSchema.validate(req.body);
    if (error) {
      throw new HttpError(error.message, 400);
    }
    const { email, password } = value;
    const token = await authService.authenticateUser(email, password);
    res.json({ token });
  } catch (error) {
    next(error);
  }
};
const handleRegister = async (req, res, next) => {
  try {
    const { error, value } = userRegisterSchema.validate(req.body);
    if (error) {
      res.status(400).json({ error: error.message });
      return;
    }
    const { email, password, role } = value;
    const token = await authService.createUserAccount(email, password, role);
    res.json({ token });
  } catch (error) {
    next(error);
  }
};
const authController = {
  handleLogin,
  handleRegister
};

const router = Router();
router.post("/", authController.handleLogin);
router.post("/register", verifyToken, authController.handleRegister);

const __dirname = import.meta.dirname;
const logFilePath = path.join(__dirname, "../../logs/app.log");
const logger = winston.createLogger({
  // Establece el nivel mínimo de logs que se registrarán
  // Los niveles disponibles son: error, warn, info, verbose, debug, silly.
  level: "info",
  // Define el formato de los logs
  format: winston.format.combine(
    // Agrega una marca de tiempo a cada mensaje de log
    winston.format.timestamp(),
    // Define un formato personalizado para los mensajes de log
    // Incluye la marca de tiempo, el nivel del mensaje, y el contenido del mensaje.
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message}`;
    })
  ),
  // Configura los "transports" (lugares donde se envían los logs)
  transports: [
    // Transport para la consola (útil durante el desarrollo)
    new winston.transports.Console({
      // Formato específico para la consola: incluye colores y formato simplificado
      format: winston.format.combine(
        winston.format.colorize(),
        // Colorea los niveles de los logs
        winston.format.simple()
        // Mensajes más compactos
      )
    }),
    // Transport para guardar los logs en un archivo
    new winston.transports.File({ filename: logFilePath })
    // Los mensajes se guardarán en el archivo "app.log" definido en `logFilePath`.
  ]
});

const httpErrorHandle = (error, req, res, next) => {
  logger.error(`${error.message} - ${req.method} ${req.originalUrl}`);
  if (error instanceof HttpError) {
    res.status(error.code).json({ error: error.message });
  } else {
    res.status(500).json({ error: "Error de servidor" });
  }
};

const options = {
  definition: {
    openapi: "3.0.0",
    // Especificación de OpenAPI
    info: {
      title: "API REST Alumnos EDC",
      version: "1.0.0",
      description: "Documentaci\xF3n API"
    }
  },
  apis: ["swagger.yml"]
  // Rutas de los archivos con la documentación de Swagger
};
const openapiSpecification = swaggerJsDoc(options);

const app = express();
app.use(morgan("dev"));
const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  methods: process.env.CORS_METHODS?.split(","),
  allowedHeaders: process.env.CORS_HEADERS?.split(",")
};
app.use(cors(corsOptions));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification));
app.use(express.json());
const limiter = rateLimit({
  windowMs: 15 * 60 * 1e3,
  // 15 minutos
  max: 100,
  // Límite de 100 peticiones por IP
  message: "Demasiadas solicitudes desde esta IP, por favor int\xE9ntalo m\xE1s tarde.",
  standardHeaders: true,
  // Informa el límite en las cabeceras `RateLimit-*`
  legacyHeaders: false
  // Desactiva las cabeceras `X-RateLimit-*`
});
app.use(limiter);
app.use("/api/auth", router);
app.use("/api/users", router$2);
app.use("/api/students", router$1);
app.use(httpErrorHandle);

const DATABASE_USER = process.env.CONNECT_DG_USERS;
const DATABASE_STUDENT = process.env.CONNECT_DG_STUDENTS;
if (!DATABASE_USER) {
  throw new Error("DaTABASE_URL not found");
}
const sequelizeUser = new Sequelize(DATABASE_USER, {
  dialect: "postgres",
  models: [User],
  logging: false
});
if (!DATABASE_STUDENT) {
  throw new Error("DaTABASE_URL not found");
}
const sequelizeStudent = new Sequelize(DATABASE_STUDENT, {
  dialect: "postgres",
  models: [Student],
  logging: false
});

const handleError = (socket, event, error) => {
  console.error(`Error in event ${event}: ${error.message}`);
  socket.emit("error", {
    event,
    message: "An error occurred"
  });
};

const getUserEmail = async (userId) => {
  try {
    const user = await User.findOne({
      where: {
        id: userId
      }
    });
    if (user) {
      return user.email;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error al obtener el email del usuario:", error);
    return null;
  }
};

const setupSocketHandlers = (socket, chat) => {
  let previousRoom = null;
  let currentUserId = "";
  const userId = socket.handshake.query.userId;
  if (!userId) {
    console.log("\u274C Usuario sin ID intent\xF3 conectarse.");
    socket.disconnect();
    return;
  }
  currentUserId = userId;
  getUserEmail(currentUserId).then((email) => {
    socket.data.email = email || "No disponible";
    console.log(
      `\u2705 Usuario conectado al chat con ID: ${currentUserId}, Email: ${email}`
    );
  }).catch((error) => {
    console.error("Error al obtener el email del usuario:", error);
    socket.data.email = "No disponible";
    console.log(
      `\u2705 Usuario conectado al chat con ID: ${currentUserId}, Email: No disponible`
    );
  });
  socket.on("join", (room) => {
    try {
      if (previousRoom && previousRoom !== room) {
        socket.to(previousRoom).emit("userDisconnected", {
          userId: currentUserId,
          email: socket.data.email
        });
      }
      socket.rooms.forEach((existingRoom) => {
        if (existingRoom !== socket.id) {
          socket.leave(existingRoom);
          console.log(
            `Usuario ${currentUserId} ha dejado la sala ${existingRoom}`
          );
        }
      });
      socket.join(room);
      console.log(`\u{1F7E2} Usuario ${currentUserId} se uni\xF3 a la sala ${room}`);
      previousRoom = room;
      socket.to(room).emit("message", {
        userId: "System",
        email: socket.data.email,
        // Usamos el email guardado
        msg: `\u2705 Usuario ${socket.data.email || currentUserId} se ha unido a la sala`
      });
    } catch (error) {
      handleError(socket, "join", error);
    }
  });
  socket.on("message", ({ userId: userId2, msg, room }) => {
    try {
      console.log(
        `Mensaje recibido de ${currentUserId} en la sala ${room}: ${msg}`
      );
      chat.to(room).emit("message", { userId: userId2, email: socket.data.email, msg });
    } catch (error) {
      handleError(socket, "message", error);
    }
  });
  socket.on("disconnect", () => {
    try {
      console.log(`\u274C Usuario ${currentUserId} desconectado`);
      const userEmail = socket.data.email || "Usuario desconocido";
      if (previousRoom) {
        socket.to(previousRoom).emit("userDisconnected", {
          userId: currentUserId,
          email: userEmail
          // Utilizamos el email que está guardado
        });
      }
    } catch (error) {
      handleError(socket, "disconnect", error);
    }
  });
};

const configureSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.CORS_ORIGIN,
      methods: process.env.CORS_METHODS?.split(","),
      credentials: true
    }
  });
  const chat = io.of("/chat");
  chat.on("connection", (socket) => {
    setupSocketHandlers(socket, chat);
  });
  return io;
};

const port = process.env.PORT || 3e3;
const server = createServer(app);
configureSocket(server);
const main = async () => {
  try {
    await sequelizeUser.authenticate();
    await sequelizeUser.sync();
    console.log("Base de datos userdb conectada:");
  } catch (error) {
    console.error("Error conectando a userdb:", error);
  }
  try {
    await sequelizeStudent.authenticate();
    await sequelizeStudent.sync();
    console.log("Base de datos profiledb conectada:");
  } catch (error) {
    console.error("Error conectando a profiledb", error);
  }
  server.listen(port, () => {
    console.log(`Servidor encendido en puerto ${port}`);
  });
};
main();
