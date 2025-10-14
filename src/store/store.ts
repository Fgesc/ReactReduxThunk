import {combineReducers, configureStore} from '@reduxjs/toolkit';
import productReducer from '../reducers/ProductsSlice'
import cardReducer from '../reducers/CardSlice';

const rootReducer = combineReducers({
    products: productReducer,  
    cart: cardReducer,
})

export const setupStore = () => {
    return configureStore({ 
        reducer: rootReducer, 
    })
}

export const store = setupStore();

export type RootState = ReturnType<typeof rootReducer> 
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']