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
    fetch(`https://bandter-backend.heroku.com/api/v1/discover`, request)
    .then(r => r.json())
    .then(users => dispatch({type: 'LOAD_SEARCH', users}))
    .catch(console.log)
  } 
};

export function handleMatch (friendObj) {
  return (dispatch) => {
    dispatch({type: "REMOVE_FRIENDEE", friendee_id: friendObj.friendee_id});
    let request = {
      method: "POST",
      headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.token}`
      },
      body: JSON.stringify(friendObj)
    }
    fetch(`https://bandter-backend.heroku.com/api/v1/friend_request`, request)
    .then(r => r.json())
    .then(match => dispatch({type: 'ADD_MATCH', match}) )
  }
};

export function logoutUser() {
  return {
    type: 'LOGOUT_USER',
  }
};