import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import authorizeAxiosInstance from '~/ultis/authorizeAxios'

import { API_ROOT } from '~/ultis/constants'
// Khời tạo giá trị State của Slice trong Redux
const initialState = {
  currentUser: null
}
// Các hành động gọi  api và cập nhật dữ liệu vào Redux
export const loginUserAPI = createAsyncThunk(
  'user/loginUserAPI',
  async (data) => {
    const response = await authorizeAxiosInstance.post(`${API_ROOT}/v1/users/login`, data)
    return response.data
  }
)

// Khởi tạo một Slice trong kho lưu trữ Redux Store
export const userSlice = createSlice({
  name: 'user',
  initialState,
  // Nơi xử lý dữ liệu đồng bộ
  reducers: {},
  // Nơi xử lý dữ liệu bất đồng bộ
  extraReducers: (builder) => {
    builder.addCase(loginUserAPI.fulfilled, (state, action) => {
      // action.payload chính là response.data trả về ở trên
      const user = action.payload

      state.currentUser = user
    })
  }
})

// Actions: là nơi dành cho các components bên dưới gọi bằng dispatch() tới nó để cập nhật lại dữ liệu thông qua reducer(đồng bộ)
// Các actions được redux tạo tự động theo tên của reducer.
// export const {} = userSlice.actions

// Selectors: Là nơi dành cho các components bên dưới gọi bằng hook useSelector() để lấy dữ liệu từ store ra sử dụng
export const selectCurrentUser = (state) => {
  return state.user.currentUser
}

//
// export default activeBoardSlice.reducer
export const userReducer = userSlice.reducer