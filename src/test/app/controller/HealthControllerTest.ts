
import { TestServer } from "../testServer";
import { expect } from "chai";
import HealthController from "../../../app/controller/HealthController";

describe("HealthControllerTest", () => {
    let server: TestServer;

    before("initialise", () => {
        server = TestServer.getInstance(new HealthController());
    });
    describe("health-check", () => {
        it("successfully checks the health", async () => {
            const resp = await server.get("/health");
            expect(resp.status).to.equal(200);
        });
    });
});
