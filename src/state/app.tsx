import { createAction, createReducer } from "@reduxjs/toolkit"

export const MAIN_COLOR = createAction<boolean, 'MAIN_COLOR'>('MAIN_COLOR');

const initialState = {
    isDarkMode : false
}

const MainState = createReducer(initialState, (builder) =>{
    builder
    .addDefaultCase((state: any) => state);
})

export default MainState;
