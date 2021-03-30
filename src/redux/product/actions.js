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

/* product add */
export const productAdd = (product, history) => ({
    type: PRODUCT_ADD,
    payload: { product, history },
});
export const productAddSuccess = (product) => ({
    type: PRODUCT_ADD_SUCCESS,
    payload: product,
});
export const productAddError = (error) => ({
    type: PRODUCT_ADD_ERROR,
    error
});

/* All products */
export const allProducts = (user_id, history) => ({
    type: ALL_PRODUCT,
    payload: { user_id, history },
});
export const allProductsSuccess = (allProduct) => ({
    type: ALL_PRODUCT_SUCCESS,
    payload: allProduct,
});
export const allProductsError = (error) => ({
    type: ALL_PRODUCT_ERROR,
    error
});

/* Selected Product from table to edit */
export const getSelectedProduct = (id, history) => ({
    type: SELECTED_PRODUCT,
    payload: { id, history },
});
export const getSelectedProductSuccess = (selectedProduct) => ({
    type: SELECTED_PRODUCT_SUCCESS,
    payload: selectedProduct,
});
export const getSelectedProductError = (error) => ({
    type: SELECTED_PRODUCT_ERROR,
    payload: {},
    error
});

/* product updated */
export const productUpdate = (product, history) => ({
    type: PRODUCT_UPDATE,
    payload: { product, history },
});
export const productUpdateSuccess = (product) => ({
    type: PRODUCT_UPDATE_SUCCESS,
    payload: product,
});
export const productUpdateError = (error) => ({
    type: PRODUCT_UPDATE_ERROR,
    error
});

/* Profile added */
export const profileAdded = (profile, history) => ({
    type: PROFILE,
    payload: { profile, history },
});
export const profileAddedSuccess = (profile) => ({
    type: PROFILE_SUCCESS,
    payload: profile,
});
export const profileAddedError = (error) => ({
    type: PROFILE_ERROR,
    error
});

/* Get Profile data */
export const getProfile = (user_id, history) => ({
    type: GET_PROFILE,
    payload: { user_id, history },
});
export const getProfileSuccess = (profile) => ({
    type: GET_PROFILE_SUCCESS,
    payload: profile,
});
export const getProfileError = (error) => ({
    type: GET_PROFILE_ERROR,
    error
});

/* Get all Seller data */

export const allSeller = (history) => ({
    type: ALL_SELLERS,
    payload: { history },
});
export const allSellerSuccess = (allSellers) => ({
    type: ALL_SELLERS_SUCCESS,
    payload: allSellers,
});
export const allSellerError = (error) => ({
    type: ALL_SELLERS_ERROR,
    error
});