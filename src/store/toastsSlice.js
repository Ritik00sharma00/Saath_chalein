import { createSlice } from '@reduxjs/toolkit';

let nextId = 0;

const initialState = {
  toasts: [],
};

const toastSlice = createSlice({
  name: 'toasts',
  initialState,
  reducers: {
    pushToast: {
      reducer(state, action) {
        state.toasts = [...state.toasts, action.payload];
      },
      prepare({ type = 'success', message, title }) {
        const id = ++nextId;
        return { payload: { id, type, message, title } };
      },
    },
    dismissToast(state, action) {
      state.toasts = state.toasts.filter((t) => t.id !== action.payload);
    },
  },
});

export const { pushToast, dismissToast } = toastSlice.actions;

export const selectToasts = (state) => state.toasts.toasts;

export default toastSlice.reducer;