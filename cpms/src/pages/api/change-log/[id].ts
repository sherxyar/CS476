import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (typeof id !== "string" || isNaN(Number(id))) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  const numericId = parseInt(id, 10);

  if (req.method === "PUT") {
    const {
      description,
      impactArea,
      justification,
      approvedBy,
      status,
      priority,
      estimatedImpact,
      oldValue,
      newValue,
      category,
      changeType,
    } = req.body;

    // Validate required fields for update
    if (!description || !impactArea || !justification || !status) {
      return res.status(400).json({
        error: "Missing required fields: description, impactArea, justification, status",
      });
    }

    try {
      const updatedLog = await prisma.changeLog.update({
        where: { id: numericId },
        data: {
          description,
          impactArea,
          justification,
          approvedBy: approvedBy ?? null,
          status,
          priority: priority ?? null,
          estimatedImpact: estimatedImpact ?? null,
          oldValue: oldValue ?? null,
          newValue: newValue ?? null,
          category: category ?? null,
          changeType: changeType ?? null,
        },
      });

      return res.status(200).json(updatedLog);
    } catch (error) {
      console.error("Error updating change log:", error);
      return res.status(500).json({ error: "Failed to update change log" });
    }
  }

  if (req.method === "DELETE") {
    try {
      await prisma.changeLog.delete({
        where: { id: numericId },
      });
      return res.status(204).end();
    } catch (error) {
      console.error("Error deleting change log:", error);
      return res.status(500).json({ error: "Failed to delete change log" });
    }
  }

  res.setHeader("Allow", ["PUT", "DELETE"]);
  return res.status(405).json({ error: `Method ${req.method} not allowed` });
}
