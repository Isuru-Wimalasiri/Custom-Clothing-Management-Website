import { publicRequest } from '../requestMethods';
import { loginFailure, loginStart, loginSuccess } from './userSlice';
import Cookies from 'js-cookie';

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post('/auth/login', user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};
