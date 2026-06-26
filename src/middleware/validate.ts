import { FastifyReply, FastifyRequest } from "fastify";
import { ZodSchema } from "zod";

export function validate(schema: ZodSchema) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const result = schema.safeParse(request.body);

    if (!result.success) {
      return reply.status(400).send({
        success: false,
        message: "Validation failed",
        errors: result.error.flatten(),
      });
    }

    request.body = result.data;
  };
}