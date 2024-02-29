export const addUser = (userData: any) => {
    return {
      type: 'ADD_USER',
      payload: userData,
    };
  };
  