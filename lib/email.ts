interface ReminderEmailData {
  to: string
  userName: string
  taskTitle: string
  taskDescription?: string | null
  dueDate: Date // This is now the combined date/time
  dueTime?: string | null
  priority: string
}

export async function sendReminderEmail(data: ReminderEmailData) {
  // For development, log the email instead of sending
  if (process.env.NODE_ENV === "development") {
    console.log("📧 Email Reminder (Development Mode):")
    console.log("To:", data.to)
    console.log("Subject: 🔔 Task Reminder - Due Soon!")
    console.log("Content:")
    console.log(`
      Hi ${data.userName}! 👋
      
      This is a friendly reminder that your task is due soon:
      
      📋 Task: ${data.taskTitle}
      ${data.taskDescription ? `📝 Description: ${data.taskDescription}` : ""}
      📅 Due: ${data.dueDate.toLocaleString()} (${data.dueDate.toISOString()})
      🔥 Priority: ${data.priority}
      
      Don't forget to complete it on time! ⏰
      
      Best regards,
      Your TodoApp Team 🚀
    `)
    return Promise.resolve()
  }

  // Production email code would go here
  throw new Error("Email service not configured for production")
}
