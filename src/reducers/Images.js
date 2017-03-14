import { ADD_IMAGE, LOAD_IMAGES, REMOVE_IMAGE } from "../actions/Images";
function Images(state = [], action) {
  switch (action.type) {
    case LOAD_IMAGES:
      return [1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => ({
        link: `http://lorempicsum.com/futurama/255/200/${i}`,
        like: i,
        owner: `me`,
        id: `images${i}`
      }));
    case ADD_IMAGE:
      return [...state, action.payload];
    case REMOVE_IMAGE:
      return state.filter(img => img !== action.payload.id);
    default:
      return state;
  }
}

export default Images;
