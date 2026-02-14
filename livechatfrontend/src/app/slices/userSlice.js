import { createSlice } from '@reduxjs/toolkit';

const livechatUserSlice = createSlice({
  name: 'livechatUser',
  initialState: {
    userAuth: JSON.parse(localStorage.getItem("livechat_user")),
    parentAuth: JSON.parse(localStorage.getItem("parent_auth")),
    user: null,
    users: []
  },
  reducers: {
    setUserAuth(state, action) {
      state.userAuth = action.payload;
    },
    setParentAuth(state, action) {
      state.parentAuth = action.payload;
    },
    setUser(state, action){
      state.user = action.payload
    },
    setUsers(state, action){
      state.users = action.payload;
    },
    updateUser(state, action){
      const updatedUser = action.payload;
      const updatedUsers = state.users.map(user=> {
        if (updatedUser._id == user._id) {
          console.log("updatedUser", updatedUser)
          return updatedUser
        }
        return user
      })
      state.users = updatedUsers;
    },
  },
});

export const selectUser = state => state.user.user
export const selectUserAuth = state => state.user.userAuth
export const selectParentAuth = state => state.user.parentAuth
export const getUsers = state => state.user.users

export const {setUserAuth, setParentAuth, setUser, setLivechatCreds, setUsers, updateUser} = livechatUserSlice.actions;

export default livechatUserSlice.reducer;
