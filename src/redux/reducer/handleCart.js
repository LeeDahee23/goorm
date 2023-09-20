const cart = [];
const handleCart = (state = cart, action) => {
  // const product = action.payload;
  switch (action.type) {
    case 'ADDITEM':
      return [...state, action.payload];

      break;

    case 'DELITEM':
      return (state = state.filter((x) => {
        return x.id !== action.payload.id;
      }));

      break;

    default:
      return state;
      break;
  }
};

export default handleCart;
