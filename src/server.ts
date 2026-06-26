import { app } from "./app";
import { env } from "./config/env";

const PORT = env.PORT;

async function startServer() {
  try {
    await app.listen({
      port: PORT,
      host: "0.0.0.0",
    });

    console.log(`🚀 Server running on http://localhost:${PORT}`);
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
}

startServer();