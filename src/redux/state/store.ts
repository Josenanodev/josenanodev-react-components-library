import createSagaMiddleware from "@redux-saga/core";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import AppSettingsReducer from "./features/AppSettings/AppSettingsReducer";
import DateReducer from "./features/Dates/DateReducer";
import DestiniesReducer from "./features/Destinies/DestiniesReducer";
import NotificationsReducer from "./features/Notifications/NotificationsReducer";
import AppSettingsSaga from "./features/AppSettings/AppSettingsSaga";
import DestiniesSaga from "./features/Destinies/DestiniesSaga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: combineReducers({
    appSettings: AppSettingsReducer,
    notifications: NotificationsReducer,
    dates: DateReducer,
    destinies: DestiniesReducer,
  }),
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(AppSettingsSaga);
sagaMiddleware.run(DestiniesSaga);

export type RootState = ReturnType<typeof store.getState>;

export default store;
