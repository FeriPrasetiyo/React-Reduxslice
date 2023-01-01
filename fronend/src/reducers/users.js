const getdata = {
    users: [],
    params: {
        page: 1,
        pages: 1,
    }
}

const users = (state = getdata, action) => {
    switch (action.type) {
        case 'LOAD_USER_SUCCESS':
            return {
                params: {
                    page: action.data.data[0].page,
                    pages: action.data.data[0].pages,
                },
                users: [...(state.params.page === 1 ? [] : state.users),
                ...action.data.data[0].users.map(item => {
                    item.sent = true
                    return item
                })]
            }
        case 'ADD_USER':
            return {
                users: [
                    ...state.users,
                    {
                        id: action.id,
                        name: action.name,
                        phone: action.phone,
                        sent: true
                    }]
            }
        case 'ADD_USER_SUCCESS':
            return {
                ...state,
                users: state.users.map(item => {
                    if (item.id === action.id) {
                        return {
                            id: action.user.id,
                            name: action.user.name,
                            phone: action.user.phone,
                            sent: true
                        }
                    }
                    return item
                })
            }
        case 'ADD_USER_FAILURE':
            return {
                ...state,
                users:
                    state.users.map(item => {
                        if (item.id === action.id) {
                            return { ...item, sent: false }
                        }
                        return item
                    })
            }
        case 'RESEND_USER_SUCCESS':
            return {
                ...state,
                users: state.users.map(item => {
                    if (item.id === action.id) {
                        item.id = action.user.id
                        item.sent = true
                    }
                    return item
                })
            }
        case 'UPDATE_USER_SUCCESS':
            return {
                ...state,
                users:
                    state.users.map(item => {
                        if (item.id === action.id) {
                            return {
                                id: action.id,
                                name: action.name,
                                phone: action.phone,
                                sent: true
                            }
                        }
                        return item
                    })
            }
        case 'UPDATE_USER_FAILURE':
            return {
                ...state,
                users:
                    state.users.map(item => {
                        if (item.id === action.id) {
                            return { ...item, sent: false }
                        }
                        return item
                    })
            }
        case 'LOADMORE_USER_SUCCESS':
            return {
                users: [...state.users, ...action.data.users.map(item => {
                    item.sent = true
                    return item
                })],
                params: action.data.params
            }
        case 'REMOVE_USER_SUCCESS':
            return {
                ...state,
                users: state.users.filter(item => item.id !== action.id)
            }
        case 'SEARCH_USER_SUCCESS':
            return {
                users: action.data.users.map(item => {
                    item.sent = true
                    return item
                }),
                params: action.data.params
            }
        case 'SEARCH_USER_FAILURE':
        case 'LOADMORE_USER_FAILURE':
        case 'RESEND_USER_FAILURE':
        case 'REMOVE_USER_FAILURE':
        case 'LOAD_USER_FAILURE':
            return state
        default:
            return state
    }
}

export default users