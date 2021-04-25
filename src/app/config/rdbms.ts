import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import logger from "./logger";
/**
 * Uses env params to configure TypeORM database library
 */
/**
 * Uses env params to configure TypeORM database library
 */

const config: { [key: string]: PostgresConnectionOptions } = {
  test: {
    // hardcoding test database as myapp_test_db to prevent misuse
    database: "ribbon_test_db",
    schema: "ribbon_product_management",
    entities: [
      "dist/app/entity/*{.ts,.js}",
    ],
    extra: { max: 5, min: 2 }, // connection pool
    host: "localhost",
    password: "postgres",
    port: 5432,
    synchronize: false,
    logging: false,
    type: "postgres",
    username: "postgres",
    namingStrategy: new SnakeNamingStrategy(),
    migrations: ["dist/migrations/*.js"],
    migrationsRun: true,
    cli: {
      migrationsDir: "src/migrations"
    }
  },
  development: {
    database: process.env.POSTGRES_DB,
    schema: "ribbon_product_management",
    entities: [`${__dirname}/../entity/*{.ts,.js}`],
    extra: { max: 10, min: 5 }, // connection pool
    host: process.env.POSTGRES_HOST,
    password: process.env.POSTGRES_PASSWORD,
    port: Number(process.env.POSTGRES_PORT),
    synchronize: false,
    logging: true,
    type: "postgres",
    username: process.env.POSTGRES_USER,
    namingStrategy: new SnakeNamingStrategy(),
    migrations: ["dist/migrations/*.js"],
    cli: {
      migrationsDir: "src/migrations"
    }
  }
};

const getRDBMSConfig = (env?: string): PostgresConnectionOptions => {

  if (!env) {
    // Setting default database to development
    logger.info(`Getting dbms config for ${env} environment`);
    return config.development;
  }
  const configuration: PostgresConnectionOptions = config[env];

  logger.info(`Connecting to database:${configuration.database} ********* schema:${configuration.schema}`);
  logger.info(`Database connection pool : ${JSON.stringify(configuration.extra)}`);
  return configuration;
};

const rdbmsConfig: PostgresConnectionOptions = getRDBMSConfig(process.env.NODE_ENV);
export = rdbmsConfig;
