import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';
import reducer from './reducer';

const store = configureStore({ reducer });

type TStore = ReturnType<typeof store.getState>; // Root state type
type TAppDispatch = typeof store.dispatch;

const useAppDispatch = (): TAppDispatch => useDispatch<TAppDispatch>();
const useAppSelector: TypedUseSelectorHook<TStore> = useSelector;

export { store, useAppDispatch, useAppSelector };
