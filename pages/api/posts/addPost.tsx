import prisma from "../../../prisma/client";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const session = await unstable_getServerSession(req, res, authOptions);
    if (!session) {
      return res
        .status(401)
        .json({ message: "Please signin to create a post." });
    }
    const student = (String = req.body.student);
    const teacher = (String = req.body.teacher);
    const carType = (String = req.body.carType);
    const date = (Date = req.body.date);
    const startTime = (Date = req.body.startTime);
    const endTime = (Date = req.body.endTime);
    const description = (String = req.body.description);
    const sessionCount = (Number = req.body.sessionCount);

    //Get User
    const prismaUser = await prisma.user.findUnique({
      where: { email: session?.user?.email },
    });
    //Create Post
    try {
      const result = await prisma.DrivingSession.create({
        data: {
          teacher,
          student,
          carType,
          date,
          startTime,
          endTime,
          description,
          sessionCount,
        },
      });
      res.status(200).json(result);
    } catch (err) {
      res.status(403).json({ err: "Error has occured while making a post" });
    }
  }
}
