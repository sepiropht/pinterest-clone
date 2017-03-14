export const ADD_IMAGE = "ADD_IMAGE";
export const LOAD_IMAGES = "LOAD_IMAGES";
export const REMOVE_IMAGE = "REMOVE_IMAGE";

export function loadImages(a) {
  return {
    payload: a,
    type: LOAD_IMAGES
  };
}

export function addImage(image) {
  return {
    payload: image,
    type: ADD_IMAGE
  };
}

export function removeImage(image) {
  return {
    payload: image,
    type: REMOVE_IMAGE
  };
}
