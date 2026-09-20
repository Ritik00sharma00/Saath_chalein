import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '@/lib/api';

const initialState = {
  incoming: [],
  my: [],
  status: 'idle',
  error: null,
};

const normalizeRequest = (req, meta = {}) => ({
  id: req?.id,
  tripId: req?.tripId,
  requestedByUserId: req?.requestedByUserId,
  status: (req?.status || 'PENDING').toLowerCase(),
  ...meta,
});

const reqStatusLabel = (status) => {
  const map = {
    accepted: 'accepted',
    pending: 'pending',
    rejected: 'rejected',
  };
  return map[status] || status;
};

const reqStatusClass = (status) => {
  const map = {
    accepted: 'bg-emerald-100 text-emerald-700',
    pending: 'bg-amber-100 text-amber-700',
    rejected: 'bg-rose-100 text-rose-700',
  };
  return map[status] || 'bg-slate-100 text-slate-600';
};

const userById = (users, id) => {
  const list = Array.isArray(users) ? users : [];
  return list.find((u) => String(u.id) === String(id));
};

const tripById = (trips, id) => {
  const list = Array.isArray(trips) ? trips : [];
  return list.find((t) => String(t.id) === String(id));
};

/* --------------------------------- thunks --------------------------------- */

export const fetchMyRequests = createAsyncThunk(
  'requests/fetchMy',
  async (userId, { rejectWithValue }) => {
    try {
      const [requests, trips] = await Promise.all([
        api.get(`/api/requests/user/${userId}`),
        api.get('/api/trips'),
      ]);
      const tripMap = new Map((Array.isArray(trips) ? trips : []).map((t) => [t.id, t]));
      return (Array.isArray(requests) ? requests : []).map((req) =>
        normalizeRequest(req, {
          tripName: tripMap.get(req.tripId)?.tripName || 'Unknown trip',
          userName: 'You',
        })
      );
    } catch (err) {
      return rejectWithValue(err.message || 'Could not load your requests');
    }
  }
);

export const fetchIncomingRequests = createAsyncThunk(
  'requests/fetchIncoming',
  async (myTripIds, { rejectWithValue }) => {
    try {
      const myTripIdList = Array.isArray(myTripIds) ? myTripIds : [];
      const [users, trips] = await Promise.all([api.get('/api/users'), api.get('/api/trips')]);
      const tripMap = new Map((Array.isArray(trips) ? trips : []).map((t) => [t.id, t]));

      const result = [];
      for (const tripId of myTripIdList) {
        try {
          const reqs = await api.get(`/api/requests/trip/${tripId}`);
          (Array.isArray(reqs) ? reqs : []).forEach((req) => {
            const requester = userById(users, req.requestedByUserId);
            result.push(
              normalizeRequest(req, {
                userName: requester?.username || `User #${req.requestedByUserId}`,
                tripName: tripMap.get(req.tripId)?.tripName || 'Unknown trip',
              })
            );
          });
        } catch {
          /* a trip may not have any requests yet */
        }
      }
      return result;
    } catch (err) {
      return rejectWithValue(err.message || 'Could not load requests');
    }
  }
);

export const createJoinRequest = createAsyncThunk(
  'requests/create',
  async ({ userId, tripId, requiredId = 0 }, { rejectWithValue }) => {
    try {
      await api.post(`/api/requests?userId=${userId}`, { tripId, requiredId });
      return true;
    } catch (err) {
      return rejectWithValue(err.message || 'Could not send request');
    }
  }
);

export const updateRequestStatus = createAsyncThunk(
  'requests/updateStatus',
  async ({ requestId, status }, { rejectWithValue }) => {
    try {
      const updated = await api.patch(`/api/requests/${requestId}/status`, {
        status: status.toUpperCase(),
      });
      return { id: requestId, status: (updated.status || status).toLowerCase() };
    } catch (err) {
      return rejectWithValue(err.message || 'Could not update request');
    }
  }
);

/* ---------------------------------- slice --------------------------------- */

const requestsSlice = createSlice({
  name: 'requests',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyRequests.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMyRequests.fulfilled, (state, action) => {
        state.status = 'idle';
        state.my = action.payload;
        state.error = null;
      })
      .addCase(fetchMyRequests.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload;
      })
      .addCase(fetchIncomingRequests.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchIncomingRequests.fulfilled, (state, action) => {
        state.status = 'idle';
        state.incoming = action.payload;
        state.error = null;
      })
      .addCase(fetchIncomingRequests.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload;
      })
      .addCase(updateRequestStatus.fulfilled, (state, action) => {
        const { id, status } = action.payload;
        const patch = (arr) => {
          const item = (Array.isArray(arr) ? arr : []).find((r) => String(r.id) === String(id));
          if (item) item.status = reqStatusLabel(status);
        };
        patch(state.incoming);
        patch(state.my);
      });
  },
});

export const selectIncomingRequests = (state) => state.requests.incoming;
export const selectMyRequests = (state) => state.requests.my;
export const selectRequestsStatus = (state) => state.requests.status;

export { reqStatusClass, reqStatusLabel };

export default requestsSlice.reducer;
