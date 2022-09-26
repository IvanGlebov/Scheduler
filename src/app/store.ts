import { configureStore } from "@reduxjs/toolkit";
import usersSlice         from "./features/usersSlice";
import tasksSlice         from "./features/tasksSlice";
import groupsSlice        from "./features/Groups/groupsSlice";
import boardsSlice        from "./features/boardsSlice";
import { userSlice }      from "./features/User/userSlice";
import { useDispatch }    from "react-redux";

// It will be automatically passed through combineReducers inside configureStore
const reducer = {
  user: userSlice.reducer,
  users: usersSlice.reducer,
  tasks: tasksSlice.reducer,
  boards: boardsSlice.reducer,
  groups: groupsSlice.reducer
}

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production'
})


export default store;

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()

