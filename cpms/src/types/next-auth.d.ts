import "next-auth";

declare module "next-auth" {
  interface User {
    accountRole: string;
  }
  interface Session {
    user: {
      id: number;
      name: string;
      email: string;
      accountRole: string;
    };
  }
}
