import { combineReducers } from 'redux'; 

import costumer from './costumer';
import products from './products';
import user from './user';

export default combineReducers({
    costumer,
    products,
    user
});