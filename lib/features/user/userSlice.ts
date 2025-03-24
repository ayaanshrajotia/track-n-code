import axiosInstance from "@/app/utils/axios";
import { Problem, Rating } from "@/types/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export const getUserDashboardEdit = createAsyncThunk(
    "user/getUserDashboardEdit",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get("/dashboard");
            return response.data;
        } catch (error) {
            const axiosError = error as AxiosError; // Explicitly type error as AxiosError
            return rejectWithValue(
                (axiosError.response?.data as { error?: string })?.error ||
                    "Something went wrong"
            );
        }
    }
);

export const updateUserDashboardEdit = createAsyncThunk(
    "user/updateUserDashboardEdit",
    async (data: FormData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("/dashboard/edit", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            return response.data;
        } catch (error) {
            const axiosError = error as AxiosError; // Explicitly type error as AxiosError

            return rejectWithValue(
                (axiosError.response?.data as { error?: string })?.error ||
                    "Something went wrong"
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
    loading: boolean;
    editLoading: boolean;
    error: string | null;
    message: null | string;
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
    loading: true,
    editLoading: false,
    error: null,
    message: null,
};
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        clearMessage: (state) => {
            state.message = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserDashboardEdit.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserDashboardEdit.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;

                const user = action.payload.result;
                console.log(user);
                state.full_name = user.full_name;
                state.email = user.email;
                state.username = user.username;
                state.profile_image = user.profile_image.url;
                state.ratings = user.ratings;
            })
            .addCase(getUserDashboardEdit.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                console.log("error", action.payload);
            })
            .addCase(updateUserDashboardEdit.pending, (state) => {
                state.editLoading = true;
                state.error = null;
            })
            .addCase(updateUserDashboardEdit.fulfilled, (state, action) => {
                const user = action.payload.result;
                console.log(user);
                state.editLoading = false;
                state.error = null;
                state.full_name = user.full_name;
                state.profile_image = user.profile_image.url;
                state.ratings = user.ratings;
                state.message = action.payload.message;
            })
            .addCase(updateUserDashboardEdit.rejected, (state, action) => {
                state.editLoading = false;
                state.error = action.payload as string;
                console.log("Error", action.payload);
            });
    },
});

export const { clearMessage } = userSlice.actions;

export default userSlice.reducer;
