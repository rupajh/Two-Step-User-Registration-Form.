const initialState: any[] = [];

const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'ADD_USER':
      return [...state, action.payload];
    default:
      return state;
  }
};

export default userReducer;
