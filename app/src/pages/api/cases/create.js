import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { caseData } = req.body;
    debugger;
    try {
      const newCase = await prisma.case.create({
        data: caseData,
      });

      res.status(201).json(newCase);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }

  // Ensure to disconnect Prisma Client after the request is handled
  await prisma.$disconnect();
}
