interface Word {
  id: number
  title: string
  content: string
}

interface MarkWord {
  email: string
  title: string
}

interface User {
  email: string
  name: string
  role: string
  userId: number
  username: string
}

interface UserWord {
  dictionary: Word
  user: User
  userDicId: number
}

export type { Word, MarkWord, UserWord }
