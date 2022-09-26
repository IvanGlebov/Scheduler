import { createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Group, UserPrivilegesAction }                     from "./types";

const groupsAdapter = createEntityAdapter<Group>({})

export const groupsSlice = createSlice({
  name: "groups",
  initialState: { ...groupsAdapter.getInitialState(), status: 'initial' },
  reducers: {
    groupAdded: (state, action) => {
      groupsAdapter.addOne(state, action.payload)
      state.status = 'addOne'
    }, // Add new entity. ID should be new
    groupUpdate: (state, action) => {
      groupsAdapter.updateOne(state, action.payload)
      state.status = 'updateOne'
    }, // If user.id is the same - entity will be updated
    groupsSet: (state, action) => {
      groupsAdapter.setAll(state, action.payload)
      state.status = 'setAll'
    }, // Set all Entities at once
    groupSetPrivileges: (state, action: PayloadAction<UserPrivilegesAction>) => {
      if (state.entities[action.payload.groupId] !== undefined) {
        let group = state.entities[action.payload.groupId]
        const privileges = group?.usersPrivileges
        if (privileges?.ids !== undefined) {
          if (privileges?.ids.includes(action.payload.userId)) {
            const entity = {userId: action.payload.userId, privileges: action.payload.privileges}
            privileges.entities = {
              ...privileges.entities,
              [entity.userId]: entity
            }
          } else {
            const entity = {userId: action.payload.userId, privileges: action.payload.privileges}
            privileges?.ids.push(entity.userId)
            privileges.entities = {
              ...privileges.entities,
              [entity.userId]: entity
            }
          }
        }
        state.status = 'updatePrivileges'
      }
    },
    fakeFetch: (state) => {
      state.status = 'fetched'
    }
  }
})

export default groupsSlice

export const { groupAdded, groupUpdate, groupsSet, groupSetPrivileges, fakeFetch } = groupsSlice.actions

