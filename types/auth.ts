export interface User {
  id: string
  name: string
  email: string
  image?: string
}

export interface AuthSession {
  user: User
  expires: string
}
