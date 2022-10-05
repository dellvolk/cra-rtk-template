import {TypedUseSelectorHook, useSelector} from 'react-redux';
import type {RootState} from '../../store/store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
const useAppSelector: TypedUseSelectorHook<RootState> = (...props) => useSelector(...props);

export default useAppSelector
