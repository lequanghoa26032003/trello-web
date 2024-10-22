import Container from '@mui/material/Container'
import { useState, useEffect } from 'react'
import AppBar from '~/components/AppBar/Menu'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
// import { mockData } from '~/apis/mock-data'
import { fetchBoardDetailsAPI } from '~/apis'
function Board() {
  const [board, setBoard] = useState(null)
  useEffect( () => {
    const boardId= '6716070c2349351537af7b6b'
    fetchBoardDetailsAPI(boardId).then( board => {
      setBoard(board)
    })
  }, [])
  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar />

      <BoardBar board={board} />
      <BoardContent board={board} />

    </Container>
  )
}

export default Board
