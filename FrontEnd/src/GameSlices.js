import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import GameService from "./GameService";

export const StartGame = createAsyncThunk("Start", async (thunkAPI) => {
  try {
    const response = await GameService.Start();
    return response;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue();
  }
});

export const InitData = createAsyncThunk("Initdata", async (thunkAPI) => {
  try {
    const response = await GameService.Initdata();

    return response;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue();
  }
});

export const Fire = createAsyncThunk(
  "Fire",
  async ({ row, col, girdId, ships,input }, thunkAPI) => {
    try {
      const response = await GameService.Fire(row, col, girdId, ships,input);
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue();
    }
  }
);

const initialState = { data: [], firedata: [], loading: false };

const companySlices = createSlice({
  name: "Game",
  initialState,
  extraReducers: {
    [StartGame.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },
    [StartGame.rejected]: (state, action) => {
      state.loading = false;
    },
    [InitData.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },
    [InitData.rejected]: (state, action) => {
      state.loading = false;
    },
    [Fire.fulfilled]: (state, action) => {
      state.firedata = action.payload;
      state.loading = false;
    },
    [Fire.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

const { reducer } = companySlices;
export default reducer;
