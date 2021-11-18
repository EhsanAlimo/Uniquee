export const initialState = {
  user: {},
  color: "blue",
  basket: [],
  selectedCategory: "",
  products: [],
  filteredProducts: [],
  userLikes: [],
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "user": // user owns all of information
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
        (item) => item.productId === action.payload
      );
      let basketCopy = [...state.basket];
      basketCopy.splice(index, 1);
      return {
        ...state,
        basket: basketCopy,
      };
    case "SELECT_CATEGORY":
      let newFilteredProducts = [];
      if (action.payload !== "") {
        //fiter the products for the selected category
        newFilteredProducts = state.products.filter(
          (product) => product.category === action.payload
        );
      }
      return {
        ...state,
        selectedCategory: action.payload,
        filteredProducts: newFilteredProducts,
      };
    case "ADD_PRODUCTS":
      return {
        ...state,
        products: action.payload,
      };

    case "USER_LIKES":
      return {
        ...state,
        userLikes: action.payload,
      };

    default:
      return;
  }
};
