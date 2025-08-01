"use client"

import { useState } from "react"
import { useAppSelector } from "@/hooks/redux"
import { selectFilteredTodos } from "@/store/slices/todoSlice"
import { TodoItem } from "./TodoItem"
import { TodoForm } from "./TodoForm"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Status, type Todo } from "@/types/todo"
import { cn } from "@/lib/utils"

export function TodoList() {
  const todos = useAppSelector(selectFilteredTodos)
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null)

  const groupedTodos = {
    [Status.PENDING]: todos.filter((todo) => todo.status === Status.PENDING),
    [Status.IN_PROGRESS]: todos.filter((todo) => todo.status === Status.IN_PROGRESS),
    [Status.COMPLETED]: todos.filter((todo) => todo.status === Status.COMPLETED),
  }

  const statusConfig = {
    [Status.PENDING]: {
      title: "Pending",
      color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    },
    [Status.IN_PROGRESS]: {
      title: "In Progress",
      color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    },
    [Status.COMPLETED]: {
      title: "Completed",
      color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    },
  }

  if (todos.length === 0) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-muted-foreground">No tasks found</p>
            <p className="text-sm text-muted-foreground mt-1">Create your first task to get started</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <div className="space-y-6">
        {Object.entries(groupedTodos).map(([status, statusTodos]) => (
          <Card key={status}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {statusConfig[status as Status].title}
                <Badge variant="secondary" className={cn(statusConfig[status as Status].color)}>
                  {statusTodos.length}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {statusTodos.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  No {statusConfig[status as Status].title.toLowerCase()} tasks
                </p>
              ) : (
                <div className="space-y-3">
                  {statusTodos.map((todo) => (
                    <TodoItem key={todo.id} todo={todo} onEdit={() => setEditingTodo(todo)} />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {editingTodo && <TodoForm open={!!editingTodo} onClose={() => setEditingTodo(null)} todo={editingTodo} />}
    </>
  )
}
