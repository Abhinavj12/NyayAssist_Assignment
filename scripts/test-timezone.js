// Quick script to test timezone handling
function combineDateAndTime(dateStr, timeStr) {
  const date = new Date(dateStr)

  if (!timeStr) {
    date.setHours(23, 59, 0, 0)
    return date
  }

  const [hours, minutes] = timeStr.split(":").map(Number)
  date.setHours(hours, minutes, 0, 0)

  return date
}

// Test with your data
const testDate = "2025-08-01T00:00:00.000+00:00"
const testTime = "21:38"

const combined = combineDateAndTime(testDate, testTime)
const now = new Date()
const oneHourFromNow = new Date(now.getTime() + 60 * 60 * 1000)

console.log("📅 Original date:", testDate)
console.log("🕐 Original time:", testTime)
console.log("🔗 Combined:", combined.toISOString())
console.log("🕐 Current time:", now.toISOString())
console.log("🕐 One hour from now:", oneHourFromNow.toISOString())
console.log("✅ Should send reminder?", combined >= now && combined <= oneHourFromNow)
