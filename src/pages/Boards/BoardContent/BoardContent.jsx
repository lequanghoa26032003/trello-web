import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCards/Card/Card'
import { mapOrder } from '~/ultis/sorts'
import { cloneDeep } from 'lodash'
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
  useEffect(() => {
    setOrderredColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])
  const findColumnByCardId = (cardId) => {
    return orderredColumns.find( column => column?.cards?.map(card => card._id).includes(cardId) )
  }
  const handleDragStart = (event) => {
    // console.log('handleDragStart', event)
    setactiveDragItemId(event?.active?.id)
    setactiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setactiveDragItemData(event?.active?.data?.current)
  }
  const handleDragOver = (event) => {
    // console.log('handleDragOver', event)
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return
    const { active, over } = event
    if (!active || !over) return
    const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
    const { id: overCardId } = over
    const activeColumn = findColumnByCardId(activeDraggingCardId)
    const overColumn = findColumnByCardId(overCardId)
    if (!activeColumn || !overColumn) return
    if (activeColumn._id !== overColumn._id) {
      setOrderredColumns(prevColumns => {
        const overCardIndex = overColumn?.cards?.findIndex( card => card._id === overCardId)
        let newCardIndex
        const isBelowOverItem = active.rect.current.translated && active.rect.current.translated.top > over.rect.top + over.rect.height
        const modifier = isBelowOverItem ? 1 : 0
        newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.length + 1
        const nextColumns = cloneDeep(prevColumns)
        const nextActiveColumn = nextColumns.find( column => column._id === activeColumn._id )
        const nextOverColumn = nextColumns.find( column => column._id === overColumn._id )
        if (nextActiveColumn) {
          nextActiveColumn.cards =nextActiveColumn.cards.filter(card => card._id !== activeDraggingCardId)

          nextActiveColumn.cardOderIds = nextActiveColumn.cards.map(card => card._id)
        }
        if (nextOverColumn) {
          nextOverColumn.cards =nextOverColumn.cards.filter(card => card._id !== activeDraggingCardId)

          nextOverColumn.cards =nextOverColumn.cards.toSpliced(newCardIndex, 0, activeDraggingCardData)
          nextOverColumn.cardOderIds = nextOverColumn.cards.map(card => card._id)

        }
        return nextColumns
      })
    }


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

  const customdropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: '0.5'
        }
      }
    })
  }
  return (
    <DndContext onDragStart={ handleDragStart } onDragOver={ handleDragOver } onDragEnd={ handleDragEnd } sensors={sensors} >
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
