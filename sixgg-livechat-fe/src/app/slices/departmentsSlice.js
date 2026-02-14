import { createSlice } from '@reduxjs/toolkit';

const departmentsSlice = createSlice({
  name: 'general',
  initialState: {
    departments: [],
  },
  reducers: {
    setDepartments(state, action){
      state.departments = action.payload;
    },
    addDepartment(state, action){
      state.departments.push(action.payload);
    },
  },
});

export const selectDepartments = state => state.department.departments

export const {setDepartments, addDepartment} = departmentsSlice.actions;

export default departmentsSlice.reducer;
