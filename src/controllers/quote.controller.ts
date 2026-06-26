import { FastifyReply, FastifyRequest } from "fastify";
import { QuoteService } from "../services/quote.service";
import { createQuoteSchema } from "../schemas/quote.schema";
import { AppError } from "../utils/app-error";

import {
  CreateQuoteRequest,
  UpdateStatusRequest,
} from "../types/quote.types";

export class QuoteController {
  private service = new QuoteService();

  async createQuote(
    request: FastifyRequest<{
      Body: CreateQuoteRequest;
    }>,
    reply: FastifyReply
  ) {
    const parsed = createQuoteSchema.safeParse(request.body);

    if (!parsed.success) {
      return reply.status(400).send({
        success: false,
        message: "Validation failed",
        errors: parsed.error.flatten(),
      });
    }

    const quote = await this.service.createQuote(parsed.data);

    return reply.status(201).send({
      success: true,
      message: "Quote created successfully",
      data: quote,
    });
  }

  async getAllQuotes(
    _request: FastifyRequest,
    reply: FastifyReply
  ) {
    const quotes = await this.service.getAllQuotes();

    return reply.send({
      success: true,
      data: quotes,
    });
  }

  async getQuoteById(
    request: FastifyRequest<{
      Params: { id: string };
    }>,
    reply: FastifyReply
  ) {
    const quote = await this.service.getQuoteById(request.params.id);

    if (!quote) {
      throw new AppError("Quote not found", 404);
    }

    return reply.send({
      success: true,
      data: quote,
    });
  }

  async analyzeQuote(
    request: FastifyRequest<{
      Params: { id: string };
    }>,
    reply: FastifyReply
  ) {
    const result = await this.service.analyzeQuote(request.params.id);

    return reply.send({
      success: true,
      message: "Quote analyzed successfully",
      data: result,
    });
  }

  async updateStatus(
    request: FastifyRequest<{
      Params: { id: string };
      Body: UpdateStatusRequest;
    }>,
    reply: FastifyReply
  ) {
    const updatedQuote = await this.service.updateStatus(
      request.params.id,
      request.body.status
    );

    return reply.send({
      success: true,
      message: "Quote status updated successfully",
      data: updatedQuote,
    });
  }
}