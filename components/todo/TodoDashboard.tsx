"use client"

import { useState, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/hooks/redux"
import { fetchTodos, selectTodos, selectTodosLoading } from "@/store/slices/todoSlice"
import { TodoForm } from "./TodoForm"
import { TodoList } from "./TodoList"
import { TodoFilters } from "./TodoFilters"
import { TodoStats } from "./TodoStats"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus } from "lucide-react"
import { LoadingSpinner } from "@/components/common/LoadingSpinner"

export function TodoDashboard() {
  const [showForm, setShowForm] = useState(false)
  const dispatch = useAppDispatch()
  const todos = useAppSelector(selectTodos)
  const loading = useAppSelector(selectTodosLoading)

  useEffect(() => {
    dispatch(fetchTodos())
  }, [dispatch])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Manage your tasks and stay organized</p>
        </div>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Task
        </Button>
      </div>

      <TodoStats />

      <div className="grid gap-6 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Filters</CardTitle>
            </CardHeader>
            <CardContent>
              <TodoFilters />
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3">
          <TodoList />
        </div>
      </div>

      {showForm && <TodoForm open={showForm} onClose={() => setShowForm(false)} />}
    </div>
  )
}
