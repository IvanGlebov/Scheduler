import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";


type Board = {
  id: number,
  name: string,
  status: string | "not started" | "completed",
  tasksIds: Array<number>,
  ownersIds: Array<number>
}


const boardsAdapter = createEntityAdapter<Board>({})

export const boardsSlice = createSlice({
  name: "boards",
  initialState: boardsAdapter.getInitialState(),
  reducers: {
    userAdded: boardsAdapter.addOne, // Add new entity. Id should be new
    userUpdate: boardsAdapter.updateOne, // If user.id is the same - entity will be updated
    usersSet: boardsAdapter.setAll // Set all Entities at once
  }
})

export default boardsSlice
