import { publicRequest, userRequest } from '../requestMethods';
import { loginFailure, loginStart, loginSuccess } from './userSlice';
import {
  getProductStart,
  getProductSuccess,
  getProductFailure,
  updateProductFailure,
  updateProductStart,
  updateProductSuccess,
  addProductFailure,
  addProductStart,
  addProductSuccess,
} from './productSlice';
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

export const getProducts = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await userRequest.get('/products');
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    dispatch(getProductFailure());
  }
};

export const deleteProduct = async (dispatch, id) => {
  dispatch(getProductStart());
  try {
    const res = await userRequest.delete(`/products/${id}`);
    console.log(res);
    dispatch(getProductSuccess(id));
  } catch (err) {
    dispatch(getProductFailure());
  }
};

export const updateProduct = async (dispatch, id, product) => {
  dispatch(updateProductStart());
  try {
    //const res = await userRequest.delete(`/products/${id}`);

    dispatch(updateProductSuccess({ id, product }));
  } catch (err) {
    dispatch(updateProductFailure());
  }
};

export const addProduct = async (dispatch, product) => {
  dispatch(addProductStart());
  try {
    const res = await userRequest.post(`/products/`, { product });
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    dispatch(getProductFailure());
  }
};
