import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { API_ROOT } from '~/ultis/constants'
import { mapOrder } from '~/ultis/sorts'
import { generatePlaceholderCard } from '~/ultis/format'
import { isEmpty } from 'lodash'
// Khời tạo giá trị State của Slice trong Redux
const initialState = {
  currentActiveBoard: null
}
// Các hành động gọi  api và cập nhật dữ liệu vào Redux
export const fetchBoardDetailsAPI = createAsyncThunk(
  'activeBoard/fetchBoardDetailsAPI',
  async (boardId) => {
    const response = await axios.get(`${API_ROOT}/v1/boards/${boardId}`)
    return response.data
  }
)

// Khởi tạo một Slice trong kho lưu trữ Redux Store
export const activeBoardSlice = createSlice({
  name: 'activeBoard',
  initialState,
  // Nơi xử lý dữ liệu đồng bộ
  reducers: {
    updateCurrentActiveBoard: (state, action) => {
      // action.payload là chuẩn đặt tên nhận dữ liệu vào reducer
      const board = action.payload
      // Xử lý dữ liệu nếu cần thiết ...
      // ...
      // Update dữ liệu của currentActiveBoard
      state.currentActiveBoard = board
    }
  },
  // Nơi xử lý dữ liệu bất đồng bộ
  extraReducers: (builder) => {
    builder.addCase(fetchBoardDetailsAPI.fulfilled, (state, action) => {
      // action.payload chính là response.data trả về ở trên
      const board = action.payload
      // Sắp xếp thứ tự các column luôn ở đây trước khi đưa dữ liệu xuống bên dưới các component con
      board.columns = mapOrder(board.columns, board.columnOrderIds, '_id')
      board.columns.forEach( column => {
        // Khi f5 trang web cần xử lý kéo thả vào một column rỗng 
        if (isEmpty(column.cards)) {
          column.cards = [generatePlaceholderCard(column)]
          column.cardOrderIds = [generatePlaceholderCard(column)._id]
        } else {
          column.cards = mapOrder(column.cards, column.cardOrderIds, '_id')
        }
      })
      // Update dữ liệu của currentActiveBoard
      state.currentActiveBoard = board
    })
  }
})

// Actions: là nơi dành cho các components bên dưới gọi bằng dispatch() tới nó để cập nhật lại dữ liệu thông qua reducer(đồng bộ)
// Các actions được redux tạo tự động theo tên của reducer.
export const { updateCurrentActiveBoard } = activeBoardSlice.actions

// Selectors: Là nơi dành cho các components bên dưới gọi bằng hook useSelector() để lấy dữ liệu từ store ra sử dụng
export const selectCurrentActiveBoard = (state) => {
  return state.activeBoard.currentActiveBoard
}

//
// export default activeBoardSlice.reducer
export const activeBoardReducer = activeBoardSlice.reducer