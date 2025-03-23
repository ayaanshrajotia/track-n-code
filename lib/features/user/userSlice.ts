import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        name: "John Doe",
        email: "johndoe@gmail.com",
    },
    reducers: {},
});

export const {} = userSlice.actions;

export default userSlice.reducer;
