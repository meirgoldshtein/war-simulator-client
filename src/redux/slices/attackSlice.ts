import { Action, ActionReducerMapBuilder, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { dataStatus } from "../../types/redux"

import candidateState from "../../types/attackState";
import { IAttack } from "../../types/attack";
import attackState from "../../types/attackState";
import { useSelector } from "react-redux";
import { socket } from "../../App";



const initialData: attackState = {
    error: null,
    status: dataStatus.IDLE,
    attacks: []
}
const URL = import.meta.env.VITE_SERVER || 'http://localhost:3000';
const fetchAttacks = createAsyncThunk('',
    async (_, thunkAPI) => {
        try {
            const response = await fetch(URL, {
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

const launchAttack = createAsyncThunk('dfgd/bd',
    async (attack: { name: string, location: string }, thunkAPI) => {
        try {
            socket.emit('newLaunch', attack);
            const state : any = thunkAPI.getState();
            const organization = state.user.user.organization ;
            
            const payload = {
                rocket: attack.name,
                launchTime: new Date(),
                orgSrc: organization,
                distLocation: attack.location
            }
            const response = await fetch(`${URL}/api/attack/launch`, {
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

   export const updateAttack = createAsyncThunk('ddfh/dfdf',
        async (attack: { id: string, status: string }, thunkAPI) => {
            try {

                const response = await fetch(`${URL}/api/attack/update`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': localStorage.getItem('token') as string
                    },
                    body: JSON.stringify({
                        id: attack.id,
                        status: attack.status
                    })
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

export const launchDefense = createAsyncThunk('sfgd/fgd',
    async (attack:{ ammo_id: string, DefName: string}, thunkAPI) => {
        try {



            const response = await fetch(`${URL}/api/attack/intercept`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token') as string
                },
                body: JSON.stringify({
                    ammo_id: attack.ammo_id,
                    DefName: attack.DefName
                })
            })
            if (!response.ok) {
                return thunkAPI.rejectWithValue("Couldn't vote Please try again")
            }

            const data = await response.json()

            return data
        } catch (error) {
            console.log(error)
            return thunkAPI.rejectWithValue('something went wrong')
        }
    })  

const attackSlice = createSlice({
    name: 'attacks',
    initialState: initialData,
    reducers: {
        updateInterceptFromSocket: (state, action) => {
            const attack = state.attacks?.find(attack => attack._id === action.payload._id)
            if (attack) {
                attack.status = action.payload.status
            }
        },
        addAttackFromSocket: (state, action) => {
            state.attacks?.push(action.payload)
        }

    },
    extraReducers: (builder: ActionReducerMapBuilder<candidateState>) => {
        builder.addCase(fetchAttacks.pending, (state) => {
            state.status = dataStatus.LOADING
            state.error = null
        }).addCase(fetchAttacks.fulfilled, (state, action) => {
            state.attacks = action.payload.data as unknown as IAttack[]
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
        }).addCase(updateAttack.fulfilled, (state) => {
            state.error = null
            state.status = dataStatus.SUCCESS
        }).addCase(updateAttack.rejected, (state, action) => {
            state.error = action.error as string
            state.status = dataStatus.FAILED
        }).addCase(updateAttack.pending, (state) => {
            state.error = null
            state.status = dataStatus.LOADING
        }).addCase(launchDefense.fulfilled, (state) => {
            state.error = null
            state.status = dataStatus.SUCCESS
        }).addCase(launchDefense.rejected, (state, action) => {
            state.error = action.error as string
            state.status = dataStatus.FAILED
        }).addCase(launchDefense.pending, (state) => {
            state.error = null
            state.status = dataStatus.LOADING
        })
    }
})
export const { updateInterceptFromSocket, addAttackFromSocket } = attackSlice.actions
export { fetchAttacks, launchAttack }
export default attackSlice