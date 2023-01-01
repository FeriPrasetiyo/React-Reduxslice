import axios from 'axios'
const request = axios.create({
    baseURL: 'http://localhost:3000/'
});

const loadUserSuccess = (data) => ({
    type: 'LOAD_USER_SUCCESS',
    data,
})

const loadUserFailure = () => ({
    type: 'LOAD_USER_FAILURE',
})

export const loadUser = () => async (dispatch, getSate) => {
    try {
        const params = getSate().phoneBook.params
        const { data } = await request.get("users", { params })
        dispatch(loadUserSuccess(data))
    } catch (err) {
        dispatch(loadUserFailure(err))
    }
}


export const addUserSuccess = (id, user) => ({
    type: 'ADD_USER_SUCCESS',
    id,
    user,
})

export const addUserFailure = (id) => ({
    type: 'ADD_USER_FAILURE',
    id
})

export const addUserRedux = (id, name, phone) => ({
    type: 'ADD_USER',
    id,
    name,
    phone,
})

export const addUser = (name, phone) => dispatch => {
    const id = Date.now()
    dispatch(addUserRedux(id, name, phone))
    return request.post('users', { name, phone }).then((res) => {
        dispatch(addUserSuccess(id, res.data.data))
    }).catch(() => {
        dispatch(addUserFailure(id))
    })
}

export const removeUserSuccess = (id) => ({
    type: 'REMOVE_USER_SUCCESS',
    id
})

export const removeUserFailure = () => ({
    type: 'REMOVE_USER_FAILURE'
})

export const removeUser = (id) => dispatch => {
    return request.delete(`users/${id}`).then((res) => {
        dispatch(removeUserSuccess(id))
    }).catch(() => {
        dispatch(removeUserFailure())
    })
}

export const resendUserSuccess = (id, user) => ({
    type: 'RESEND_USER_SUCCESS',
    id,
    user
})

export const resendUserFailure = () => ({
    type: 'RESEND_USER_FAILURE'
})

export const resendUser = (id, name, phone) => dispatch => {
    return request.post('users', { name, phone }).then((res) => {
        dispatch(resendUserSuccess(id, res.data.data))
    }).catch(() => {
        dispatch(resendUserFailure())
    })
}

export const updateUserSuccess = (id, user) => ({
    type: 'UPDATE_USER_SUCCESS',
    id,
    user
})

export const updateUserFailure = (id, user) => ({
    type: 'UPDATE_USER_FAILURE',
    id,
    user
})

export const updateUser = ({ id, name, phone }) => dispatch => {
    return request.put(`users/${id}`, { name, phone }).then((res) => {
        dispatch(updateUserSuccess(id, res.data.data))
    }).catch(() => {
        dispatch(updateUserFailure(id))
    })
}

export const loadmoreUserSuccess = (data) => ({
    type: 'LOADMORE_USER_SUCCESS',
    data,
})

export const loadmoreUserFailure = () => ({
    type: 'LOADMORE_USER_FAILURE',
})

export const loadmoreUser = () => async (dispatch, getSate) => {
    const state = getSate()
    try {
        if (state.phoneBook.params.page < state.phoneBook.params.pages) {
            let params = {
                ...state.phoneBook.params,
                page: Number(state.phoneBook.params.page + 1)
            }
            request.get('users', { params: params }).then((res) => {
                params = {
                    ...params,
                    pages: res.data.data[0].pages
                }
                dispatch(loadmoreUserSuccess({ users: res.data.data[0].users, params }))
            }).catch((err) => {
                console.log(err)
            })
        }
    } catch (err) {
        dispatch(loadmoreUserFailure())
    }
}

export const searchUserSuccess = (data) => ({
    type: 'SEARCH_USER_SUCCESS',
    data,
})

export const searchUserFailure = () => ({
    type: 'SEARCH_USER_FAILURE',
})

export const searchUser = (query) => async (dispatch, getSate) => {
    try {
        let state = getSate()
        let params = {
            ...state.params,
            ...query,
            page: 1
        }
        console.log(params, 'ini params')
        request.get('users', { params }).then((res) => {
            params = {
                ...params,
                pages: res.data.data[0].pages
            }
            dispatch(searchUserSuccess({ users: res.data.data[0].users, params }))
        }).catch((err) => {
            console.log(err)
        })
    } catch (err) {
        dispatch(searchUserFailure())
    }
}

