export interface UserEntity {
  id: string
  name: string
  email: string
  password: string
}

export interface RolesEntity {
  id: string
  name: string
  description: string
  createdAt: Date
  updatedAt: Date
}
