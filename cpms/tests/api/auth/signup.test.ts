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
    hashPassword: jest.fn().mockResolvedValue("hashTest271"),
}));

const createdMock = prisma.user.create as jest.Mock;

beforeEach(() => { jest.clearAllMocks(); });

describe("Signup API Route Testing", () => {
    it("create user with valid input", async () => {
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
    it("return status code 400 if name not found", async () => {
        const { req } = createMocks({
            method: "POST",
            body: {
                email: "ishansoni.work@gmail.com",
                password: "Kn!f3Edge940",
                accountRole: "PROJECT_MANAGER",
            },
        });
        req.json = async () => req.body;
        const res = await signupPost(req);
        expect(res.status).toBe(400);
        const data = await res.json();
        expect(data.error).toMatch("name is required");
    });
    it("return status code 409 if email is already registered", async () => {
        createdMock.mockRejectedValueOnce({
            code: "P2002",
            meta: { target: ["email"] }
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
        expect(res.status).toBe(409);
        const data = await res.json();
        expect(data.error).toMatch("A user with that e-mail already exists.");
    });
    it("return 400 if role is invalid", async () => {
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