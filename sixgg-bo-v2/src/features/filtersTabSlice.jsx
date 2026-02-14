import { createSlice } from "@reduxjs/toolkit";

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
    }
}

const filtersTabSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        paginationTabActions: (state, actions) => {
            const calculatedStartPage = (actions.payload.page * actions.payload.pageSize) - actions.payload.pageSize;
            const calculatedEndPage = actions.payload.page * actions.payload.pageSize;

            state.pagination = {
                currentPage: actions.payload.page,
                startPageRow: calculatedStartPage,
                endPageRow: calculatedEndPage, 
            };
        },
        filtersTabActions: (state, actions) => {
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
                if(actions.payload.value){
                  const arrayValue = actions.payload.value.split(',').map(item => item.trim().replace(/'/g, ''));
                  updatedFilters[actions.payload.event] = arrayValue;
                } else {
                  delete updatedFilters[actions.payload.event];
                }
              break;
              case 'default':
                updatedFilters[actions.payload.event] = actions.payload.value;
              break;
            }

            state.filters = updatedFilters
        },
        sortingTabAction: (state, actions) => {
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
        resetTabFilters: (state) => {
          state.pagination = initialState.pagination;
          state.sorting = initialState.sorting;
          state.filters = initialState.filters;
        },
        resetState: () => initialState,
    },
})

export const { paginationTabActions, filtersTabActions, sortingTabAction, resetTabFilters, resetState: resetFiltersTabState  } = filtersTabSlice.actions;

export default filtersTabSlice.reducer;