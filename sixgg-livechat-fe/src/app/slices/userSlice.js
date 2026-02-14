import { createSlice } from '@reduxjs/toolkit';

const livechatUserSlice = createSlice({
  name: 'livechatUser',
  initialState: {
    parentUser: null,
    userAuth: JSON.parse(localStorage.getItem("livechat_user")),
    user: null,
    users: [],
    agents: []
  },
  reducers: {
    setUserAuth(state, action) {
      state.userAuth = action.payload;
    },
    setUser(state, action){
      state.user = action.payload
    },
    setParentUser(state, action){
      localStorage.setItem("livechat_parentuser", JSON.stringify(action.payload))
      state.parentUser = action.payload
    },
    setUsers(state, action){
      state.users = [...new Map([...state.users, ...action.payload].map(user => [user._id, user])).values()];
    },
    setAgents(state, action){
      state.agents = action.payload;
    },
    updateUser(state, action){
      const updatedUser = action.payload;
      const updatedUsers = state.users.map(user=> {
        if (updatedUser._id == user._id) {
          return updatedUser
        }
        return user
      })
      state.users = updatedUsers;
    },
  },
});

export const selectParentUser = state => state.user.parentUser
export const selectUser = state => state.user.user
export const selectUserAuth = state => state.user.userAuth
export const getUsers = state => state.user.users
export const selectAgents = state => state.user.agents

export const {setUserAuth, setUser, setParentUser, setLivechatCreds, setUsers, setAgents, updateUser} = livechatUserSlice.actions;

export default livechatUserSlice.reducer;
