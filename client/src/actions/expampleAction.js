export const INCREMENT = 'increment';

export function updateUser(newUser) {
  return {
    type: INCREMENT,
    payload: {
      user: newUser
    }
  }
};