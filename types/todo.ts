export enum Priority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}

export enum Status {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
}

export interface Todo {
  id: string
  title: string
  description?: string
  dueDate?: Date | null
  dueTime?: string | null
  priority: Priority
  status: Status
  reminderSent: boolean
  userId: string
  createdAt: Date
  updatedAt: Date
}
