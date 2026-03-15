
import userReducer from "./userSlice"
import feedReducer from "./feedSlice"
import connectionReducer from "./ConnectionSlice"

import { configureStore } from "@reduxjs/toolkit";

const appStore = configureStore({
   reducer :{
        user: userReducer,
        feed: feedReducer,
        connections: connectionReducer, 
    },
});

export default appStore;