import { POST as createProject } from "@/app/api/projects/route";
import { createMocks } from "node-mocks-http";
import { getServerSession } from "next-auth";

jest.mock("next-auth", () => ({
    getServerSession: jest.fn(),
}));

describe("Test Project Creation with Contributor Role", () => {
    it("should not allow user with CONTRIBUTOR role to create project", async () => {
        (getServerSession as jest.Mock).mockResolvedValue({
            user: {
                id: 1,
                name: "Ishan Contributor",
                email: "ishansoni.work@gmail.com",
                accountRole: "CONTRIBUTOR",
            },
        });

        const { req } = createMocks({
            method: "POST",
            body: {
                title: "Test Project",
                plannedStartDate: "2025-07-17",
                plannedEndDate: "2025-08-31",
            },
        });
        req.json = async () => req.body;
        const res = await createProject(req);
        expect(res.status).toBe(403);
        const data = await res.json();
        expect(data.error).toBe("Contributors are not allowed to create projects");
    });
});