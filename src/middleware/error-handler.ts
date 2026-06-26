import { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import { AppError } from "../utils/app-error";

export async function errorHandler(
  error: FastifyError | AppError,
  request: FastifyRequest,
  reply: FastifyReply
) {
  request.log.error(error);

  if (error instanceof AppError) {
    return reply.status(error.statusCode).send({
      success: false,
      message: error.message,
    });
  }

  return reply.status(500).send({
    success: false,
    message: "Internal Server Error",
  });
}