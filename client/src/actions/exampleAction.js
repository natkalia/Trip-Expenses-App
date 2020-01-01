const FIRSTONE = 'FIRSTONE';

const addFirstOne = (payload) => ({
  type: FIRSTONE,
  payload: {
    text: payload
  }
});

export {
  addFirstOne,
  FIRSTONE
}