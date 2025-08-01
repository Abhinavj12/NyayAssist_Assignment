const cron = require("node-cron")

// Run every 15 minutes to check for reminders
cron.schedule("*/15 * * * *", async () => {
  try {
    console.log("🔍 Checking for reminder emails to send...")

    const response = await fetch(`${process.env.NEXTAUTH_URL || "http://localhost:3000"}/api/reminders`, {
      method: "POST",
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result = await response.json()
    console.log("📧 Reminder check result:", result)
  } catch (error) {
    console.error("❌ Error checking reminders:", error)
  }
})

console.log("🚀 Reminder service started - checking every 15 minutes")

// Keep the process running
process.on("SIGINT", () => {
  console.log("\n👋 Reminder service stopped")
  process.exit(0)
})
