import { POST as assignMember } from "@/app/api/projects/[id]/members/route";
import { createMocks } from "node-mocks-http";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

jest.mock("next-auth", () => ({
    getServerSession: jest.fn(),
}));
jest.mock("@/lib/auth", () => ({
    authOptions: {},
}));

describe("Test Member Assignment with Contributor Role", () => {
    const projectId = "test-id";
    it("should not allow user with CONTRIBUTOR role to assign members", async () => {
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
                userId: 2,
                role: "CONTRIBUTOR"
            },
        });
        req.json = async () => req.body;
        const res = await assignMember(req,{params:Promise.resolve({id:projectId})});
        expect(res.status).toBe(403);
        const data = await res.json();
        expect(data.error).toBe("Contributors cannot assign members to projects");
    })
});