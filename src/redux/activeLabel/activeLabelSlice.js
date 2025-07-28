import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  currentActiveLabel: null,
  isShowModalActiveLabel: false
}

const activeLabelSlice = createSlice({
  name: 'activeLabel',
  initialState,
  reducers: {
    showModalActiveLabel: (state) => {
      state.isShowModalActiveLabel = true
    },
    clearAndHideCurrentActiveLabel: (state) => {
      state.currentActiveLabel = null
      state.isShowModalActiveLabel = false
    },
    updateCurrentActiveLabel: (state, action) => {
      const fullLabel = action.payload
      state.currentActiveLabel = fullLabel
    }

  },
  extraReducers: (builder) => {}
})
// Action : là nơi dành cho các components bên dưới gọi bằng dispatch() tới nó để cập nhật lại dữ liệu thông qua reducer(đồng bộ)
export const {
  clearAndHideCurrentActiveLabel,
  updateCurrentActiveLabel,
  showModalActiveLabel
} = activeLabelSlice.actions

export const selectCurrentActiveLabel = (state) => {
  return state.activeLabel.currentActiveLabel
}

export const selectIsShowModalActiveLabel = (state) => {
  return state.activeLabel.isShowModalActiveLabel
}

export const activeLabelReducer = activeLabelSlice.reducer