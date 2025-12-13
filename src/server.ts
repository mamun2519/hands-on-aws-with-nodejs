import app from "./app";

const bootstrap = async (): Promise<void> => {
  const server = app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
  });

  process.on("SIGINT", () => {
    server.close(() => {
      console.log("Server closed");
      process.exit(0);
    });
  });
};
