import { Action, combineReducers, configureStore, ThunkAction } from "@reduxjs/toolkit";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from "redux-persist/lib/storage";
import { postApi } from "../service/post";
import { profileApi } from "../service/manage_profile"
import { voucherApi } from "../service/admin_voucher"
import { authApi } from "../service/auth";
import { adminApi } from "../service/admin";
import { cvApi } from "../service/manage_cv";
import { authEprApi } from "../service/auth_employer";
import { packageApi } from "../service/package";
import authReducer from "../reducer/auth";
import cartReducer from "../reducer/package";
import { orderApi } from "../service/employer/order";
import { candidateApi } from "../service/employer/candidate";
import { packageAdmApi } from "../service/admin/package";
import { profileEprApi } from "../service/employer/profileEpr";
import { serviceApi } from "../service/employer/service";
import { personalInforApi } from "../services/personalInfor";
import { feedbackApi } from "../services/feedback";
import { jobsaveApi } from "../service/savejob";
import { profileEpeApi } from "../service/profileEpe";
import { jobdoneApi } from "../service/jobdone";
import { chartLine } from "../service/admin/chartLine";
import { serviceAdmApi } from "../service/admin/service";
import authAdmReducer from "../reducer/authAdm";
import authEmprReducer from "../reducer/authEpr";
import { notificationApi } from "../service/notification";
import {bannerApi} from "../service/admin/banner"
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth', 'authEmpr', 'authAdm', 'cart']
}

const rootReducer = combineReducers({
    auth: authReducer,
    authEmpr: authEmprReducer,
    authAdm: authAdmReducer,
    cart: cartReducer,
    [postApi.reducerPath]: postApi.reducer,
    [jobdoneApi.reducerPath]: jobdoneApi.reducer,
    [profileEpeApi.reducerPath]: profileEpeApi.reducer,
    [jobsaveApi.reducerPath]: jobsaveApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [profileEprApi.reducerPath]: profileEprApi.reducer,
    [voucherApi.reducerPath]: voucherApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [feedbackApi.reducerPath]: feedbackApi.reducer,
    [cvApi.reducerPath]: cvApi.reducer,
    [authEprApi.reducerPath]: authEprApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
    [packageApi.reducerPath]: packageApi.reducer,
    [packageAdmApi.reducerPath]: packageAdmApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [personalInforApi.reducerPath]: personalInforApi.reducer,
    [serviceApi.reducerPath]: serviceApi.reducer,
    [chartLine.reducerPath]: chartLine.reducer,
    [serviceAdmApi.reducerPath]: serviceAdmApi.reducer,
    [candidateApi.reducerPath]: candidateApi.reducer,
    [notificationApi.reducerPath]: notificationApi.reducer,
    [bannerApi.reducerPath]: bannerApi.reducer,
})

const persistedRducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedRducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }).concat(
        postApi.middleware,
        feedbackApi.middleware,
        jobdoneApi.middleware,
        jobsaveApi.middleware,
        profileEpeApi.middleware,
        profileApi.middleware,
        profileEprApi.middleware,
        voucherApi.middleware,
        postApi.middleware,
        cvApi.middleware,
        authApi.middleware,
        authEprApi.middleware,
        packageApi.middleware,
        packageAdmApi.middleware,
        adminApi.middleware,
        orderApi.middleware,
        personalInforApi.middleware,
        serviceApi.middleware,
        chartLine.middleware,
        serviceAdmApi.middleware,
        candidateApi.middleware,
        notificationApi.middleware,
        bannerApi.middleware
    )
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>

export default persistStore(store)

