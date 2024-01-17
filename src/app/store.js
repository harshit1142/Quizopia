import { configureStore } from "@reduxjs/toolkit";
import { UserReducer } from "../Redux/UserRedux";


export const store = configureStore({
    reducer: UserReducer
});