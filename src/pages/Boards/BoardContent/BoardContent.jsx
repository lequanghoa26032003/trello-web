import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/ultis/sorts'
import {
  DndContext,
  // KeyboardSensor,
  MouseSensor,
  TouchSensor,
  // PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import { useEffect, useState } from 'react'
import { arrayMove } from '@dnd-kit/sortable'
function BoardContent( props ) {
  // const pointerSensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } })
  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } })
  const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 200 } })
  const sensors = useSensors(mouseSensor, touchSensor)
  const { board } = props
  const [orderredColumns, setOrderredColumns] = useState([])
  const handleDragEnd = (event) => {
    // console.log('handleDragEnd', event)
    const { active, over } = event
    if (!over) return
    if (active.id !== over.id) {
      const oldIndex = orderredColumns.findIndex( c => c._id === active.id)
      const newIndex = orderredColumns.findIndex( c => c._id === over.id)
      const dndOrderredColumns = arrayMove(orderredColumns, oldIndex, newIndex)
      // const dndOrderredColumnsIds = dndOrderredColumns.map(c => c._id)
      // console.log('dndOrderredColumns', dndOrderredColumns)
      // console.log('dndOrderredColumnsIds', dndOrderredColumnsIds)
      setOrderredColumns(dndOrderredColumns)
    }
  }
  useEffect(() => {
    setOrderredColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  return (
    <DndContext onDragEnd={ handleDragEnd } sensors={sensors} >
      <Box sx={{
        bgcolor: ( theme ) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2' ),
        width: '100%',
        height: (theme) => theme.trelloCustom.boardContentHeight
      }}>
        <ListColumns columns= {orderredColumns} />
      </Box>
    </DndContext>
  )
}

export default BoardContent
