import prisma from "../../../prisma/client"


export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const data = await prisma.DrivingSession.findMany({
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
        orderBy: {
          createdAt: "desc",
        },
      })
      return res.status(200).json(data)
    } catch (err) {
      res.status(403).json({ err: "Error has occured while making a DrivingSession" })
    }
  }
}
