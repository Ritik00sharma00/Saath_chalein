'use client';

import { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { store } from '@/store/store';
import { hydrateSession } from '@/store/authSlice';

const SessionHydrator = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(hydrateSession());
  }, [dispatch]);
  return null;
};

const Providers = ({ children }) => {
  return (
    <Provider store={store}>
      <SessionHydrator />
      {children}
    </Provider>
  );
};

export default Providers;