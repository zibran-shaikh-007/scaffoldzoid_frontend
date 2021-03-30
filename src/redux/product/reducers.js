import {
    PRODUCT_ADD,
    PRODUCT_ADD_SUCCESS,
    PRODUCT_ADD_ERROR,
    ALL_PRODUCT,
    ALL_PRODUCT_SUCCESS,
    ALL_PRODUCT_ERROR,
    SELECTED_PRODUCT,
    SELECTED_PRODUCT_SUCCESS,
    SELECTED_PRODUCT_ERROR,
    PRODUCT_UPDATE,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_ERROR,
    PROFILE,
    PROFILE_SUCCESS,
    PROFILE_ERROR,
    GET_PROFILE,
    GET_PROFILE_SUCCESS,
    GET_PROFILE_ERROR,
    ALL_SELLERS,
    ALL_SELLERS_SUCCESS,
    ALL_SELLERS_ERROR
}
    from "../actions"


const INIT_STATE = {

    products: [],
    loading: false,
    error: '',
    allProduct: [],
    selectedProduct: [],
    addedProfile: [],
    allSellerData:[]
};
/* console.log("payloaddd",INIT_STATE.userProfile)
 */
const sellerProduct = (state = INIT_STATE, action) => {


    switch (action.type) {
        case PRODUCT_ADD:
            return { ...state, loading: true, error: '' };
        case PRODUCT_ADD_SUCCESS:
            return {
                ...state,
                loading: false,

            };
        case PRODUCT_ADD_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        case ALL_PRODUCT:
            return { ...state, loading: true, error: '' };
        case ALL_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                allProduct: action.payload

            };
        case ALL_PRODUCT_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        case SELECTED_PRODUCT:
            return { ...state, loading: true, error: '' };
        case SELECTED_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                selectedProduct: action.payload

            };
        case SELECTED_PRODUCT_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        case PRODUCT_UPDATE:
            return { ...state, loading: true, error: '' };
        case PRODUCT_UPDATE_SUCCESS:
            return {
                ...state,
                loading: false,


            };
        case PRODUCT_UPDATE_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        case PROFILE:
            return { ...state, loading: true, error: '' };
        case PROFILE_SUCCESS:
            return {
                ...state,
                loading: false,

            };
        case PROFILE_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        case GET_PROFILE:
            return { ...state, loading: true, error: '' };
        case GET_PROFILE_SUCCESS:
            return {
                ...state,
                loading: false,
                addedProfile: action.payload

            };
        case GET_PROFILE_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        case ALL_SELLERS:
            return { ...state, loading: true, error: '' };
        case ALL_SELLERS_SUCCESS:
            return {
                ...state,
                loading: false,
                allSellerData: action.payload

            };
        case ALL_SELLERS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        default:
            return { ...state };
    }
};
export default sellerProduct;