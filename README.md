# Product Management Service

## Features included
 * Database integrations (Postgres)
 * Strongly-typed codebase (written in Typescript)
 * Interactive API documentation using Swagger UI (Open API spec)
 * Automated testing (including integration tests for API routes)
   * Jest unit and integration tests (`npm test`)
 * For naming and conventions follow Airbnb style guide.
   `https://github.com/airbnb/javascript`

## Usage (quick start)
 1. clone the repo
 2. `npm install`
 3. Setup temp environment configs
    * RUN in CLI from project root `./setenv.sh`
 4. Make note of generated files and change to your preferences
    * IMPORTANT: when deploying app, don't use the `.env` file, simply set vars in your CI provider or container manager
 5. `docker-compose up`
    * This will spin up Postgres
    * To stop them, and remove local volumes: `docker-compose down -v`
 6. Create database name 'ribbon_db' using PGAdmin
 7. Create schema named 'ribbon_product_management' under database
 8. to create table struct in db run
    `npm run migrate`
 6. Run tests (will load up test data in tables)
    * `npm run test`
 7. Start up app in developer mode (will watch and recompile for changes)
    * `npm run dev`
 8. Open browser tab to [Swagger UI Explorer](http://localhost:3000/api-docs) to explore API
 9. Open browser tab to [Postgres Admin](http://localhost:9090/browser) for Postgres Admin
     * click on "Servers" and then "Object > Create > Server"
     * "General > Name" the connection "raena"
     * click on "Connection" tab:
       * Host: `postgres` (network exposed by docker-compose)
       * Password: `admin` (or whatever you set in ENV vars)
     * click on "Save"
     * traverse "Servers > raena > Databases > ribbon_product_management > Schemas > public"


## Testing
This app includes automated tests using **Supertest** and **Substitute** to test routes, etc.
 * `npm run test`
 * NOTE: the Docker database must be running (see Step 5 above)
 * SEE: `__tests__` folders in application for test source code

## Adding new services
You can follow along the commit history relating to the issues (closed) and see how, but a general idea is:
 1. add a new route in the `src/app/controller/` folder
 5. Edit `src/app/config/openapi.json` and add routes to documentation (if REST implementation)

## Resources
 * [Methodology: 12-factor](https://12factor.net/)
 * [Language: Typescript](https://www.typescriptlang.org/)
 * [Framework: Express](https://expressjs.com/)
 * [Documentation: Swagger UI](https://swagger.io/docs/open-source-tools/swagger-ui/usage/installation/)
 * [Documentation: OpenAPI](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.0.md)
 * [Config: Dotenv](https://www.npmjs.com/package/dotenv)
 * [Logging: Winston](https://www.npmjs.com/package/winston)
 * [Security: Helmet](https://www.npmjs.com/package/helmet)
 * [Validation: Class Validator](https://www.npmjs.com/package/class-validator)
 * [Database: TypeORM](https://www.npmjs.com/package/typeorm)
 * [Database: PostgreSQL](https://www.postgresql.org/)
 * [Database: Redis](https://redis.io/commands/)
 * [Testing: Supertest](https://www.npmjs.com/package/supertest)
 * [Testing: Docker Compose](https://docs.docker.com/compose/)
 * [Style Guide: Airbnb](https://github.com/airbnb/javascript)
 