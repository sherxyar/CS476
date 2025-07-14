import { DELETE as removeMember } from "@/app/api/projects/[id]/members/route";
import { createMocks } from "node-mocks-http";
import { getServerSession } from "next-auth";

jest.mock("next-auth", () => ({
    getServerSession: jest.fn(),
}));
jest.mock("@/lib/auth", () => ({
    authOptions: {},
}));

describe("Project Manager cannot remove themselves from a project", () => {
    it("should not allow PROJECT MANAGER to remove themselves from a project", async () => {
        const projectManagerId = 1;
        (getServerSession as jest.Mock).mockResolvedValue({
            user: {
                id: projectManagerId,
                name: "Ishan Project Manager",
                email: "ishansoni.work@gmail.com",
                accountRole: "PROJECT_MANAGER",
            },
        });
        const projectId = 2;
        const { req } = createMocks({
            method: "DELETE",
            url: `http://localhost/api/projects/${projectId}/members?userId=${projectManagerId}`
        });
        req.json = async () => req.body;
        const res = await removeMember(req, { params: Promise.resolve({ id: projectId.toString() }) });
        expect(res.status).toBe(403);
        const data = await res.json();
        expect(data.error).toBe("Project Managers cannot remove themselves from a project");
    })
});