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

describe("Signup API Route - Correctness Test", () => {
    it("create user (PROJECT MANAGER) with valid input", async () => {
        createdMock.mockResolvedValueOnce({
            id: 1,
            name: "Ishan",
            email: "ishansoni.work@gmail.com",
            accountRole: "PROJECT_MANAGER"
        });
        const { req } = createMocks({
            method: "POST",
            body: {
                name: "Ishan",
                email: "ishansoni.work@gmail.com",
                password: "Kn!f3Edge940",
                accountRole: "PROJECT_MANAGER",
            },
        });
        req.json = async () => req.body;
        const res = await signupPost(req);
        expect(res.status).toBe(201);
        const data = await res.json();
        expect(data.user).toEqual({
            id: 1,
            name: "Ishan",
            email: "ishansoni.work@gmail.com",
            accountRole: "PROJECT_MANAGER",
        });
    });
});