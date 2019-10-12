import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from './types';
import axios from 'axios';

export const getItems = () => {
  const dispatchGetItems = async dispatch => {
    dispatch(setItemsLoading());

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
  };

  return dispatchGetItems;
};

export const addItem = itemData => {
  const dispatchAddItem = async dispatch => {
    const new_item = await axios.post('/api/items', itemData);
    dispatch({
      type: ADD_ITEM,
      payload: new_item.data
    });
  };

  return dispatchAddItem;
};

export const deleteItem = id => {
  const dispatchDeleteItem = async dispatch => {
    await axios.delete(`/api/items/${id}`);
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
  };

  return dispatchDeleteItem;
};

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING
  };
};
