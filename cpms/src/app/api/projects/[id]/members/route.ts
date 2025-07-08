import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

const ALLOWED_ROLES = ["ADMIN", "PROJECT_MANAGER", "CONTRIBUTOR"] as const;
type DbRole = typeof ALLOWED_ROLES[number];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const { projectId } = req.query;
  if (typeof projectId !== "string") {
    return res.status(400).json({ error: "Invalid project ID" });
  }

  if (req.method === "OPTIONS") {
    res.setHeader("Allow", "GET,POST,OPTIONS");
    return res.status(200).end();
  }

// GET members
  if (req.method === "GET") {
    try {
      const memberships = await prisma.projectMember.findMany({
        where: { projectId },
        include: { user: true },
        orderBy: { createdAt: "asc" },
      });

      const result = memberships.map((m) => ({
        id: m.id,
        name: m.user.name,
        email: m.user.email,
        department: m.user.department ?? "",
        lastActivity: m.user.lastActivity ?? "",
        role: m.role as DbRole, 
      }));

      return res.status(200).json(result);
    } catch (err) {
      console.error("GET members error", err);
      return res.status(500).json({ error: "Failed to fetch members" });
    }
  }

  // Add a new member
  if (req.method === "POST") {
    const { userId, role } = req.body as {
      userId: number;
      role: DbRole;
    };

    if (!userId || !ALLOWED_ROLES.includes(role)) {
      return res.status(400).json({ error: "userId and valid role required" });
    }

    try {
      // create membership
      const membership = await prisma.projectMember.create({
        data: { projectId, userId, role },
        include: { user: true },
      });

      return res.status(201).json({
        id: membership.id,
        name: membership.user.name,
        email: membership.user.email,
        department: membership.user.department ?? "",
        lastActivity: membership.user.lastActivity ?? "",
        role: membership.role,
      });
    } catch (err: any) {
      // this cath is for preventing double entries
      if (err.code === "P2002") {
        return res.status(409).json({ error: "User already on project" });
      }
      console.error("POST members error", err);
      return res.status(500).json({ error: "Failed to add member" });
    }
  }

  // was getting 405, this helps with that
  res.setHeader("Allow", "GET,POST,OPTIONS");
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
