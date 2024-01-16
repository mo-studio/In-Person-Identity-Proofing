import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { case_number, expired_at, uuid, status } = req.body;

    const newCase = await prisma.case.create({
      data: {
        case_number,
        expired_at,
        uuid,
        status,
      },
    });

    res.status(201).json(newCase);
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
