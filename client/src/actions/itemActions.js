import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from './types';
import axios from 'axios';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

export const getItems = () => {
  const dispatchGetItems = async dispatch => {
    dispatch(setItemsLoading());

    try {
      const items = await axios.get('/api/items');
      console.log('payload from server');
      console.log(items);
      dispatch({
        type: GET_ITEMS,
        payload: items.data
      });

      /*axios.get('/api/items').then(res => {
      console.log(res);
      dispatch({
        type: GET_ITEMS,
        payload: res.data
      });
    });*/
    } catch (error) {
      dispatch(returnErrors(error.response.data, error.response.status));
    }
  };

  return dispatchGetItems;
};

export const addItem = itemData => {
  const dispatchAddItem = async (dispatch, getState) => {
    try {
      const new_item = await axios.post(
        '/api/items',
        itemData,
        tokenConfig(getState)
      );
      dispatch({
        type: ADD_ITEM,
        payload: new_item.data
      });
    } catch (error) {
      dispatch(returnErrors(error.response.data, error.response.status));
    }
  };

  return dispatchAddItem;
};

export const deleteItem = id => {
  const dispatchDeleteItem = async (dispatch, getState) => {
    try {
      await axios.delete(`/api/items/${id}`, tokenConfig(getState));
      dispatch({
        type: DELETE_ITEM,
        payload: id
      });

      /*axios.delete(`/api/items/${id}`).then(res => {
      dispatch({
        type: DELETE_ITEM,
        payload: id
      });
    });*/
    } catch (error) {
      dispatch(returnErrors(error.response.data, error.response.status));
    }
  };

  return dispatchDeleteItem;
};

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING
  };
};
