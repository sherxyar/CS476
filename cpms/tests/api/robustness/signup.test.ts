import { createMocks } from "node-mocks-http";
import { POST as signupPost } from "@/app/api/auth/signup/route";
import { hashPassword } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const ALLOWED_ROLES = ["ADMIN", "PROJECT_MANAGER", "CONTRIBUTOR"] as const;
type AccountRole = (typeof ALLOWED_ROLES)[number];

jest.mock("@/lib/prisma", () => ({
    prisma: {
        user: {
            create: jest.fn(),
        },
    },
}));

jest.mock("@/lib/auth", () => ({
    hashPassword: jest.fn().mockResolvedValue("h@shTest271"),
}));

const createdMock = prisma.user.create as jest.Mock;

beforeEach(() => { jest.clearAllMocks(); });

describe("Signup API Route - Robustness Test", () => {
    it("return status code 400 if name not found - CONTRIBUTOR", async () => {
        const { req } = createMocks({
            method: "POST",
            body: {
                email: "ishansoni.work@gmail.com",
                password: "Kn!f3Edge940",
                accountRole: "CONTRIBUTOR",
            },
        });
        req.json = async () => req.body;
        const res = await signupPost(req);
        expect(res.status).toBe(400);
        const data = await res.json();
        expect(data.error).toMatch("name is required");
    });
    it("return 400 if role is invalid - VENDOR", async () => {
        const { req } = createMocks({
            method: "POST",
            body: {
                name: "Ishan",
                email: "ishansoni.work@gmail.com",
                password: "Kn!f3Edge940",
                accountRole: "VENDOR",
            },
        });
        req.json = async () => req.body;
        const res = await signupPost(req);
        expect(res.status).toBe(400);
        const data = await res.json();
        expect(data.error).toMatch(
            new RegExp(`role must be one of ${ALLOWED_ROLES.join(", ")}`, "i")
        );
    });
});