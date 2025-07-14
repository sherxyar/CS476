import { POST as assignMember } from "@/app/api/projects/[id]/members/route";
import { createMocks } from "node-mocks-http";
import { getServerSession } from "next-auth";

jest.mock("next-auth", () => ({
    getServerSession: jest.fn(),
}));
jest.mock("@/lib/auth", () => ({
    authOptions: {},
}));

describe("Project Manager cannot change their own role", () => {
    const projectManagerId = 1;
    it("should not allow PROJECT MANAGER to change their own role", async () => {
        (getServerSession as jest.Mock).mockResolvedValue({
            user: {
                id: projectManagerId,
                name: "Ishan Project Manager",
                email: "ishansoni.work@gmail.com",
                accountRole: "PROJECT_MANAGER",
            },
        });
        const { req } = createMocks({
            method: "POST",
            body: {
                userId: projectManagerId,
                role: "ADMIN"
            },
            url: "http://localhost/api/projects/projectId/members"
        });
        req.json = async () => req.body;
        const res = await assignMember(req, { params: Promise.resolve({ id: "projectId" }) });
        expect(res.status).toBe(403);
        const data = await res.json();
        expect(data.error).toBe("You cannot change your own role");
    })
});