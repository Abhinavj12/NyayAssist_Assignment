import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface AuthState {
  isAuthenticated: boolean
  user: {
    id: string
    name: string
    email: string
  } | null
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthState["user"]>) => {
      state.user = action.payload
      state.isAuthenticated = !!action.payload
    },
    clearUser: (state) => {
      state.user = null
      state.isAuthenticated = false
    },
  },
})

export const { setUser, clearUser } = authSlice.actions
export default authSlice.reducer
