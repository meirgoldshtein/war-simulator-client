import { Action, ActionReducerMapBuilder, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { dataStatus } from "../../types/redux"
import { IUser } from "../../types/user";
import userState from "../../types/userState";


const initialData: userState = {
    error: null,
    status: dataStatus.IDLE,
    user: null,
    role: undefined

}
const URL = import.meta.env.VITE_SERVER || 'http://localhost:3000';

const fetchLogin = createAsyncThunk('user/login',
    async (user: { username: string, password: string }, thunkAPI) => {
        try {
            const response = await fetch(`${URL}api/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })
            if (!response.ok) {
                return thunkAPI.rejectWithValue("Couldn't login Please try again")
            }
            const data = await response.json()
            localStorage.setItem('token', data.token)
            return data.data
        } catch (error) {
            return thunkAPI.rejectWithValue('something went wrong')
        }
    })

const fetchRegister = createAsyncThunk('user/register',
    async (user: { username: string, password: string, orgId: string}, thunkAPI) => {
        try {
            const response = await fetch(`${URL}api/users/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })
            if (!response.ok) {
                return thunkAPI.rejectWithValue("Couldn't login Please try again")
            }
            const data = await response.json()
  
            return data
        } catch (error) {
            console.log(error)
            return thunkAPI.rejectWithValue('something went wrong')
        }

    })


// Async thunk for checking auth status
const checkAuth = createAsyncThunk(
    'user/verify',
    async (_, { rejectWithValue }) => {
        const token = localStorage.getItem('token');
        if (!token) {
            return rejectWithValue('No token found');
        }

        try {
            const response = await fetch(`${URL}api/users/verify`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',        
                    'Authorization': token
                 },
            });

            if (!response.ok) {
                localStorage.removeItem('token');
                return rejectWithValue('Invalid token');
            }

            const data = await response.json();
            localStorage.setItem('token', data.token)
            return data.data;
        } catch (error) {
            return rejectWithValue('Auth check failed');
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState: initialData,
    reducers: {
        logout: (state) => {
            state.user = null
            state.role = undefined
            localStorage.setItem("token","")

        }
    },
    extraReducers: (builder: ActionReducerMapBuilder<userState>) => {
        builder.addCase(fetchLogin.pending, (state) => {
            state.status = dataStatus.LOADING
            state.error = null
            state.user = null
        }).addCase(fetchLogin.fulfilled, (state, action) => {
            state.user = action.payload as unknown as IUser
            state.error = null
            state.role = action.payload.organization.split(" ")[0] == "IDF" ? "IDF" : "TERRORIST"
            state.status = dataStatus.SUCCESS
        }).addCase(fetchLogin.rejected, (state, action) => {
            state.error = action.error as string
            state.role = undefined
            state.user = null
            state.status = dataStatus.FAILED
        }).addCase(fetchRegister.fulfilled, (state) => {
            state.user = null
            state.error = null
            state.status = dataStatus.SUCCESS
        }).addCase(fetchRegister.rejected, (state, action) => {
            state.error = action.error as string
            state.user = null
            state.status = dataStatus.FAILED
        }).addCase(checkAuth.fulfilled, (state, action) => {
            state.user = action.payload as unknown as IUser
            state.status = dataStatus.SUCCESS
            state.role = action.payload.organization.split(" ")[0] == "IDF" ? "IDF" : "TERRORIST"
        }).addCase(checkAuth.rejected, (state, action) => {
            state.error = action.error as string
            state.user = null
            state.role = undefined
            state.status = dataStatus.FAILED
        }).addCase(checkAuth.pending, (state) => {
            state.status = dataStatus.LOADING
            state.error = null
            state.user = null
        })
    }
})

export const {  logout } = userSlice.actions
export { fetchLogin, fetchRegister, checkAuth }
export default userSlice
