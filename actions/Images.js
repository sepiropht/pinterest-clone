import fetch from "isomorphic-fetch";
export const ADD_IMAGE = "ADD_IMAGE";
export const LOAD_IMAGES = "LOAD_IMAGES";
export const REMOVE_IMAGE = "REMOVE_IMAGE";

export function loadImages(collectionImages) {
  return {
    payload: collectionImages,
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

export const ADD_IMAGE_REMOTE = "ADD_IMAGE_REMOTE";
function requestPosts(subreddit) {
  return {
    type: REQUEST_POSTS,
    subreddit
  };
}

export const RECEIVE_POSTS = "RECEIVE_POSTS";
function receivePosts(subreddit, json) {
  return {
    type: RECEIVE_POSTS,
    subreddit,
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  };
}

// Meet our first thunk action creator!
// Though its insides are different, you would use it just like any other action creator:
// store.dispatch(fetchPosts('reactjs'))

export function fetchImages(merdier) {
  // Thunk middleware knows how to handle functions.
  // It passes the dispatch method as an argument to the function,
  // thus making it able to dispatch actions itself.
  console.log(merdier);
  return function(dispatch) {
    // First dispatch: the app state is updated to inform
    // that the API call is starting

    // The function called by the thunk middleware can return a value,
    // that is passed on as the return value of the dispatch method.

    // In this case, we return a promise to wait for.
    // This is not required by thunk middleware, but it is convenient for us.
    console.log("waht the fuck happen");
    return fetch("http://localhost:4000/images")
      .then(response => response.json())
      .then(json => {
        console.log("JSONNN", json);
        return dispatch(loadImages(json));
      });

    // We can dispatch many times!
    // Here, we update the app state with the results of the API call.

    // In a real world app, you also want to
    // catch any error in the network call.
  };
}
