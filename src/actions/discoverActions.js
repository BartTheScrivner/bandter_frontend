export function beginSearch (formObj) {
  return (dispatch) => {
    dispatch({type: "START_SEARCH"});
    let request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.token}`
      },
      body: JSON.stringify(formObj)
    }
    fetch(`http://localhost:3000/api/v1/discover`, request)
    .then(r => r.json())
    .then(users => dispatch({type: 'LOAD_SEARCH', users}))
    .catch(console.log)
  } 
};

export function handleMatch (friendObj) {
  return (dispatch) => {
    dispatch({type: "GO_NOWHERE"});
    console.log("HIT");
    let request = {
      method: "POST",
      headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.token}`
      },
      body: JSON.stringify(friendObj)
    }
    fetch(`http://localhost:3000/api/v1/friend_request`, request)
    .then(r => r.json())
    .then(data => dispatch({type: 'DO_NOTHING', data}))
  }
};

export function logoutUser() {
  return {
    type: 'LOGOUT_USER',
  }
};