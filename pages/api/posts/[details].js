import prisma from "../../../prisma/client"

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const data = await prisma.drivingSessions.findUnique({
        where: {
          id: req.query.details,
        },
        include: {
          student: true,
          teacher: true,
          carType: true,
          date: true,
          startTime: true,
          endTime: true,
          description: true,
          sessionCount: true

        },
      })
      return res.status(200).json(data)
    } catch (err) {
      res.status(403).json({ err: "Error has occured while making a post" })
    }
  }
}
