import "./config"; // initiate dot env configs, etc.

import { createConnection } from "typeorm";
import App from "./app";
import rdbmsConfig from "./config/rdbms"; // config file for typeorm
import logger from "./config/logger"; // console logger using winston
import controllers from "./controller";
import { validateEnv } from "./util/validationHelper";

validateEnv();

process.on("uncaughtException", (e) => {
  logger.error(e);
  process.exit(1);
});
process.on("unhandledRejection", (e) => {
  logger.error(e);
  process.exit(1);
});
(async () => {
  try {
    await createConnection(rdbmsConfig);
    logger.info("Database connected");
  } catch (error) {
    logger.error("Error while connecting to the database", error);
    process.exit(1);
  }

  const app = new App(controllers);
  app.listen();
})();
