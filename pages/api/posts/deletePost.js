import prisma from "../../../prisma/client"
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"

export default async function handler(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions)
  if (!session) {
    return res.status(401).json({ message: "Please signin to create a drivingSessionId." })
  }
  if (req.method === "DELETE") {
    const drivingSessionId = req.body
    try {
      const result = await prisma.DrivingSession.delete({
        where: {
          id: drivingSessionId,
        },
      })

      res.status(200).json(result)
    } catch (err) {
      res.status(403).json({ err: "Error has occured while deleting a drivingSession" })
    }
  }
}
