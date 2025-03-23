import axiosInstance from "@/app/utils/axios";
import { Problem, Rating } from "@/types/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export const getUserDashboardEdit = createAsyncThunk(
    "user/getUserDashboardEdit",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("/dashboard/edit");
            return response.data;
        } catch (error) {
            const axiosError = error as AxiosError; // Explicitly type error as AxiosError
            return rejectWithValue(
                axiosError.response?.data || "Something went wrong"
            );
        }
    }
);

const initialState: {
    full_name: string;
    email: string;
    username: string;
    profile_image: string;
    ratings: Rating[];
    solved_questions: number;
    revision_questions: number;
    easy_questions: number;
    medium_questions: number;
    hard_questions: number;
    recent_questions: Problem[];
    userLoading: boolean;
    error: string | null;
} = {
    full_name: "",
    email: "",
    username: "",
    profile_image: "",
    ratings: [],
    solved_questions: 0,
    revision_questions: 0,
    easy_questions: 0,
    medium_questions: 0,
    hard_questions: 0,
    recent_questions: [],
    userLoading: false,
    error: null,
};
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUserDashboardEdit.pending, (state) => {
                state.userLoading = true;
                state.error = null;
            })
            .addCase(getUserDashboardEdit.fulfilled, (state, action) => {
                state.userLoading = false;
                state.error = null;
                console.log(action.payload);
            })
            .addCase(getUserDashboardEdit.rejected, (state, action) => {
                state.userLoading = false;
                state.error = action.payload as string | null;
            });
    },
});

export const {} = userSlice.actions;

export default userSlice.reducer;
