import { GET as projectsGet } from "@/app/api/projects/route";
import { createMocks } from "node-mocks-http";

describe("Projects API Route - Time Efficiency Test", () => {
    it("Time efficiency for fetching projects", async () => {
        const { req } = createMocks({ method: "GET" });
        const res = await projectsGet();
        expect(res.status).toBe(200);
    })
});