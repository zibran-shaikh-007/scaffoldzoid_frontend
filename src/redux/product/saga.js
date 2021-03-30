import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import axios from "axios";
import { NotificationManager } from 'react-notifications';

import {
    PRODUCT_ADD,
    ALL_PRODUCT,
    SELECTED_PRODUCT,
    PRODUCT_UPDATE,
    PROFILE,
    GET_PROFILE,
    ALL_SELLERS,
    

}
from "../actions"

import {
    productAddSuccess,
    productAddError,
    allProductsSuccess,
    allProductsError,
    getSelectedProductSuccess,
    getSelectedProductError,
    productUpdateSuccess,
    productUpdateError,
    profileAddedSuccess,
    profileAddedError,
    getProfileSuccess,
    getProfileError,
    allSellerSuccess,
    allSellerError
}
    from "./actions"

import { getCurrentUser } from '../../helpers/Utils';
import { API_URL } from "../../apiUrl"


export function* watchAddedProduct() {
    yield takeEvery(PRODUCT_ADD, AddedProductDetails);
}

const AddedProductDetailsAsync = async (data) => {

    await axios.post(`${API_URL}/seller/product-add`, data)

        .then((product) => {
            /* console.log("added product", product) */
            if (product.status === 200) {

                NotificationManager.success(product.data.message);

            } else if (product.status === 206) {

                NotificationManager.warning(product.data.message);
            }
        })
        .catch((error) => NotificationManager.warning(error));
}





function* AddedProductDetails({ payload }) {
    console.log("payload", payload.product)
    const {
        name,
        rate,

    } = payload.product


    const user_id = getCurrentUser().id

    try {
        const data = {
            user_id, name, rate
        }

        const addedproducts = yield call(AddedProductDetailsAsync, data);


        /* console.log("addedproducts", addedproducts) */
        yield put(productAddSuccess(addedproducts.data.data));
    } catch (e) {
        yield put(productAddError(e))
        /* console.log("e", e) */
    }

}

export function* watchAllProducts() {

    yield takeEvery(ALL_PRODUCT, AllProductsDetails);
}


function* AllProductsDetails({ payload }) {
    try {
        const url = `${API_URL}/seller/product/all/${payload.user_id}`;
        const products = yield call(() => axios.get(url))

        /* console.log(products, "response"); */
        if (products.status === 200) {

            yield put(allProductsSuccess(products.data.data))



        } else if (products.status === 206) {
            yield put(allProductsError(products.data.message))

        }

    }
    catch (e) {
        console.log("e", e)

    }

}





export function* watchSelectedProducts() {

    yield takeEvery(SELECTED_PRODUCT, SelectedProductsDetails);
}


function* SelectedProductsDetails({ payload }) {

    try {
        const url = `${API_URL}/seller/product/${payload.id}`;
        const product = yield call(() => axios.get(url))

        /* console.log(product, "selected product"); */
        if (product.status === 200) {

            yield put(getSelectedProductSuccess(product.data.data))



        } else if (product.status === 206) {
            yield put(getSelectedProductError(product.data.message))

        }

    }
    catch (e) {
        console.log("e", e)

    }

}

export function* watchProductUpdate() {
    yield takeEvery(PRODUCT_UPDATE, ProductUpdateDetails);
}

const ProductUpdateDetailsAsync = async (data) => {
    console.log("data update", data)
    await axios.put(`${API_URL}/seller/product-update`, data)

        .then((product) => {
            /* console.log("product updated", product) */
            if (product.status === 200) {

                NotificationManager.success(product.data.message);

            } else if (product.status === 206) {

                NotificationManager.warning(product.data.message);
            }
        })
        .catch((error) => NotificationManager.warning(error));
}





function* ProductUpdateDetails({ payload }) {

    const {
        id,
        user_id,
        name,
        rate,

    } = payload.product

    try {
        const data = {
            id, user_id, name, rate
        }

        const updatedProduct = yield call(ProductUpdateDetailsAsync, data);


        /* console.log("updated data", updatedProduct) */
        yield put(productUpdateSuccess(updatedProduct.data.data));
    } catch (e) {
        yield put(productUpdateError(e))

    }

}


export function* watchAddedProfile() {
    yield takeEvery(PROFILE, AddedProfileDetails);
}

const AddedProfileDetailsAsync = async (data) => {

    await axios.post(`${API_URL}/seller/profile`, data)

        .then((profile) => {
           /*  console.log("added profile", profile) */
            if (profile.status === 200) {
                put(profileAddedSuccess(profile.data.data));
                NotificationManager.success(profile.data.message);

            } else if (profile.status === 206) {
                put(profileAddedError(profile.data.message))
                NotificationManager.warning(profile.data.message)
            }
        })
        .catch((error) => NotificationManager.warning(error));
}





function* AddedProfileDetails({ payload }) {
/*     console.log("payload", payload.profile) */
    const {
        description, picture

    } = payload.profile
    const user_id = getCurrentUser().id
    const data = {
        user_id, description, picture
    }
    yield call(AddedProfileDetailsAsync, data);

}


export function* watchSellerProfile() {

    yield takeEvery(GET_PROFILE, SellerProfileDetails);
}


function* SellerProfileDetails({ payload }) {
    try {
        const url = `${API_URL}/seller/profile/${payload.user_id}`;
        const profile = yield call(() => axios.get(url))

       /*  console.log(profile, "response"); */
        if (profile.status === 200) {

            yield put(getProfileSuccess(profile.data.data))



        } else if (profile.status === 206) {
            yield put(getProfileError(profile.data.message))

        }

    }
    catch (e) {
        console.log("e", e)

    }

}


export function* watchAllSellers() {

    yield takeEvery(ALL_SELLERS, AllSellersDetails);
}


function* AllSellersDetails({ payload }) {
    try {
        const url = `${API_URL}/buyer/all-sellers`;
        const seller = yield call(() => axios.get(url))

       /*  console.log(seller, "response"); */
        if (seller.status === 200) {

            yield put(allSellerSuccess(seller.data.data))



        } else if (seller.status === 206) {
            yield put(allSellerError(seller.data.message))

        }

    }
    catch (e) {
        console.log("e", e)

    }

}





export default function* rootSaga() {
    yield all([
        fork(watchAddedProduct),
        fork(watchAllProducts),
        fork(watchSelectedProducts),
        fork(watchProductUpdate),
        fork(watchAddedProfile),
        fork(watchSellerProfile),
        fork(watchAllSellers)

    ]);
}
