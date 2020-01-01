const FIRSTONE = 'FIRSTONE';

const addFirstOne = (text) => ({
  type: FIRSTONE,
  payload: {
    text: text
  }
});

export {
  addFirstOne,
  FIRSTONE
}