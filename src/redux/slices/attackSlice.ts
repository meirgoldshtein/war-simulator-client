import { Action, ActionReducerMapBuilder, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { dataStatus } from "../../types/redux"

import candidateState from "../../types/attackState";
import { IAttack } from "../../types/attack";
import attackState from "../../types/attackState";


const initialData: attackState = {
    error: null,
    status: dataStatus.IDLE,
    attacks: []
}

const fetchCandidates = createAsyncThunk('candidates/getList',
    async (_, thunkAPI) => {
        try {
            const response = await fetch('http://localhost:3000/api/candidates', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token') as string
                }
            }) 
            if (!response.ok) {
                return thunkAPI.rejectWithValue("Couldn't get candidates Please try again")
            }
            const data = await response.json()
            return data
        } catch (error) {
            return thunkAPI.rejectWithValue('something went wrong')
        }
    })

    const voteForCandidate = createAsyncThunk('candidates/vote',
    async (id: string, thunkAPI) => {
        try {
            const response = await fetch(`http://localhost:3000/api/candidates/vote/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token') as string
                }
            }) 
            if (!response.ok) {
                return thunkAPI.rejectWithValue("Couldn't vote Please try again")
            }
            const data = await response.json()
            return data
        } catch (error) {
            return thunkAPI.rejectWithValue('something went wrong')
        }
    })


const candidateSlice = createSlice({
    name: 'candidate',
    initialState: initialData,
    reducers: {
        updateCandidates: (state, action) => {
             state.attacks = action.payload
             }
    },
    extraReducers: (builder: ActionReducerMapBuilder<candidateState>) => { 
        builder.addCase(fetchCandidates.pending, (state) => {
             state.status = dataStatus.LOADING 
             state.error = null
        }).addCase(fetchCandidates.fulfilled, (state, action) => {
            state.attacks = action.payload as unknown as IAttack[]
            state.error = null
            state.status = dataStatus.SUCCESS
        }).addCase(fetchCandidates.rejected, (state, action) => {
            state.error = action.error as string
            state.attacks = []
            state.status = dataStatus.FAILED
        })
    }
})
export const { updateCandidates } = candidateSlice.actions
export { fetchCandidates, voteForCandidate }
export default candidateSlice