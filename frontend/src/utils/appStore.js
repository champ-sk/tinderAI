
import userReducer from "./userSlice"
import feedReducer from "./feedSlice"
import connectionReducer from "./ConnectionSlice"
import requestReducer from "./requestSlice";

import { configureStore } from "@reduxjs/toolkit";

const appStore = configureStore({
   reducer :{
        user: userReducer,
        feed: feedReducer,
        connections: connectionReducer, 
         requests: requestReducer,
    },
});

export default appStore;