import { createConnection } from "typeorm";
import logger from "../app/config/logger";
import rdbmsConfig from "../app/config/rdbms";

before(async () => {
    await connectionFunc();
});
const connectionFunc = async () => {
    try {
        await createConnection(rdbmsConfig);
        logger.info("Database connected");
    } catch (error) {
        logger.error("Error while connecting to the database", error);
        process.exit(1);
    }
};
