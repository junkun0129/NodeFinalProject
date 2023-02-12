import {configureStore} from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux/es/exports";
import { TypedUseSelectorHook } from "react-redux/es/types";
import enemyReducer from "./features/enemySlice"


export const store = configureStore({
    reducer:{
        enemyReducer
    }
})

export const useAppDispatch:()=>typeof store.dispatch = useDispatch;
export const useAppSelector:TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;
