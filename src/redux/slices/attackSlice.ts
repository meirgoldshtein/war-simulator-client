import { Action, ActionReducerMapBuilder, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { dataStatus } from "../../types/redux"

import candidateState from "../../types/attackState";
import { IAttack } from "../../types/attack";
import attackState from "../../types/attackState";
import { useSelector } from "react-redux";


const initialData: attackState = {
    error: null,
    status: dataStatus.IDLE,
    attacks: []
}

const fetchAttacks = createAsyncThunk('candidates/getList',
    async (_, thunkAPI) => {
        try {
            const response = await fetch('http://localhost:3000/api/attack', {
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

const launchAttack = createAsyncThunk('candidates/vote',
    async (attack: { name: string, location: string }, thunkAPI) => {
        try {
            const state : any = thunkAPI.getState();
            const organization = state.user.user.organization ;
            
            const payload = {
                rocket: attack.name,
                launchTime: new Date(),
                orgSrc: organization,
                distLocation: attack.location
            }
            const response = await fetch(`http://localhost:3000/api/attack/launch`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token') as string
                },
                body: JSON.stringify(payload)
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


const attackSlice = createSlice({
    name: 'attacks',
    initialState: initialData,
    reducers: {

    },
    extraReducers: (builder: ActionReducerMapBuilder<candidateState>) => {
        builder.addCase(fetchAttacks.pending, (state) => {
            state.status = dataStatus.LOADING
            state.error = null
        }).addCase(fetchAttacks.fulfilled, (state, action) => {
            state.attacks = action.payload as unknown as IAttack[]
            state.error = null
            state.status = dataStatus.SUCCESS
        }).addCase(fetchAttacks.rejected, (state, action) => {
            state.error = action.error as string
            state.attacks = []
            state.status = dataStatus.FAILED
        }).addCase(launchAttack.fulfilled, (state) => {
            state.error = null
            state.status = dataStatus.SUCCESS
        }).addCase(launchAttack.rejected, (state, action) => {
            state.error = action.error as string
            state.status = dataStatus.FAILED
        }).addCase(launchAttack.pending, (state) => {
            state.error = null
            state.status = dataStatus.LOADING
        })
    }
})
export const { } = attackSlice.actions
export { fetchAttacks, launchAttack }
export default attackSlice