import {configureStore} from '@reduxjs/toolkit';
import formAuhtReducer,
{localStorageMiddleware} from './auth/authSlice';
import accountsReducer from './accounts/accountsSlice';
import accountReducer from './account/accountSlice';
import currenciesReducer from './currencies/currenciesSlice';
import exchangeReducer from './exchange/exchangeSlice';
import liveRatesReducer from './rates/ratesSlice';


export const store = configureStore({
  reducer: {
    auth: formAuhtReducer,
    accounts: accountsReducer,
    account: accountReducer,
    exchange: exchangeReducer,
    currencies: currenciesReducer,
    liveRates: liveRatesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});
