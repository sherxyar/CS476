import { createMocks } from "node-mocks-http";
import { POST as signupPost } from "@/app/api/auth/signup/route";
import { hashPassword } from "@/lib/auth";

const ALLOWED_ROLES = ["ADMIN", "PROJECT_MANAGER", "CONTRIBUTOR"] as const;
type AccountRole = (typeof ALLOWED_ROLES)[number];

jest.mock("@/lib/prisma", () => ({
    prisma: {
        user: {
            create: jest.fn().mockResolvedValue({
                id: 1,
                name: "Ishan",
                email: "ishansoni.work@gmail.com",
                accountRole: "PROJECT_MANAGER"
            }),
        },
    },
}));

jest.mock("@/lib/auth", () => ({
    hashPassword: jest.fn().mockResolvedValue("hashTest271"),
}));

describe("Signup API Route", () => {
    it("create user with valid input", async () => {
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