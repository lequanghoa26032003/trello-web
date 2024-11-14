import Container from '@mui/material/Container'
import { useState, useEffect } from 'react'
import AppBar from '~/components/AppBar/Menu'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { mapOrder } from '~/ultis/sorts'
import CircularProgress from '@mui/material/CircularProgress';
// import { mockData } from '~/apis/mock-data'
import {
  fetchBoardDetailsAPI,
  createNewColumnAPI,
  createNewCardAPI,
  updateBoardDetailsAPI,
  updateColumnDetailsAPI
} from '~/apis'
import { generatePlaceholderCard } from '~/ultis/format'
import { isEmpty } from 'lodash'
import { Box, Typography } from '@mui/material'
function Board() {
  const [board, setBoard] = useState(null)
  useEffect( () => {
    const boardId= '6716070c2349351537af7b6b'
    fetchBoardDetailsAPI(boardId).then( board => {
      mapOrder(board?.columns, board?.columnOrderIds, '_id')
      board.columns.forEach( column => {
        if (isEmpty(column.cards)) {
          column.cards = [generatePlaceholderCard(column)]
          column.cardOrderIds = [generatePlaceholderCard(column)._id]
        } else {
          column.cards = mapOrder(column.cards, column.cardOrderIds, '_id')
        }
      })
      setBoard(board)
    })
  }, [])
  const createNewColumn = async (newColumnData) => {
    const createdColumn = await createNewColumnAPI({
      ...newColumnData,
      boardId: board._id
    })
    const newBoard = { ...board }
    newBoard.columns.push(createdColumn)
    newBoard.columnOrderIds.push(createdColumn._id)
    setBoard(newBoard)
  }

  const createNewCard = async (newCardData) => {
    const createdCard = await createNewCardAPI({
      ...newCardData,
      boardId: board._id
    })
    const newBoard = { ...board }
    const columnToUpdate = newBoard.columns.find( column => column._id === createdCard.columnId)
    if (columnToUpdate) {
      columnToUpdate.cards.push(createdCard)
      columnToUpdate.cardOrderIds.push(createdCard._id)
      setBoard(newBoard)
    }
  }
  const moveColumn = async (dndOrderredColumns) => {
    const dndOrderredColumnsIds = dndOrderredColumns.map(c => c._id)
    const newBoard = { ...board }
    newBoard.columns= dndOrderredColumns
    newBoard.columnOrderIds= dndOrderredColumnsIds
    setBoard(newBoard)
    await updateBoardDetailsAPI(newBoard._id, { columnOrderIds :  dndOrderredColumnsIds })

  }
  const moveCardInTheSameColumn = ( dndOrderedCards, dndOrderedCardIds, columnId ) => {
    const newBoard = { ...board }
    const columnToUpdate = newBoard.columns.find( column => column._id === columnId)
    if (columnToUpdate) {
      columnToUpdate.cards = dndOrderedCards
      columnToUpdate.cardOrderIds = dndOrderedCardIds
    }
    setBoard(newBoard)
    updateColumnDetailsAPI(columnId, { cardOrderIds :  dndOrderedCardIds })
  }
  if (!board) {
    return (
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100vw',
        gap: 2 }}>
        <CircularProgress />
        <Typography >Loading...</Typography>
      </Box>
    )
  }
  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar />

      <BoardBar board={board} />
      <BoardContent
        board={board}
        createNewColumn={createNewColumn}
        createNewCard={createNewCard}
        moveColumn={moveColumn}
        moveCardInTheSameColumn={moveCardInTheSameColumn}
      />

    </Container>
  )
}

export default Board
