import { combineReducers, configureStore } from '@reduxjs/toolkit';
// import permissionsReducer from './slices/permissionsSlice';
// import authReducer from '../domains/auth/slices/authSlice';
// import accountReducer from '../domains/accountManagement/slices/accountSlice';
// import breadcrumbsReducer from './slices/breadcrumbsSlice';

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

// old Slices 
// import AEDReducer from './slices/AEDSlice';
// import TabReducer from './slices/TabSlice';
// import { equipmentSlice } from './slices/EquipmentSlice';
// import { accessoriesSlice } from './slices/AccessoriesSlice';
// import { ModificationSlice } from './slices/ModificationSlice'
// import { FilterDataSlice } from './slices/AccountListFilter'
// import { EquipmentFilterDataSlice } from './slices/AccountDetailsEquipmentFilter'
// import { EquipmentListingFilterDataSlice } from './slices/EquipmentListingFilterSlice'
// import { AccessoryListingFilterDataSlice } from './slices/AccessoryListingFilterSlice'
// import StdlnAEDReducer from './slices/StandloneAEDSlice';
// import breadCrumbsReducer from './slices/BreadCrumbsSlice';
// import breadCrumbsReducer from './slices/breadcrumbsSlice';
// import combinedDataReducer from '../domains/PopManagement/slices/PopDetailSlice';

// import breadCrumbsSlice from './slices/BreadCrumbsSlice';

const rootReducer = combineReducers({
  // counter: counterReducer,

  // permissions: permissionsReducer,
  // auth: authReducer,
  // account: accountReducer,
  // breadcrumbs: breadcrumbsReducer,


  // AED_manager: AEDReducer,
  // TAB_manager: TabReducer,
  // equipment: equipmentSlice.reducer,
  // accessories: accessoriesSlice.reducer,
  // modification: ModificationSlice.reducer,
  // StdlnAED_manager: StdlnAEDReducer,
  // accountlistfilter: FilterDataSlice.reducer,
  // accountdetailsequipmentfilter: EquipmentFilterDataSlice.reducer,
  // equipmentlistingfilter: EquipmentListingFilterDataSlice.reducer,
  // accessorylistingfilter: AccessoryListingFilterDataSlice.reducer,
  // BreadCrumbs: breadCrumbsReducer,
  // Add more reducers here
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  // combinedData: combinedDataReducer,
});

// Create a persistor
const persistor = persistStore(store);

export { store, persistor };

// export const store = configureStore({
//   reducer: {
//     permissions: permissionsReducer,
//     auth: authReducer,
//     account: accountReducer,
//     breadcrumbs: breadcrumbsReducer,

//     // Add other reducers here
//   },
// });