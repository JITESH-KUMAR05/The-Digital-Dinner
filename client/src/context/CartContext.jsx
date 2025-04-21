import { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

const initialState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = state.items.findIndex(item => item._id === action.payload._id);
      
      if (existingItemIndex !== -1) {
        // Update existing item quantity
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex].quantity += 1;
        
        return {
          ...state,
          items: updatedItems,
          totalItems: state.totalItems + 1,
          totalPrice: state.totalPrice + action.payload.price,
        };
      } else {
        // Add new item
        const newItem = { ...action.payload, quantity: 1 };
        return {
          ...state,
          items: [...state.items, newItem],
          totalItems: state.totalItems + 1,
          totalPrice: state.totalPrice + action.payload.price,
        };
      }
    }
    
    case 'REMOVE_ITEM': {
      const existingItemIndex = state.items.findIndex(item => item._id === action.payload._id);
      
      if (state.items[existingItemIndex].quantity === 1) {
        // Remove item completely
        return {
          ...state,
          items: state.items.filter(item => item._id !== action.payload._id),
          totalItems: state.totalItems - 1,
          totalPrice: state.totalPrice - action.payload.price,
        };
      } else {
        // Decrease quantity
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex].quantity -= 1;
        
        return {
          ...state,
          items: updatedItems,
          totalItems: state.totalItems - 1,
          totalPrice: state.totalPrice - action.payload.price,
        };
      }
    }
    
    case 'CLEAR_CART':
      return initialState;
      
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  
  const addItem = (item) => {
    setTimeout(() => {
        dispatch({ type: 'ADD_ITEM', payload: item });
      }, 0);
  };
  
  const removeItem = (item) => {
    dispatch({ type: 'REMOVE_ITEM', payload: item });
  };
  
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };
  
  return (
    <CartContext.Provider value={{
      items: state.items,
      totalItems: state.totalItems,
      totalPrice: state.totalPrice,
      addItem,
      removeItem,
      clearCart,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};