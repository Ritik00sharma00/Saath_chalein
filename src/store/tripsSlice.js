import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '@/lib/api';

const initialState = {
  trips: [],
  users: [],
  userTrips: [],
  status: 'idle',
  error: null,
};

const normalizeTrip = (trip) => ({
  id: trip.id,
  tripName: trip.tripName,
  tripGroup: trip.tripGroup,
  maxMembers: trip.maxMembers,
  tripPlanned: trip.tripPlanned,
  isActive: trip.isActive ?? trip.active ?? true,
  tripLock: trip.tripLock ?? false,
  ownerId: trip.createdByUserId ?? trip.createdByUserId,
  createdAt: trip.createdAt,
});

/* --------------------------------- thunks --------------------------------- */

export const fetchCommunity = createAsyncThunk(
  'trips/fetchCommunity',
  async (_, { rejectWithValue }) => {
    try {
      const [trips, users] = await Promise.all([api.get('/api/trips'), api.get('/api/users')]);
      return {
        trips: Array.isArray(trips) ? trips.map(normalizeTrip) : [],
        users: Array.isArray(users) ? users : [],
      };
    } catch (err) {
      return rejectWithValue(err.message || 'Could not load trips');
    }
  }
);

export const fetchUsers = createAsyncThunk(
  'trips/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const users = await api.get('/api/users');
      return Array.isArray(users) ? users : [];
    } catch (err) {
      return rejectWithValue(err.message || 'Could not load users');
    }
  }
);

export const createTrip = createAsyncThunk(
  'trips/createTrip',
  async ({ userId, payload }, { dispatch, rejectWithValue }) => {
    try {
      const trip = await api.post(`/api/trips?userId=${userId}`, payload);
      dispatch(fetchCommunity());
      return normalizeTrip(trip);
    } catch (err) {
      return rejectWithValue(err.message || 'Could not create trip');
    }
  }
);

export const fetchUserTrips = createAsyncThunk(
  'trips/fetchUserTrips',
  async (userId, { rejectWithValue }) => {
    try {
      const trips = await api.get(`/api/trips/user/${userId}`);
      return Array.isArray(trips) ? trips.map(normalizeTrip) : [];
    } catch (err) {
      return rejectWithValue(err.message || 'Could not load your trips');
    }
  }
);

/* ---------------------------------- slice --------------------------------- */

const tripsSlice = createSlice({
  name: 'trips',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommunity.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCommunity.fulfilled, (state, action) => {
        state.status = 'idle';
        state.trips = action.payload.trips;
        state.users = action.payload.users;
        state.error = null;
      })
      .addCase(fetchCommunity.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(fetchUserTrips.fulfilled, (state, action) => {
        state.userTrips = action.payload;
      })
      .addCase(createTrip.fulfilled, (state, action) => {
        state.status = 'idle';
      })
      .addCase(createTrip.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload;
      });
  },
});

export const {
  selectTrips,
  selectUsers,
  selectTripsStatus,
  selectTripError,
} = {
  selectTrips: (state) => state.trips.trips,
  selectUsers: (state) => state.trips.users,
  selectTripsStatus: (state) => state.trips.status,
  selectTripError: (state) => state.trips.error,
};

const userNameById = (users, id) => {
  const u = (users || []).find((user) => String(user.id) === String(id));
  return u?.username || `User #${id}`;
};

export const selectTripsWithOwners = (state) => {
  const { trips, users } = state.trips;
  return trips.map((trip) => ({
    ...trip,
    ownerName: userNameById(users, trip.ownerId),
    members: `${trip.maxMembers} seats`,
  }));
};

export default tripsSlice.reducer;