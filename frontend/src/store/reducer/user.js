export default function products( state = 0,action){
    switch(action.type){
        case 'LOGI' :
            return state = 0;
        case 'PROD' :
            return state = 1;
        default:
            return state
    }  
  }