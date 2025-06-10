import swaggerJsDoc from "swagger-jsdoc";

const options: swaggerJsDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API REST Alumnos EDC",
      version: "1.0.0",
      description: "Documentación API",
    },
  },
  apis: ["swagger.yml"],
};

const openapiSpecification = swaggerJsDoc(options);

export default openapiSpecification;
