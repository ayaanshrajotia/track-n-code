import axiosInstance from "@/app/utils/axios";
import { InventoryType } from "@/types/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export const getInventories = createAsyncThunk(
    "inventory/getInventories",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get("/inventory");
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

export const addInventory = createAsyncThunk(
    "inventory/addInventory",
    async (
        data: { inventory_name: string; inventory_desc: string },
        { rejectWithValue }
    ) => {
        try {
            const response = await axiosInstance.post("/inventory", data);
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

export const editInventory = createAsyncThunk(
    "inventory/editInventory",
    async (
        data: {
            inventory_id: string;
            inventory_name: string;
            inventory_desc: string;
        },
        { rejectWithValue }
    ) => {
        try {
            const response = await axiosInstance.put("/inventory", data);
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

export const deleteInventory = createAsyncThunk(
    "inventory/deleteInventory",
    async (data: { inventory_id: string }, { rejectWithValue }) => {
        console.log(data);
        try {
            const response = await axiosInstance.delete(`/inventory`, { data });
            response.data.result = {};
            response.data.result.inventory_id = data.inventory_id;
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
    inventories: InventoryType[];
    getLoading: boolean;
    error: string | null;
    editLoading: boolean;
    message: null | string;
} = {
    inventories: [],
    getLoading: false,
    editLoading: false,
    error: null,
    message: null,
};

const inventorySlice = createSlice({
    name: "inventory",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getInventories.pending, (state) => {
                state.getLoading = true;
                state.error = null;
            })
            .addCase(getInventories.fulfilled, (state, action) => {
                state.inventories = action.payload.result;
                state.message = action.payload.message;
                state.getLoading = false;
            })
            .addCase(getInventories.rejected, (state, action) => {
                state.getLoading = false;
                state.error = action.payload as string;
                console.log(action.payload);
            })
            .addCase(addInventory.pending, (state) => {
                state.editLoading = true;
                state.error = null;
            })
            .addCase(addInventory.fulfilled, (state, action) => {
                state.inventories.push(action.payload.result);
                state.message = action.payload.message;
                state.editLoading = false;
            })
            .addCase(addInventory.rejected, (state, action) => {
                state.error = action.payload as string;
                state.editLoading = false;
                console.log(action.payload);
            })
            .addCase(editInventory.pending, (state) => {
                state.editLoading = true;
                state.error = null;
            })
            .addCase(editInventory.fulfilled, (state, action) => {
                console.log(action.payload);
                state.inventories = state.inventories.map((inventory) =>
                    inventory.inventory_id ===
                    action.payload.result.inventory_id
                        ? action.payload.result
                        : inventory
                );
                state.message = action.payload.message;
                state.editLoading = false;
            })
            .addCase(editInventory.rejected, (state, action) => {
                state.error = action.payload as string;
                state.editLoading = false;
                console.log(action.payload);
            })
            .addCase(deleteInventory.pending, (state) => {
                state.editLoading = true;
                state.error = null;
            })
            .addCase(deleteInventory.fulfilled, (state, action) => {
                state.inventories = state.inventories.filter(
                    (inventory) =>
                        inventory.inventory_id !==
                        action.payload.result.inventory_id
                );
                state.message = action.payload.message;
            })
            .addCase(deleteInventory.rejected, (state, action) => {
                state.error = action.payload as string;
                state.editLoading = false;
                console.log(action.payload);
            });
    },
});

export const {} = inventorySlice.actions;

export default inventorySlice.reducer;
