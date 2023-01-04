import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loadUser, addUser, removeUser, updateUser } from './userAPI';

const initialState = {
    value: {
        users: [],
        params: {
            page: 1,
            pages: 1
        }
    },
    status: 'idle',
};

export const loadUserAsync = createAsyncThunk(
    'user/loadUser',
    async () => {
        const response = await loadUser();
        return response.data.data[0];
    }
);

export const addUserAsync = createAsyncThunk(
    'user/addUser',
    async ({ id, name, phone }) => {
        try {
            const response = await addUser(name, phone);
            return { succses: true, id, user: response.data.data };
        } catch (err) {
            console.log(err)
            return { succses: false, id };
        }
    }
);

export const removeUserAsync = createAsyncThunk(
    'user/removeUser',
    async (id) => {
        try {
            const response = await removeUser(id);
            return { id, user: response.data.data };
        } catch (err) {
            console.log(err)
        }
    }
);

export const updateUserAsync = createAsyncThunk(
    'user/updateUser',
    async ({ id, name, phone }) => {
        try {
            const response = await updateUser(id, name, phone);
            return { succses: true, id, user: response.data.data };
        } catch (err) {
            console.log(err)
            return { succses: false, id };
        }
    }
);

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        add: (state, action) => {
            state.value = {
                users: [
                    ...state.value.users,
                    {
                        id: action.payload.id,
                        name: action.payload.name,
                        phone: action.payload.phone,
                        sent: true
                    }]
            }
        },
        edit: (state, action) => {
            state.value = {
                users: [
                    ...state.value.users,
                    {
                        id: action.payload.id,
                        name: action.payload.name,
                        phone: action.payload.phone,
                        sent: true
                    }]
            }
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(loadUserAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loadUserAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.value =
                {
                    params: {
                        page: action.payload.page,
                        pages: action.payload.pages,
                    },
                    users: [...(state.value.params.page === 1 ? [] : state.value.users),
                    ...action.payload.users.map(item => {
                        item.sent = true
                        return item
                    })]
                }
            })
            .addCase(addUserAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                if (action.payload.succses) {
                    state.value.users = state.value.users.map(item => {
                        if (item.id === action.id) {
                            return {
                                id: action.payload.user.id,
                                name: action.payload.user.name,
                                phone: action.payload.user.phone,
                                sent: true
                            }
                        }
                        return item
                    })
                } else {
                    state.value = {
                        ...state.value,
                        users: state.value.users.map(item => {
                            if (item.id === action.id) {
                                return { ...item, sent: false }
                            }
                            return item
                        })
                    }
                }
            })
            .addCase(updateUserAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                if (action.payload.succses) {
                    state.value.users = state.value.users.map(item => {
                        if (item.id === action.id) {
                            return {
                                id: action.payload.user.id,
                                name: action.payload.user.name,
                                phone: action.payload.user.phone,
                                sent: true
                            }
                        }
                        return item
                    })
                }
            })
            .addCase(removeUserAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.value = {
                    ...state.value,
                    users: state.value.users.filter(item => item.id !== action.payload.id)
                }
            })
    },
});

export const { add, edit } = userSlice.actions;

export const selectUser = (state) => state.user.value.users

export const create = (name, phone) => (dispatch, getState) => {
    const id = Date.now()
    dispatch(add({ name, phone }))
    dispatch(addUserAsync({ id, name, phone }))
};

export const update = (name, phone) => (dispatch, getState) => {
    const id = Date.now()
    dispatch(edit({ id, name, phone }))
    dispatch(updateUserAsync({ id, name, phone }))
};



export default userSlice.reducer;
