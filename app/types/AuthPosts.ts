export type AuthPosts = {
  email: string
  id: string
  image: string
  name: string
  drivingSessions: {
    student: string,
          teacher: string,
          carType: string,
          date: Date,
          startTime: Date,
          endTime: Date,
          description: string,
          sessionCount: number
  }[]
}


