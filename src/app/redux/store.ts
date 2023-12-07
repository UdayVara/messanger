import { configureStore } from '@reduxjs/toolkit'
import ReceiverReducer from './features/ReceiverSilce'
import UserReducer from './features/UserSlice'
import ModalReducer from './features/UsernameSlice'
export const store = configureStore({
  reducer: {
    receiver:ReceiverReducer,
    user:UserReducer,
    modal:ModalReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch