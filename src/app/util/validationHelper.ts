import { cleanEnv, port, str } from "envalid";

/**
 * Checks whether required environment variables are present for application
 */
const validateEnv = () => {
  cleanEnv(process.env, {
    NODE_ENV: str({
      default: "development",
      choices: ["development", "test"],
    }),
    PORT: port(),
    POSTGRES_DB: str(),
    POSTGRES_HOST: str(),
    POSTGRES_PASSWORD: str(),
    POSTGRES_PORT: port(),
    POSTGRES_USER: str(),
  });
};

export { validateEnv };
