import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  api,
  setToken,
  clearToken,
  getStoredUser,
  setStoredUser,
  decodeJwtPayload,
} from '@/lib/api';

const initialState = {
  user: null,
  token: null,
  status: 'idle',
  error: null,
};

/* --------------------------------- thunks --------------------------------- */

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { token, username } = await api.post('/api/auth/login', { email, password });
      setToken(token);

      let user = null;
      try {
        const users = await api.get('/api/users');
        const match = Array.isArray(users)
          ? users.find((u) => u.email?.toLowerCase() === email.toLowerCase())
          : null;
        if (match) user = { id: match.id, username: match.username, email: match.email, role: match.role };
      } catch {
        /* users endpoint optional at login time */
      }

      if (!user) {
        const payload = decodeJwtPayload(token);
        user = {
          id: payload?.userId ?? payload?.id ?? payload?.sub ?? null,
          username: payload?.username ?? username ?? email.split('@')[0],
          email: payload?.email ?? email,
        };
      }

      setStoredUser(user);
      return { token, user };
    } catch (err) {
      return rejectWithValue(err.message || 'Login failed');
    }
  }
);

export const signupUser = createAsyncThunk(
  'auth/signup',
  async ({ username, email, password }, { rejectWithValue }) => {
    try {
      const user = await api.post('/api/auth/signup', { username, email, password });
      return user;
    } catch (err) {
      return rejectWithValue(err.message || 'Signup failed');
    }
  }
);

export const fetchUser = createAsyncThunk(
  'auth/fetchUser',
  async ({ id }, { rejectWithValue }) => {
    try {
      const user = await api.get(`/api/users/${id}`);
      return user;
    } catch (err) {
      return rejectWithValue(err.message || 'Could not load profile');
    }
  }
);

export const updateUserDetails = createAsyncThunk(
  'auth/updateDetails',
  async ({ id, details }, { getState, rejectWithValue }) => {
    try {
      const profile = await api.put(`/api/users/${id}/details`, details);
      return { profile, details };
    } catch (err) {
      return rejectWithValue(err.message || 'Could not update profile');
    }
  }
);

/* ---------------------------------- slice --------------------------------- */

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    hydrateSession: (state) => {
      const user = getStoredUser();
      if (user) {
        state.user = user;
        state.status = 'authenticated';
      }
    },
    logout: (state) => {
      clearToken();
      state.user = null;
      state.token = null;
      state.status = 'idle';
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'authenticated';
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload;
      })
      .addCase(signupUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload;
      })
      .addCase(updateUserDetails.fulfilled, (state, action) => {
        state.user = { ...state.user, ...action.payload.details, ...action.payload.profile };
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        if (action.payload) {
          const u = state.user || {};
          state.user = { ...u, ...action.payload, id: action.payload.id ?? u.id };
        }
      });
  },
});

export const { hydrateSession, logout, clearError } = authSlice.actions;

export const selectUser = (state) => state.auth.user;
export const selectUserId = (state) => state.auth.user?.id ?? null;
export const selectToken = (state) => state.auth.token;
export const selectAuthStatus = (state) => state.auth.status;
export const selectAuthError = (state) => state.auth.error;
export const selectIsAuthenticated = (state) => state.auth.status === 'authenticated';

export default authSlice.reducer;