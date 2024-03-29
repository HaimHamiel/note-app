import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import noteService from "./noteService";

const initialState = {
 notes: [],
 note: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create new note
export const createNote = createAsyncThunk(
  "notes/create",
  async (noteData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await noteService.createNote(noteData, token);
    } catch (error) {
      const message =
        error?.response?.data?.message || error?.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get user notes
export const getNotes = createAsyncThunk(
  "notes/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await noteService.getNotes(token);
    } catch (error) {
      const message =
        error?.response?.data?.message || error?.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get user note
export const getNote = createAsyncThunk(
  "notes/get",
  async (noteId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await noteService.getNote(noteId, token);
    } catch (error) {
      const message =
        error?.response?.data?.message || error?.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// delete note
export const deleteNote = createAsyncThunk(
  "notes/delete",
  async (noteId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await noteService.deleteNote(noteId, token);
    } catch (error) {
      const message =
        error?.response?.data?.message || error?.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNote.pending, (state) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(createNote.fulfilled, (state) => ({
        ...state,
        isLoading: false,
        isSuccess: true,
      }))
      .addCase(createNote.rejected, (state, action) => ({
        ...state,
        isLoading: false,
        isError: true,
        message: action.payload,
      }))
      .addCase(getNotes.pending, (state) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(getNotes.fulfilled, (state, action) => ({
        ...state,
        isLoading: false,
        isSuccess: true,
        notes: action.payload,
      }))
      .addCase(getNotes.rejected, (state, action) => ({
        ...state,
        isLoading: false,
        isError: true,
        message: action.payload,
      }))
      .addCase(getNote.pending, (state) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(getNote.fulfilled, (state, action) => ({
        ...state,
        isLoading: false,
        isSuccess: true,
        note: action.payload,
      }))
      .addCase(getNote.rejected, (state, action) => ({
        ...state,
        isLoading: false,
        isError: true,
        message: action.payload,
      }))
      .addCase(deleteNote.pending, (state) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(deleteNote.fulfilled, (state, action) => ({
        ...state,
        isLoading: false,
        isSuccess: true,
        notes: state.notes.filter((note) => note._id !== action.payload._id)
      }))
      .addCase(deleteNote.rejected, (state, action) => ({
        ...state,
        isLoading: false,
        isError: true,
        message: action.payload,
      }));
  },
});
export const { reset } = noteSlice.actions;
export default noteSlice.reducer;
