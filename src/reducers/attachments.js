const initialState = {
  items: []
};

const attachmentsReducers = (state = initialState, {type, payload}) => {
  switch(type) {
    case "ATTACHMENTS:SET_ITEMS":
      return {
        ...state,
        items: payload
      };
    case "ATTACHMENTS:REMOVE_ITEMS":
      return {
        ...state,
        items: state.items.filter(item => item.uid != payload.uid)
      };
    default:
      return state;
  }
}
export default attachmentsReducers;
