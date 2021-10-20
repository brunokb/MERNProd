const INITIAL_STATE = 
{
    "costumer": [
      {
        "_id": "",
        "name": "",
        "email": "",
        "prod": [
          {
          }
        ],
        "createAt": "",
        "__v": 0
      }
    ],
    "loggedIn": "true"

}

  export default function costumer( state = INITIAL_STATE, action){
    if(action.type == "UPDATE_COSTUMER"){
      return {
        ...state,
        costumer: action.payload
      }
    }
    return state;

  }