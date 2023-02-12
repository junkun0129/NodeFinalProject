import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState = {enemyhp: 500}

export const enemySlice = createSlice({
    name:"enemy", 
    initialState, 
    reducers:{
        atackEnemy:(state, action:PayloadAction<{atack:Number}>)=>{
            state.enemyhp=-action.payload.atack
        }
    }
})

export default enemySlice.reducer;
export const {atackEnemy} = enemySlice.actions 