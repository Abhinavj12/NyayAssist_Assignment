import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import type { Todo, Priority, Status } from "@/types/todo"
import type { RootState } from "../store"

interface TodoState {
  todos: Todo[]
  loading: boolean
  error: string | null
  filters: {
    search: string | null
    status: Status | null
    priority: Priority | null
  }
}

const initialState: TodoState = {
  todos: [],
  loading: false,
  error: null,
  filters: {
    search: null,
    status: null,
    priority: null,
  },
}

// Async thunks
export const fetchTodos = createAsyncThunk("todos/fetchTodos", async (_, { getState, rejectWithValue }) => {
  try {
    const state = getState() as RootState
    const { search, status, priority } = state.todos.filters

    const params = new URLSearchParams()
    if (search) params.append("search", search)
    if (status) params.append("status", status)
    if (priority) params.append("priority", priority)

    const response = await fetch(`/api/todos?${params}`)
    if (!response.ok) throw new Error("Failed to fetch todos")

    return await response.json()
  } catch (error) {
    return rejectWithValue(error instanceof Error ? error.message : "Unknown error")
  }
})

export const createTodo = createAsyncThunk(
  "todos/createTodo",
  async (todoData: Omit<Todo, "id" | "userId" | "createdAt" | "updatedAt">, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(todoData),
      })

      if (!response.ok) throw new Error("Failed to create todo")
      return await response.json()
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "Unknown error")
    }
  },
)

export const updateTodo = createAsyncThunk(
  "todos/updateTodo",
  async ({ id, ...updates }: Partial<Todo> & { id: string }, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      })

      if (!response.ok) throw new Error("Failed to update todo")
      return await response.json()
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "Unknown error")
    }
  },
)

export const deleteTodo = createAsyncThunk("todos/deleteTodo", async (id: string, { rejectWithValue }) => {
  try {
    const response = await fetch(`/api/todos/${id}`, {
      method: "DELETE",
    })

    if (!response.ok) throw new Error("Failed to delete todo")
    return id
  } catch (error) {
    return rejectWithValue(error instanceof Error ? error.message : "Unknown error")
  }
})

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<TodoState["filters"]>>) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    clearFilters: (state) => {
      state.filters = initialState.filters
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch todos
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false
        state.todos = action.payload
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

      // Create todo
      .addCase(createTodo.fulfilled, (state, action) => {
        state.todos.unshift(action.payload)
      })

      // Update todo
      .addCase(updateTodo.fulfilled, (state, action) => {
        const index = state.todos.findIndex((todo) => todo.id === action.payload.id)
        if (index !== -1) {
          state.todos[index] = action.payload
        }
      })

      // Delete todo
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter((todo) => todo.id !== action.payload)
      })
  },
})

export const { setFilters, clearFilters } = todoSlice.actions

// Selectors
export const selectTodos = (state: RootState) => state.todos.todos
export const selectTodosLoading = (state: RootState) => state.todos.loading
export const selectTodosError = (state: RootState) => state.todos.error
export const selectFilters = (state: RootState) => state.todos.filters

export const selectFilteredTodos = (state: RootState) => {
  const { todos, filters } = state.todos

  return todos.filter((todo) => {
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      if (!todo.title.toLowerCase().includes(searchLower) && !todo.description?.toLowerCase().includes(searchLower)) {
        return false
      }
    }

    if (filters.status && todo.status !== filters.status) {
      return false
    }

    if (filters.priority && todo.priority !== filters.priority) {
      return false
    }

    return true
  })
}

export default todoSlice.reducer
