"use client"

import type React from "react"

import { useState } from "react"
import { useAppDispatch } from "@/hooks/redux"
import { createTodo, updateTodo } from "@/store/slices/todoSlice"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { type Todo, Priority, Status } from "@/types/todo"
import { Calendar, AlertCircle } from "lucide-react"

interface TodoFormProps {
  open: boolean
  onClose: () => void
  todo?: Todo
}

export function TodoForm({ open, onClose, todo }: TodoFormProps) {
  const [formData, setFormData] = useState({
    title: todo?.title || "",
    description: todo?.description || "",
    dueDate: todo?.dueDate ? new Date(todo.dueDate).toISOString().split("T")[0] : "",
    dueTime: todo?.dueTime || "",
    priority: todo?.priority || Priority.MEDIUM,
    status: todo?.status || Status.PENDING,
  })
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useAppDispatch()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const todoData = {
        ...formData,
        dueDate: formData.dueDate ? new Date(formData.dueDate) : null,
      }

      if (todo) {
        await dispatch(updateTodo({ id: todo.id, ...todoData })).unwrap()
        toast({
          title: "✅ Success",
          description: "Task updated successfully!",
          className: "bg-green-50 border-green-200 text-green-800",
        })
      } else {
        await dispatch(createTodo(todoData)).unwrap()
        toast({
          title: "🎉 Success",
          description: "Task created successfully! Reminder will be sent if due date is set.",
          className: "bg-green-50 border-green-200 text-green-800",
        })
      }
      onClose()
    } catch (error) {
      toast({
        title: "❌ Error",
        description: "Failed to save task. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const priorityColors = {
    [Priority.LOW]: "text-green-600 bg-green-50 border-green-200",
    [Priority.MEDIUM]: "text-yellow-600 bg-yellow-50 border-yellow-200",
    [Priority.HIGH]: "text-red-600 bg-red-50 border-red-200",
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold flex items-center gap-2">
            {todo ? "✏️ Edit Task" : "➕ Create New Task"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardContent className="p-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-medium">
                  Task Title *
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="What needs to be done?"
                  className="text-base"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-medium">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Add more details about this task..."
                  rows={3}
                  className="resize-none"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 space-y-4">
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="h-4 w-4 text-blue-600" />
                <Label className="text-sm font-medium">Due Date & Time</Label>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dueDate" className="text-xs text-muted-foreground">
                    Date
                  </Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                    className="text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dueTime" className="text-xs text-muted-foreground">
                    Time
                  </Label>
                  <Input
                    id="dueTime"
                    type="time"
                    value={formData.dueTime}
                    onChange={(e) => setFormData({ ...formData, dueTime: e.target.value })}
                    className="text-sm"
                  />
                </div>
              </div>

              {formData.dueDate && (
                <div className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <AlertCircle className="h-4 w-4 text-blue-600" />
                  <span className="text-sm text-blue-700">
                    📧 Email reminder will be sent 1 hour before the deadline
                  </span>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="priority" className="text-sm font-medium">
                    Priority Level
                  </Label>
                  <Select
                    value={formData.priority}
                    onValueChange={(value: Priority) => setFormData({ ...formData, priority: value })}
                  >
                    <SelectTrigger className={priorityColors[formData.priority]}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={Priority.LOW} className="text-green-600">
                        🟢 Low Priority
                      </SelectItem>
                      <SelectItem value={Priority.MEDIUM} className="text-yellow-600">
                        🟡 Medium Priority
                      </SelectItem>
                      <SelectItem value={Priority.HIGH} className="text-red-600">
                        🔴 High Priority
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status" className="text-sm font-medium">
                    Status
                  </Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value: Status) => setFormData({ ...formData, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={Status.PENDING}>⏳ Pending</SelectItem>
                      <SelectItem value={Status.IN_PROGRESS}>🚀 In Progress</SelectItem>
                      <SelectItem value={Status.COMPLETED}>✅ Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose} className="px-6 bg-transparent">
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Saving...
                </>
              ) : (
                <>{todo ? "💾 Update Task" : "🚀 Create Task"}</>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
