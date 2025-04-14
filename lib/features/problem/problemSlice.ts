import axiosInstance from "@/app/utils/axios";
import { CompanyType, InventoryType, TagType } from "@/types/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

type ProblemType = {
    problem_id: string;
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
            const response = await axiosInstance.post("/problems", data);
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

export const getAllProblems = createAsyncThunk(
    "problem/getAllProblems",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get("/problems");
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

export const getSingleProblem = createAsyncThunk(
    "problem/getSingleProblem",
    async (problem_id: string, { rejectWithValue }) => {
        try {
            console.log("problem_id", problem_id);
            const response = await axiosInstance.get(`/problems/${problem_id}`);
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

export const updateProblem = createAsyncThunk(
    "problem/updateProblem",
    async (data: ProblemType, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(
                `/problems/${data.problem_id}`,
                data
            );
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

export const deleteProblem = createAsyncThunk(
    "problem/deleteProblem",
    async (problem_id: string, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.delete(
                `/problems/${problem_id}`
            );
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
    allProblems: ProblemType[] | null;
    loading: boolean;
    addLoading: boolean;
    updateLoading: boolean;
    deleteLoading: boolean;
    error: string | null;
    inventoriesFromServer: InventoryType[];
    companiesFromServer: CompanyType[];
    tagsFromServer: TagType[];
    TCILoading: boolean;
} = {
    problem: null,
    allProblems: [],
    addLoading: false,
    updateLoading: false,
    deleteLoading: false,
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
            .addCase(getAllProblems.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllProblems.fulfilled, (state, action) => {
                state.loading = false;
                state.allProblems = action.payload.result;
            })
            .addCase(getAllProblems.rejected, (state, action) => {
                state.loading = false;
                console.log("Error:", action.payload);
                state.error = action.payload as string;
            })
            .addCase(getSingleProblem.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getSingleProblem.fulfilled, (state, action) => {
                state.loading = false;
                state.problem = action.payload.result;
            })
            .addCase(getSingleProblem.rejected, (state, action) => {
                state.loading = false;
                console.log("Error:", action.payload);
                state.error = action.payload as string;
            })
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
            .addCase(updateProblem.pending, (state) => {
                state.updateLoading = true;
                state.error = null;
            })
            .addCase(updateProblem.fulfilled, (state, action) => {
                state.updateLoading = false;
                state.problem = action.payload;
            })
            .addCase(updateProblem.rejected, (state, action) => {
                state.updateLoading = false;
                console.log("Error:", action.payload);
                state.error = action.payload as string;
            })
            .addCase(deleteProblem.pending, (state) => {
                state.deleteLoading = true;
                state.error = null;
            })
            .addCase(deleteProblem.fulfilled, (state) => {
                state.deleteLoading = false;
                // state.problem = null;
            })
            .addCase(deleteProblem.rejected, (state, action) => {
                state.deleteLoading = false;
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
