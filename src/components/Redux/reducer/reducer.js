import { LOGIN_USER } from '../actiontype/actiontypes'
import { LOGOUT_USER } from '../actiontype/actiontypes'

const initialState = {
    isLogin: false
}


function Authreducer(state = initialState, action) {
    console.log(action)
    switch (action.type) {
        case LOGIN_USER:
            return {...state,isLogin: true}
            // break;
        case LOGOUT_USER:
            return {...state,isLogin: false}
            // break;
        default:
            return state
            break;
    }
}
export default Authreducer