"use client"

import { cn } from "@/lib/utils"

import { useAppSelector } from "@/hooks/redux"
import { selectTodos } from "@/store/slices/todoSlice"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Status, Priority } from "@/types/todo"
import { CheckCircle2, Clock, PlayCircle, AlertTriangle, Calendar, TrendingUp } from "lucide-react"
import { isPast, isToday, isTomorrow } from "date-fns"

export function TodoStats() {
  const todos = useAppSelector(selectTodos)

  const stats = {
    total: todos.length,
    completed: todos.filter((todo) => todo.status === Status.COMPLETED).length,
    inProgress: todos.filter((todo) => todo.status === Status.IN_PROGRESS).length,
    pending: todos.filter((todo) => todo.status === Status.PENDING).length,
    highPriority: todos.filter((todo) => todo.priority === Priority.HIGH).length,
    overdue: todos.filter((todo) => todo.dueDate && isPast(new Date(todo.dueDate)) && todo.status !== Status.COMPLETED)
      .length,
    dueToday: todos.filter(
      (todo) => todo.dueDate && isToday(new Date(todo.dueDate)) && todo.status !== Status.COMPLETED,
    ).length,
    dueTomorrow: todos.filter(
      (todo) => todo.dueDate && isTomorrow(new Date(todo.dueDate)) && todo.status !== Status.COMPLETED,
    ).length,
  }

  const completionRate = stats.total > 0 ? (stats.completed / stats.total) * 100 : 0

  const statCards = [
    {
      title: "Total Tasks",
      value: stats.total,
      icon: TrendingUp,
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      emoji: "📊",
    },
    {
      title: "Completed",
      value: stats.completed,
      icon: CheckCircle2,
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      emoji: "✅",
    },
    {
      title: "In Progress",
      value: stats.inProgress,
      icon: PlayCircle,
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      emoji: "🚀",
    },
    {
      title: "Pending",
      value: stats.pending,
      icon: Clock,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
      emoji: "⏳",
    },
    {
      title: "High Priority",
      value: stats.highPriority,
      icon: AlertTriangle,
      color: "text-red-600",
      bgColor: "bg-red-50 dark:bg-red-900/20",
      emoji: "🔴",
    },
    {
      title: "Due Today",
      value: stats.dueToday,
      icon: Calendar,
      color: "text-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
      emoji: "📅",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        {statCards.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title} className="hover:shadow-md transition-shadow duration-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                <div className={cn("p-2 rounded-full", stat.bgColor)}>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold">{stat.value}</span>
                  <span className="text-lg">{stat.emoji}</span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Overdue Alert */}
      {stats.overdue > 0 && (
        <Card className="border-red-200 bg-red-50 dark:bg-red-900/10">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <div>
                <p className="font-medium text-red-800 dark:text-red-200">
                  ⚠️ {stats.overdue} task{stats.overdue > 1 ? "s are" : " is"} overdue!
                </p>
                <p className="text-sm text-red-600 dark:text-red-300">Please review and update your overdue tasks.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Progress Card */}
      {stats.total > 0 && (
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
          <CardHeader>
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Completion Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Overall Progress</span>
                <span className="text-lg font-bold">{Math.round(completionRate)}%</span>
              </div>
              <Progress value={completionRate} className="h-3 bg-white dark:bg-gray-800" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{stats.completed} completed</span>
                <span>{stats.total - stats.completed} remaining</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
