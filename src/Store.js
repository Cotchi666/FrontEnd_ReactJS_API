import { createContext, useReducer } from "react";

export const Store = createContext();

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,

  cart: {
    order: localStorage.getItem("order")
      ? JSON.parse(localStorage.getItem("order"))
      : {},
    paymentMethod: localStorage.getItem("paymentMethod")
      ? localStorage.getItem("paymentMethod")
      : "",
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  },
};

function reducer(state, action) {
  switch (action.type) {
    case "CART_ADD_ITEM":
      console.log("state", state);
      const cartItems = [...state.cart.cartItems, action.payload];
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };

    case "CART_REMOVE_ITEM": {
      console.log("state", state);
      const cartItems = state.cart.cartItems.filter(
        (item) => item.objectId !== action.payload.objectId
        //if(false) => null
      );
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }

    case "USER_SIGNIN":
      console.log("state", state);
      return { ...state, userInfo: action.payload };

    case "USER_SIGNOUT":
      console.log("state", state);
      return {
        ...state,
        userInfo: null,
        cart: { cartItems: [], order: {}, paymentMethod: "" },
      };
    case "CART_CLEAR":
      // console.log("state", state);
      console.log("check item bf delete", state.cart.cartItems);
      const Items = state.cart.cartItems.filter((item) =>
        item.objectId === action.payload.objectId ? false : true
      );
      console.log("check item after delete", Items);
      localStorage.setItem("cartItems", JSON.stringify(Items));
      return {
        ...state,
        cart: { ...state.cart, cartItems: Items },
      };

    case "SAVE_ORDER":
      return {
        ...state,
        cart: { ...state.cart, order: action.payload },
      };
    case "SAVE_PAYMENT_METHOD":
      return {
        ...state,
        cart: { ...state.cart, paymentMethod: action.payload },
      };
    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
