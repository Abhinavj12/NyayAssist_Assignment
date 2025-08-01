"use client"

import { useAppDispatch, useAppSelector } from "@/hooks/redux"
import { setFilters, selectFilters } from "@/store/slices/todoSlice"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Priority, Status } from "@/types/todo"
import { Search } from "lucide-react"

export function TodoFilters() {
  const dispatch = useAppDispatch()
  const filters = useAppSelector(selectFilters)

  const handleSearchChange = (search: string) => {
    dispatch(setFilters({ ...filters, search }))
  }

  const handleStatusChange = (status: string) => {
    dispatch(setFilters({ ...filters, status: status === "all" ? null : (status as Status) }))
  }

  const handlePriorityChange = (priority: string) => {
    dispatch(setFilters({ ...filters, priority: priority === "all" ? null : (priority as Priority) }))
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="search">Search</Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="search"
            placeholder="Search tasks..."
            value={filters.search || ""}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <Select value={filters.status || "all"} onValueChange={handleStatusChange}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value={Status.PENDING}>Pending</SelectItem>
            <SelectItem value={Status.IN_PROGRESS}>In Progress</SelectItem>
            <SelectItem value={Status.COMPLETED}>Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="priority">Priority</Label>
        <Select value={filters.priority || "all"} onValueChange={handlePriorityChange}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>
            <SelectItem value={Priority.HIGH}>High</SelectItem>
            <SelectItem value={Priority.MEDIUM}>Medium</SelectItem>
            <SelectItem value={Priority.LOW}>Low</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
