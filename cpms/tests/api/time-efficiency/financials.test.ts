import { GET as getFinancials } from "@/app/api/projects/[id]/financials/route";

describe("Financials API Route - Time Efficiency Test", () => {
    it("Time efficiency for fetching financials", async () => {
        const testParams = Promise.resolve({ id: "test-id" });
        const res = await getFinancials({} as Request, { params: testParams });
    })
})