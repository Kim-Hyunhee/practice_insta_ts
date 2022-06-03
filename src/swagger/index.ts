import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

const option = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "Practice Insta TS",
      description: "인스타 TS 연습",
    },
    servers: [
      {
        url: "http://localhost:8000",
      },
    ],
  },
  apis: ["src/routers/*.ts", "src/swagger/*.yml"],
};
const specs = swaggerJsdoc(option);

export { swaggerUi, specs };
