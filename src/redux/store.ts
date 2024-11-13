import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import attackSlice from "./slices/attackSlice";
import { useDispatch, useSelector } from "react-redux";
import organizationSlice from "./slices/organinationSlice";

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        attacks : attackSlice.reducer,
        organizations : organizationSlice.reducer
    }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()

export default store