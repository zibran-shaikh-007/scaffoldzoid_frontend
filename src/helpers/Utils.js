export const getCurrentUser = () => {
  let user = null;
  try {
    user =
      localStorage.getItem('authUser') != null
        ? JSON.parse(localStorage.getItem('authUser'))
        : null;
  } catch (error) {
    console.log('>>>> getCurrentUser -> error', error);
    user = null;
  }
  return user;
};

export const setCurrentUser = (user) => {
  try {
    if (user) {
      localStorage.setItem('authUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('authUser');
    }
  } catch (error) {
    console.log('>>>> setCurrentUser -> error', error);
  }
};
