"use client"

import { useState } from "react"
import { useAppDispatch } from "@/hooks/redux"
import { deleteTodo, updateTodo } from "@/store/slices/todoSlice"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ConfirmDialog } from "@/components/common/ConfirmDialog"
import { useToast } from "@/hooks/use-toast"
import { type Todo, Priority, Status } from "@/types/todo"
import {
  MoreHorizontal,
  Edit,
  Trash2,
  Calendar,
  Clock,
  CheckCircle2,
  Circle,
  PlayCircle,
  AlertTriangle,
} from "lucide-react"
import { format, isToday, isTomorrow, isPast } from "date-fns"
import { cn } from "@/lib/utils"

interface TodoItemProps {
  todo: Todo
  onEdit: () => void
}

export function TodoItem({ todo, onEdit }: TodoItemProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const dispatch = useAppDispatch()
  const { toast } = useToast()

  const priorityConfig = {
    [Priority.LOW]: {
      color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      emoji: "🟢",
      label: "Low",
    },
    [Priority.MEDIUM]: {
      color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
      emoji: "🟡",
      label: "Medium",
    },
    [Priority.HIGH]: {
      color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
      emoji: "🔴",
      label: "High",
    },
  }

  const statusConfig = {
    [Status.PENDING]: { icon: Circle, color: "text-gray-400", emoji: "⏳" },
    [Status.IN_PROGRESS]: { icon: PlayCircle, color: "text-blue-600", emoji: "🚀" },
    [Status.COMPLETED]: { icon: CheckCircle2, color: "text-green-600", emoji: "✅" },
  }

  const handleStatusChange = async (newStatus: Status) => {
    try {
      await dispatch(updateTodo({ id: todo.id, status: newStatus })).unwrap()
      toast({
        title: "✅ Success",
        description: `Task status updated to ${statusConfig[newStatus].emoji} ${newStatus.replace("_", " ").toLowerCase()}!`,
        className: "bg-green-50 border-green-200 text-green-800",
      })
    } catch (error) {
      toast({
        title: "❌ Error",
        description: "Failed to update task status.",
        variant: "destructive",
      })
    }
  }

  const handleDelete = async () => {
    try {
      await dispatch(deleteTodo(todo.id)).unwrap()
      toast({
        title: "🗑️ Deleted",
        description: "Task deleted successfully!",
        className: "bg-red-50 border-red-200 text-red-800",
      })
    } catch (error) {
      toast({
        title: "❌ Error",
        description: "Failed to delete task.",
        variant: "destructive",
      })
    }
  }

  const StatusIcon = statusConfig[todo.status].icon
  const isOverdue = todo.dueDate && isPast(new Date(todo.dueDate)) && todo.status !== Status.COMPLETED
  const isDueToday = todo.dueDate && isToday(new Date(todo.dueDate))
  const isDueTomorrow = todo.dueDate && isTomorrow(new Date(todo.dueDate))

  const getDueDateDisplay = () => {
    if (!todo.dueDate) return null

    const dueDate = new Date(todo.dueDate)
    let dateText = ""
    let colorClass = "text-muted-foreground"

    if (isOverdue) {
      dateText = `Overdue - ${format(dueDate, "MMM dd, yyyy")}`
      colorClass = "text-red-600 dark:text-red-400 font-medium"
    } else if (isDueToday) {
      dateText = "Due Today"
      colorClass = "text-orange-600 dark:text-orange-400 font-medium"
    } else if (isDueTomorrow) {
      dateText = "Due Tomorrow"
      colorClass = "text-blue-600 dark:text-blue-400 font-medium"
    } else {
      dateText = format(dueDate, "MMM dd, yyyy")
    }

    if (todo.dueTime) {
      dateText += ` at ${todo.dueTime}`
    }

    return { dateText, colorClass }
  }

  const dueDateInfo = getDueDateDisplay()

  return (
    <>
      <Card
        className={cn(
          "transition-all duration-300 hover:shadow-lg hover:scale-[1.02] border-l-4",
          todo.status === Status.COMPLETED && "opacity-75 bg-gray-50 dark:bg-gray-900",
          isOverdue && "border-l-red-500 bg-red-50/30 dark:bg-red-900/10",
          isDueToday && "border-l-orange-500 bg-orange-50/30 dark:bg-orange-900/10",
          todo.priority === Priority.HIGH && !isOverdue && !isDueToday && "border-l-red-400",
          todo.priority === Priority.MEDIUM && !isOverdue && !isDueToday && "border-l-yellow-400",
          todo.priority === Priority.LOW && !isOverdue && !isDueToday && "border-l-green-400",
        )}
      >
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3 flex-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 mt-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
                onClick={() => {
                  const nextStatus =
                    todo.status === Status.COMPLETED
                      ? Status.PENDING
                      : todo.status === Status.PENDING
                        ? Status.IN_PROGRESS
                        : Status.COMPLETED
                  handleStatusChange(nextStatus)
                }}
              >
                <StatusIcon className={cn("h-5 w-5", statusConfig[todo.status].color)} />
              </Button>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <h3
                    className={cn(
                      "font-semibold text-base leading-tight",
                      todo.status === Status.COMPLETED && "line-through text-muted-foreground",
                    )}
                  >
                    {todo.title}
                  </h3>

                  {isOverdue && <AlertTriangle className="h-4 w-4 text-red-500 ml-2 flex-shrink-0" />}
                </div>

                {todo.description && (
                  <p className="text-sm text-muted-foreground mt-1 mb-3 line-clamp-2 leading-relaxed">
                    {todo.description}
                  </p>
                )}

                <div className="flex items-center gap-3 flex-wrap">
                  <Badge
                    variant="secondary"
                    className={cn("text-xs font-medium px-2 py-1", priorityConfig[todo.priority].color)}
                  >
                    {priorityConfig[todo.priority].emoji} {priorityConfig[todo.priority].label}
                  </Badge>

                  {dueDateInfo && (
                    <div className={cn("flex items-center gap-1 text-xs", dueDateInfo.colorClass)}>
                      <Calendar className="h-3 w-3" />
                      {dueDateInfo.dateText}
                    </div>
                  )}

                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    Created {format(new Date(todo.createdAt), "MMM dd")}
                  </div>
                </div>
              </div>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-gray-100 dark:hover:bg-gray-800">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={onEdit} className="cursor-pointer">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Task
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setShowDeleteDialog(true)}
                  className="text-red-600 dark:text-red-400 cursor-pointer"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Task
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>

      <ConfirmDialog
        open={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleDelete}
        title="🗑️ Delete Task"
        description="Are you sure you want to delete this task? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
      />
    </>
  )
}
