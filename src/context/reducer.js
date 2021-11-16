export const initialState = {
    user: {},
    color: "blue",
    basket: [],

};

export const reducer = (state, action) => {
    switch (action.type) {
      case "user":  // user owns all of information
        return {
          ...state,
          user: action.payload,
        };
  
      case "color":
        return {
          ...state,
          color: action.payload,
        };
  
      case "reset":
        return {
          ...state,
          color: "black",
        };

        case "addToBasket":
          return {
            ...state,
            basket: [...state.basket, action.payload],
          };

          case "REMOVE_FROM_BASKET":
            const index = state.basket.findIndex(
              item => item.productId === action.payload
            )
            let basketCopy = [...state.basket]
            basketCopy.splice(index, 1);
           
            return {
              ...state,
              basket: basketCopy,
            };

          default:
            return;
      
    }

  };
