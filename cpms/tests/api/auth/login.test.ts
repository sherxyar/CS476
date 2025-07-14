import { createMocks } from "node-mocks-http";
import { POST as loginPost } from "@/app/api/auth/login/route";

jest.mock("@/lib/prisma", () => ({
    prisma: {
        user: {
            findUnique: jest.fn().mockImplementation(({ where }) => {
                if (where.email === "ishansoni.work@gmail.com") {
                    return {
                        id: 1,
                        email: "ishansoni.work@gmail.com",
                        name: "Ishan",
                        hashedPassword: "$7a$10$h@shTest271"
                    };
                }
                return null;
            }),
        },
        mfacode: {
            deleteMany: jest.fn().mockResolvedValue(undefined),
            create: jest.fn().mockResolvedValue(undefined)
        },
    },
}));

jest.mock("bcryptjs", () => ({
    compare: jest.fn((input, hash) => input === "h@shTest271" && hash === "$7a$10$h@shTest271"),
}));

jest.mock("@/lib/mailer", () => ({
    sendEmail: jest.fn().mockResolvedValue(true),
}));

describe("Login API Route - Robustness Test", () => {
    const createMockLogin = (email?: string, password?: string) => {
        const { req } = createMocks({
            method: "POST",
            body: { email, password }
        });
        req.json = async () => req.body;
        return req;
    };
    it("Login with correct credentials", async () => {
        const req = createMockLogin("ishansoni.work@gmail.com", "h@shTest271");
        const res = await loginPost(req);
        expect(res.status).toBe(200);
        const data = await res.json();
        expect(data.message).toMatch("2FA code sent");
    });
    it("Login with incorrect password", async () => {
        const req = createMockLogin("ishansoni.work@gmail.com", "h@shTest272");
        const res = await loginPost(req);
        expect(res.status).toBe(401);
        const data = await res.json();
        expect(data.error).toMatch("Invalid credentials");
    });
    it("Login with unregistered email", async () => {
        const req = createMockLogin("ishan.soni2406@gmail.com", "h@shTest271");
        const res = await loginPost(req);
        expect(res.status).toBe(401);
        const data = await res.json();
        expect(data.error).toMatch("Invalid credentials");
    });
    it("Login with missing fields", async () => {
        const req = createMockLogin(undefined, undefined);
        const res = await loginPost(req);
        expect(res.status).toBe(400);
        const data = await res.json();
        expect(data.error).toMatch("email and password are required");
    });
});