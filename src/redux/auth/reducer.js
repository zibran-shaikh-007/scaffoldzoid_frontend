import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGOUT_USER,

} from '../actions';



const INIT_STATE = {
  currentUser: null,
  loading: false,
  error: '',
};


export default (state = INIT_STATE, action) => {
  /* console.log(' state error', state.error) */
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loading: true, error: '' };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        currentUser: action.payload,
        
      };
    case LOGIN_USER_ERROR:
      return {
        ...state,
        loading: false,
        currentUser: null,
        error: action.payload.message,
      };
    case REGISTER_USER:
      return { ...state, /* currentUser: action.payload */ loading: false, error: '' };
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        /* currentUser: action.payload, */
        
      };
    case REGISTER_USER_ERROR:
      return {
        ...state,
        loading: false,
        currentUser: null,
        error: action.payload.message,

      };

    case LOGOUT_USER:
      return { ...state, currentUser: null, error: '' };
    default:
      return { ...state };
  }
};
