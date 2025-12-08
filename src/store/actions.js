export const ADD_ITEM = 'ADD_ITEM';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';
export const CLEAR_CART = 'CLEAR_CART';
export const LOAD_CART = 'LOAD_CART';

export const addItem = (item) => ({
  type: ADD_ITEM,
  payload: item,
});

export const removeItem = (id) => ({
  type: REMOVE_ITEM,
  payload: id,
});

export const deleteItem = (id) => ({
  type: DELETE_ITEM,
  payload: id,
});

export const clearCart = () => ({ 
  type: CLEAR_CART,
});
export const loadCart = (cartData) => ({
  type: LOAD_CART,
  payload: cartData,
});