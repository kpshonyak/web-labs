import { ADD_ITEM, REMOVE_ITEM, DELETE_ITEM, CLEAR_CART } from './actions';

const savedCart = JSON.parse(localStorage.getItem('cart'));
const initialState = savedCart || {
  items: [],
  totalQuantity: 0,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM: {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      
      let updatedItems;

      if (!existingItem) {
        updatedItems = state.items.concat({
          id: newItem.id,
          title: newItem.title,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          variant: newItem.variant 
        });
      } else {
        updatedItems = state.items.map((item) =>
          item.id === newItem.id
            ? {
                ...item,
                quantity: item.quantity + 1,
                totalPrice: item.totalPrice + item.price,
              }
            : item
        );
      }

      return {
        ...state,
        items: updatedItems,
        totalQuantity: state.totalQuantity + 1,
      };
    }

    case REMOVE_ITEM: {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (!existingItem) return state;

      let updatedItems;
      if (existingItem.quantity === 1) {
        updatedItems = state.items.filter((item) => item.id !== id);
      } else {
        updatedItems = state.items.map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
                totalPrice: item.totalPrice - item.price,
              }
            : item
        );
      }

      return {
        ...state,
        items: updatedItems,
        totalQuantity: state.totalQuantity - 1,
      };
    }

    case DELETE_ITEM: {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (!existingItem) return state;

      return {
        ...state,
        items: state.items.filter((item) => item.id !== id),
        totalQuantity: state.totalQuantity - existingItem.quantity,
      };
    }
    case CLEAR_CART: 
      return {
        ...state,
        items: [],
        totalQuantity: 0,
      };

    default:
      return state;
  }
};

export default cartReducer;