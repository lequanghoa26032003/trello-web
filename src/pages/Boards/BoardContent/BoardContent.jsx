import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCards/Card/Card'
import { mapOrder } from '~/ultis/sorts'
import {
  DndContext,
  // KeyboardSensor,
  MouseSensor,
  TouchSensor,
  // PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects
} from '@dnd-kit/core'
import { useEffect, useState } from 'react'
import { arrayMove } from '@dnd-kit/sortable'
const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}
function BoardContent( props ) {
  // const pointerSensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } })
  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } })
  const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 200 } })
  const sensors = useSensors(mouseSensor, touchSensor)
  const { board } = props
  const [orderredColumns, setOrderredColumns] = useState([])
  const [activeDragItemId, setactiveDragItemId] = useState(null)
  const [activeDragItemType, setactiveDragItemType] = useState(null)
  const [activeDragItemData, setactiveDragItemData] = useState(null)
  const handleDragStart = (event) => {
    // console.log('handleDragStart', event)
    setactiveDragItemId(event?.active?.id)
    setactiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setactiveDragItemData(event?.active?.data?.current)
  }
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
    setactiveDragItemId(null)
    setactiveDragItemType(null)
    setactiveDragItemData(null)
  }
  useEffect(() => {
    setOrderredColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])
  const customdropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: '0.5',
        },
      },
    }),
  };
  return (
    <DndContext onDragStart={ handleDragStart } onDragEnd={ handleDragEnd } sensors={sensors} >
      <Box sx={{
        bgcolor: ( theme ) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2' ),
        width: '100%',
        height: (theme) => theme.trelloCustom.boardContentHeight
      }}>
        <ListColumns columns= {orderredColumns} />
        <DragOverlay dropAnimation={customdropAnimation}>
          {!activeDragItemType && null}
          {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) && <Column column={activeDragItemData} />}
          {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) && <Card card={activeDragItemData} />}

        </DragOverlay>
      </Box>
    </DndContext>
  )
}

export default BoardContent
