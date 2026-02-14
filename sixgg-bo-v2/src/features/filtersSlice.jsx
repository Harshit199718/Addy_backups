import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const initialState = {
    pagination: {
        currentPage: 1,
        startPageRow: 0,
        endPageRow: 10, 
    },
    filters: {},
    sorting: {
      field: '',
      order: '',
      name: ''
    },
    sites: []
}

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        paginationActions: (state, actions) => {
            const calculatedStartPage = (actions.payload.page * actions.payload.pageSize) - actions.payload.pageSize;
            const calculatedEndPage = actions.payload.page * actions.payload.pageSize;

            state.pagination = {
              currentPage: actions.payload.page,
              startPageRow: calculatedStartPage,
              endPageRow: calculatedEndPage, 
            };
        },
        filtersActions: (state, actions) => {
          const updatedFilters = { ...state.filters };
          state.pagination = {
            currentPage: 1,
            startPageRow: 0,
            endPageRow: 10, 
          }
          switch (actions.payload.type){
            case 'input':
              if(actions.payload.value){
                updatedFilters[actions.payload.event] = actions.payload.value;
              } else {
                delete updatedFilters[actions.payload.event];
              }
            break;
            case 'select':
              if(typeof actions.payload.value === 'boolean'){
                updatedFilters[actions.payload.event] = actions.payload.value;
              } else {
                delete updatedFilters[actions.payload.event];
              }
            break;
            case 'array':
              if (actions.payload.value && actions.payload.value.length > 0) {
                  let categoryString;
                  if (Array.isArray(actions.payload.value)) {
                      // Convert array to string using join method
                      categoryString = actions.payload.value.join(',');
                  } else {
                      categoryString = actions.payload.value;
                  }
                  const arrayValue = categoryString.split(',').map(item => item.trim().replace(/'/g, ''));
                  updatedFilters[actions.payload.event] = arrayValue;
              } else {
                  delete updatedFilters[actions.payload.event]; // Remove the filter if value is empty
              }
              break;
            case 'default':
              updatedFilters[actions.payload.event] = actions.payload.value;
            break;
          }

            state.filters = updatedFilters
        },
        sortingAction: (state, actions) => {
          const { field, name, order } = actions.payload;
          if(order){
            const newOrder = order === 'ascend' ? 'ASC' : 'DESC';
            state.sorting = {
              field: field,
              name: name,
              order: newOrder,
            };
          }else{
            state.sorting = {
              field: '',
              name: '',
              order: '',
            };
          }
        },
        sitesActions: (state, actions) => {
          state.sites = actions.payload.sites 
        },
        resetFilters: (state) => {
          const sites = state.sites
          state.pagination = initialState.pagination;
          state.sorting = initialState.sorting;
          state.filters = sites?.length > 0 ? {sites: state.sites} : initialState.filters;
        },
        resetState: () => initialState,
    },
})

export const { paginationActions, filtersActions, sortingAction, sitesActions, resetFilters, resetState: resetFiltersState } = filtersSlice.actions;

export default filtersSlice.reducer;