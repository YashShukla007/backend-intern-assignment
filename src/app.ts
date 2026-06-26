import Fastify from "fastify";
import { healthRoutes } from "./routes/health.routes";
import { quoteRoutes } from "./routes/quote.routes";
import { errorHandler } from "./middleware/error-handler";
import swagger from "./plugins/swagger";
import loggingMiddleware from "./middleware/logging";


export const app = Fastify({
  logger: true,
});

app.setErrorHandler(errorHandler);

app.register(swagger);

app.register(loggingMiddleware);

app.register(healthRoutes);

app.register(quoteRoutes);