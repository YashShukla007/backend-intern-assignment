import fp from "fastify-plugin";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";

export default fp(async function (app) {
  await app.register(fastifySwagger, {
    openapi: {
      info: {
        title: "Backend Internship Assignment API",
        description: "Quote Management API",
        version: "1.0.0",
      },
    },
  });

  await app.register(fastifySwaggerUi, {
    routePrefix: "/docs",
  });
});