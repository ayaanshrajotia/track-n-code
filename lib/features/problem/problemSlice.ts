import axiosInstance from "@/app/utils/axios";
import { CompanyType, InventoryType, TagType } from "@/types/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

type ProblemType = {
    problem_title: string;
    platform_name: string;
    url: string;
    difficulty: string;
    notes: string;
    tags: TagType[];
    resources: string[];
    inventories: InventoryType[];
    companies: CompanyType[];
    time_complexity: string;
    space_complexity: string;
    is_revision: boolean;
};

export const addProblem = createAsyncThunk(
    "problem/addProblem",
    async (data: ProblemType, { rejectWithValue }) => {
        try {
            console.log("data", data);
            const response = await axiosInstance.post("/problem", data);
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

export const getAllTCI = createAsyncThunk(
    "problem/getAllTCI",
    async (_, { rejectWithValue }) => {
        try {
            // const cachedTCI = localStorage.getItem("tci");
            // if (cachedTCI) {
            //     return JSON.parse(cachedTCI);
            // }
            const response = await axiosInstance.get("/tci");
            // localStorage.setItem("tci", JSON.stringify(response.data));
            console.log("response", response.data);
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
    problem: ProblemType | null;
    loading: boolean;
    addLoading: boolean;
    error: string | null;
    inventoriesFromServer: InventoryType[];
    companiesFromServer: CompanyType[];
    tagsFromServer: TagType[];
    TCILoading: boolean;
} = {
    problem: null,
    addLoading: false,
    loading: false,
    error: null,
    inventoriesFromServer: [],
    companiesFromServer: [],
    tagsFromServer: [],
    TCILoading: false,
};

const problemSlice = createSlice({
    name: "problem",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addProblem.pending, (state) => {
                state.addLoading = true;
                state.error = null;
            })
            .addCase(addProblem.fulfilled, (state, action) => {
                state.addLoading = false;
                state.problem = action.payload;
            })
            .addCase(addProblem.rejected, (state, action) => {
                state.addLoading = false;
                console.log("Error:", action.payload);
                state.error = action.payload as string;
            })
            .addCase(getAllTCI.pending, (state) => {
                state.error = null;
                state.TCILoading = true;
            })
            .addCase(getAllTCI.fulfilled, (state, action) => {
                state.TCILoading = false;
                state.tagsFromServer = action.payload.result.tags;
                state.companiesFromServer = action.payload.result.companies;
                state.inventoriesFromServer = action.payload.result.inventories;
            })
            .addCase(getAllTCI.rejected, (state, action) => {
                state.TCILoading = false;
                console.log("Error:", action.payload);
                state.error = action.payload as string;
            });
    },
});

export const {} = problemSlice.actions;
export default problemSlice.reducer;
