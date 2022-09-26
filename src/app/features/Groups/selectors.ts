import { RootState } from "../../store";

export const getAllGroupsEntities = (state: RootState) => state.groups.entities

export const getGroupsStatus = (state: RootState) => state.groups.status
