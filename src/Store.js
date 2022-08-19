import { createContext, useReducer } from "react";

export const Store = createContext();

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,

  cart: {
    formOrder: localStorage.getItem("formOrder")
      ? JSON.parse(localStorage.getItem("formOrder"))
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
      // lay ra cac object thoa dieu kien
      const cartItems = state.cart.cartItems.filter(
        (item) => item.objectId !== action.payload.objectId
        //if(false) => null
      );
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }

    case "USER_SIGN_IN":
      console.log("state", state);
      return { ...state, userInfo: action.payload };

    case "USER_SIGN_OUT":
      console.log("state", state);
      return {
        ...state,
        userInfo: null,
        cart: { cartItems: [], formOrder: {}, paymentMethod: "" },
      };
    case "CART_CLEAR":
      // console.log("state", state);
      // console.log("check item bf delete", state.cart.cartItems);
      const itemD = state.cart.cartItems.filter((item) =>
        item.objectId === action.payload.objectId ? false : true
      );
      // console.log("check item after delete", Items);
      localStorage.setItem("cartItems", JSON.stringify(itemD));
      return {
        ...state,
        cart: { ...state.cart, cartItems: itemD },
      };

    case "SAVE_FORM_ORDER":
      return {
        ...state,
        cart: { ...state.cart, formOrder: action.payload },
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
