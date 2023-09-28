import { useDispatch } from 'react-redux';
import { AppDispatch } from '../types/state';

const useAppDispatch: () => AppDispatch = useDispatch;

export { useAppDispatch };
