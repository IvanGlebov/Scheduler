import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";


type Task = {
  id: number,
  name: string,
  email: string,
  groupId: number
}


const tasksAdapter = createEntityAdapter<Task>({})

export const tasksSlice = createSlice({
  name: "tasks",
  initialState: tasksAdapter.getInitialState(),
  reducers: {
    userAdded: tasksAdapter.addOne, // Add new entity. Id should be new
    userUpdate: tasksAdapter.updateOne, // If user.id is the same - entity will be updated
    usersSet: tasksAdapter.setAll // Set all Entities at once
  }
})

export default tasksSlice

