import fp from "fastify-plugin";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

async function loggingMiddleware(app: FastifyInstance) {
  app.addHook("onRequest", async (request: FastifyRequest) => {
    (request as any).startTime = Date.now();

    console.log("\n====================================");
    console.log("Incoming Request");
    console.log(`Time   : ${new Date().toISOString()}`);
    console.log(`Method : ${request.method}`);
    console.log(`URL    : ${request.url}`);
  });

  app.addHook("onResponse", async (request: FastifyRequest, reply: FastifyReply) => {
    const startTime = (request as any).startTime;
    const duration = Date.now() - startTime;

    console.log(`Status : ${reply.statusCode}`);
    console.log(`Time   : ${duration} ms`);
    console.log("====================================\n");
  });
}

export default fp(loggingMiddleware);