import { Action, ActionReducerMapBuilder, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { dataStatus } from "../../types/redux"

import candidateState from "../../types/attackState";


import organizationState from "../../types/organizationState";
import IOrganization from "../../types/organization";


const initialData: organizationState = {
    error: null,
    status: dataStatus.IDLE,
    organizations: []
}
const URL = import.meta.env.VITE_SERVER || 'http://localhost:3000';
export const fetchOrganizations = createAsyncThunk('candidates/getList',
    async (_, thunkAPI) => {
        try {
            const response = await fetch(`${URL}api/organizations`)
            if (!response.ok) {
                return thunkAPI.rejectWithValue("Couldn't get organizations Please try again")
            }
            const data = await response.json()

            return data
        } catch (error) {
            return thunkAPI.rejectWithValue('something went wrong')
            
        }
    })



const organizationSlice = createSlice({
    name: 'organizations',
    initialState: initialData,
    reducers: {
    },
    extraReducers: (builder: ActionReducerMapBuilder<organizationState>) => { 
        builder.addCase(fetchOrganizations.pending, (state) => {
             state.status = dataStatus.LOADING 
             state.error = null
        }).addCase(fetchOrganizations.fulfilled, (state, action) => {
            state.organizations = action.payload as unknown as IOrganization[]
            state.error = null
            state.status = dataStatus.SUCCESS
        }).addCase(fetchOrganizations.rejected, (state, action) => {
            state.error = action.error as string
            state.organizations = []
            state.status = dataStatus.FAILED
        })
    }
})
export const {  } = organizationSlice.actions
export default organizationSlice