const fetch = require("node-fetch")

async function testReminders() {
  try {
    console.log("🧪 Testing reminder system...")

    const response = await fetch("http://localhost:3000/api/reminders", {
      method: "POST",
    })

    const result = await response.json()
    console.log("📧 Test result:", result)

    if (result.results && result.results.length > 0) {
      console.log("✅ Found tasks to remind about!")
    } else {
      console.log("ℹ️  No tasks found that need reminders right now.")
      console.log("💡 Try creating a task due within the next hour to test.")
    }
  } catch (error) {
    console.error("❌ Test failed:", error)
  }
}

testReminders()
