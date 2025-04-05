import { createContext, useContext, useReducer, ReactNode } from 'react';

// Define Cart item type
interface CartItem {
  _id: string;
  name: string;
  price: {
    mrp: number;
    offerPrice: number;
  };
  images: string[];
  quantity: number;
}

// Define the shape of the entire cart state
interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

// Context type (state + dispatch)
interface CartContextType {
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
}

// Define all possible cart actions
type CartAction =
  | { type: 'ADD_TO_CART'; payload: CartItems }
  | { type: 'REMOVE_FROM_CART'; payload: string } // payload is _id
  | { type: 'TOGGLE_CART' }
  | { type: 'INCREMENT'; payload: string }
  | { type: 'DECREMENT'; payload: string }
  | { type: 'CLOSE_CART' };

// Create context
export const CartContext = createContext<CartContextType | undefined>(undefined);

// Initial state
const initialState: CartState = {
  items: [],
  isOpen: false,
};
interface CartItems extends CartItem {
    quantity: number;
  }

// Reducer function
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART': {
        const existing = state.items.find(item => item._id === action.payload._id);
        if (existing) {
          return {
            ...state,
            items: state.items.map(item =>
              item._id === action.payload._id
                ? { ...item, quantity: item.quantity + action.payload.quantity }
                : item
            ),
          };
        }
        return {
          ...state,
          items: [...state.items, { ...action.payload, quantity: action.payload.quantity }],
        };
      }
      case 'INCREMENT':
        return {
          ...state,
          items: state.items.map(item =>
            item._id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
          ),
        };
      case 'DECREMENT':
        return {
          ...state,
          items: state.items
            .map(item =>
              item._id === action.payload
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
            .filter(item => item.quantity > 0),
        };

    case 'REMOVE_FROM_CART': {
      return {
        ...state,
        items: state.items.filter((item) => item._id !== action.payload),
      };
    }

    case 'TOGGLE_CART': {
      return { ...state, isOpen: !state.isOpen };
    }

    case 'CLOSE_CART': {
      return { ...state, isOpen: false };
    }

    default:
      return state;
  }
};

// Provider
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook to use CartContext
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
