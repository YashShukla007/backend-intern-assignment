import { FastifyInstance } from "fastify";
import { QuoteController } from "../controllers/quote.controller";

const controller = new QuoteController();

export async function quoteRoutes(app: FastifyInstance) {
  app.post(
    "/quotes",
    controller.createQuote.bind(controller)
  );

  app.get(
    "/quotes",
    controller.getAllQuotes.bind(controller)
  );

  app.get(
    "/quotes/:id",
    controller.getQuoteById.bind(controller)
  );

  app.post(
    "/quotes/:id/analyze",
    controller.analyzeQuote.bind(controller)
  );

  app.patch(
    "/quotes/:id/status",
    controller.updateStatus.bind(controller)
  );
}