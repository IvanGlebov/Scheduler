import { createSlice, PayloadAction }   from '@reduxjs/toolkit'
import { createUser, fetchUser, logIn } from './thunks'
import { User }                         from './types'

const userInitialState: User = {
  id: 0,
  name: 'sample user',
  status: 'initial',
  loggedIn: false,
}


export const userSlice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state = { ...action.payload }
    },
    logOut: (state, action: PayloadAction) => {
      state.loggedIn = false
    }
  },
  extraReducers: (builder) => {
    // Fetch user information
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      // console.log('user fetch successful')
      state.id = action.payload.id
      state.name = action.payload.name
      state.status = action.payload.status
      state.loggedIn = action.payload.loggedIn
    })
    builder.addCase(fetchUser.pending, (state) => { state.status = 'fetching' })
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.status = 'rejected'
      state.message = action.error.message
    })
    // LogIn user
    builder.addCase(logIn.fulfilled, (state, action) => {
      // console.log('user loggedIn successful')
      state.id = action.payload.id
      state.name = action.payload.name
      state.status = action.payload.status
      state.loggedIn = action.payload.loggedIn
    })
    builder.addCase(logIn.pending, (state) => { state.status = 'fetching' })
    builder.addCase(logIn.rejected, (state, action) => {
      state.status = 'rejected'
      state.message = action.error.message
    })
    // Register user
    builder.addCase(createUser.fulfilled, (state, action) => {
      console.log('user created successful')
      console.log(action)
      state.message = action.payload
      state.status = 'idle'
    })
    builder.addCase(createUser.pending, (state) => { state.status = 'fetching' })
    builder.addCase(createUser.rejected, (state, action) => {
      state.status = 'rejected'
      state.message = action.error.message
    })
  }
})

export default userSlice


export const { setUser, logOut } = userSlice.actions
