
export default function userReducer(state = {}, action) {
  let user;
  let songs;
  let photos;
  let friendRequests;
  switch (action.type) {
    case 'START_LOGGING_IN':
      return {...state, songs: [], photos: [], loggedIn: true}
    case "LOGIN_USER":
    user = action.data.user.data.attributes
    friendRequests = user.friend_requests.data
    songs = action.data.user.included.filter(included => included.type === "song");
    photos = action.data.user.included.filter(included => included.type === "photo");
    localStorage.token = action.data.token;
    localStorage.current = user.id
      return {
        ...state,
        ...user,
        friend_requests: [...friendRequests],
        photos: [...photos],
        songs: [...songs],
        loggedIn: true
      };
    case "SET_USER":
      console.log("user stuff: ", action);
      user = action.data.user.data.attributes
      friendRequests = user.friend_requests.data
      songs = action.data.user.included.filter(included => included.type === "song");
      photos = action.data.user.included.filter(included => included.type === "photo");
      return {
        ...state,
        ...user,
        friend_requests: [...friendRequests],
        photos: [...photos],
        songs: [...songs],
        loggedIn: true
      };
    case "UPDATE_USER":
      return {
        ...state,
        ...action.user
      };
    case "ADD_SONG":
      return {
        ...state,
        songs: [...state.songs, action.song]
      };
    case "ADD_PHOTO":
    return {
      ...state,
      photos: [...state.photos, action.photo]
    };
    case "ADD_MATCH":
      return action.match.data.attributes.accepted === false 
      ? state 
      : {...state, 
        friend_requests: state.friend_requests.filter(req => req.id !== action.match.data.id),
        friends: [...state.friends, {id: action.match.data.frinder_id, name: action.match.data.frinder_name, img_url: action.match.data.frinder_img}]
      };
    case "LOGOUT_USER":
      localStorage.clear()
      return {
        ...state,
        loggedIn: false
      };
    default:
      return state;
  }
}
