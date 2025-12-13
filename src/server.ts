import app from "./app";
import config from "./.config";
const bootstrap = async (): Promise<void> => {
  const server = app.listen(config, () => {
    console.log("Server is running on http://localhost:3000");
  });

  process.on("SIGINT", () => {
    server.close(() => {
      console.log("Server closed");
      process.exit(0);
    });
  });
};
bootstrap();
