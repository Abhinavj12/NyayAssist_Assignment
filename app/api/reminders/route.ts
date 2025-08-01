import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { sendReminderEmail } from "@/lib/email"

function combineDateAndTime(dateStr: Date, timeStr: string | null): Date {
  const date = new Date(dateStr)

  if (!timeStr) {
    // If no time specified, use end of day (23:59)
    date.setHours(23, 59, 0, 0)
    return date
  }

  // Parse time string (HH:MM format)
  const [hours, minutes] = timeStr.split(":").map(Number)

  // Set the time on the date
  date.setHours(hours, minutes, 0, 0)

  return date
}

export async function POST(request: NextRequest) {
  try {
    const now = new Date()
    const oneHourFromNow = new Date(now.getTime() + 60 * 60 * 1000)

    console.log("🕐 Current time:", now.toISOString())
    console.log("🕐 One hour from now:", oneHourFromNow.toISOString())

    // Get all todos that haven't had reminders sent and are not completed
    const todosCandidates = await prisma.todo.findMany({
      where: {
        reminderSent: false,
        status: {
          not: "COMPLETED",
        },
        dueDate: {
          not: null,
        },
      },
      include: {
        user: true,
      },
    })

    console.log(`📋 Found ${todosCandidates.length} candidate todos`)

    const todosDueForReminder = []

    // Filter todos based on combined date and time
    for (const todo of todosCandidates) {
      if (!todo.dueDate) continue

      const combinedDueDateTime = combineDateAndTime(todo.dueDate, todo.dueTime)

      console.log(`📅 Todo "${todo.title}" due at: ${combinedDueDateTime.toISOString()}`)

      // Check if the combined due date/time is within the next hour
      if (combinedDueDateTime >= now && combinedDueDateTime <= oneHourFromNow) {
        todosDueForReminder.push({
          ...todo,
          combinedDueDateTime,
        })
        console.log(`✅ Todo "${todo.title}" needs reminder!`)
      } else {
        console.log(`⏭️ Todo "${todo.title}" not due within next hour`)
      }
    }

    console.log(`📧 Sending reminders for ${todosDueForReminder.length} todos`)

    const results = []

    for (const todo of todosDueForReminder) {
      try {
        await sendReminderEmail({
          to: todo.user.email,
          userName: todo.user.name || "User",
          taskTitle: todo.title,
          taskDescription: todo.description,
          dueDate: todo.combinedDueDateTime,
          dueTime: todo.dueTime,
          priority: todo.priority,
        })

        // Mark reminder as sent
        await prisma.todo.update({
          where: { id: todo.id },
          data: { reminderSent: true },
        })

        results.push({ todoId: todo.id, status: "sent", dueDateTime: todo.combinedDueDateTime.toISOString() })
      } catch (error) {
        console.error(`Failed to send reminder for todo ${todo.id}:`, error)
        results.push({ todoId: todo.id, status: "failed", error: error.message })
      }
    }

    return NextResponse.json({
      message: `Processed ${todosDueForReminder.length} reminders`,
      currentTime: now.toISOString(),
      oneHourFromNow: oneHourFromNow.toISOString(),
      results,
    })
  } catch (error) {
    console.error("Error processing reminders:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
