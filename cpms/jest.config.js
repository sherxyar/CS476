/** @type {import('jest').config} */
module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    testMatch: ["**/tests/**/*.test.ts?(x)"],
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1"
    },
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    },
};

process.env.POSTGRES_URL = "postgresql://postgres:admin1234@localhost:5432/mydb"
process.env.NODE_ENV = "test"