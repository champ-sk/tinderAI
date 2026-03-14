
import userReducer from "./userSlice"
import feedReducer from "./feedSlice"

import { configureStore } from "@reduxjs/toolkit";

const appStore = configureStore({
   reducer :{
        user: userReducer,
        feed: feedReducer
    },
});

export default appStore;