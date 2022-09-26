import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { RootState }                        from "../store";


type User = {
  id: number,
  name: string,
  email?: string,
  groupId?: number
}

const usersAdapter = createEntityAdapter<User>({})

export const usersSlice = createSlice({
  name: "users",
  initialState: usersAdapter.getInitialState(),
  reducers: {
    userAdded: usersAdapter.addOne, // Add new entity. Id should be new
    userUpdate: usersAdapter.updateOne, // If user.id is the same - entity will be updated
    usersSet: usersAdapter.setAll // Set all Entities at once
  },
  extraReducers: (builder) => {

  }
})

export default usersSlice

export const { userAdded, userUpdate, usersSet } = usersSlice.actions


export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
  selectById
} = usersAdapter.getSelectors((state: RootState) => state.users)
// Using spread operation this way you can use selectors by just passing them the whole store state instead of a specific part
