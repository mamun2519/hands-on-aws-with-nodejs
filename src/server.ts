import app from "./app";
import config from "./config";
const bootstrap = async (): Promise<void> => {
  const server = app.listen(config.port, () => {
    console.log("Server is running on port", config.port);
  });

  process.on("SIGINT", () => {
    server.close(() => {
      console.log("Server closed");
      process.exit(0);
    });
  });
};
bootstrap();
