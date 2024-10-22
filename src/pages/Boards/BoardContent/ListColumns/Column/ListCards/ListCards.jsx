import Box from '@mui/material/Box'
import Card from './Card/Card'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
function ListCards( props ) {
  const { cards } = props
  return (
    <SortableContext items={cards?.map((c) => c._id)} strategy={verticalListSortingStrategy}>

      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        gap:1,
        maxHeight: (theme) => `calc(${theme.trelloCustom.boardContentHeight} - ${theme.spacing(5)} - ${theme.trelloCustom.columnHeaderHeight} - ${theme.trelloCustom.columnFooterHeight} )`,
        overflowX: 'hidden',
        '*::-webkit-scrollbar-thumb':{
          backgroundColor: '#ced0da',
          borderRadius: '8px'
        },
        '*::-webkit-scrollbar-thumb:hover':{
          backgroundColor: '#bfc2cf'
        },
        m: '0 5px',
        p: '0 5px 5px 5px'
      }} >
        {cards?.map((card) => {
          return <Card key={card?._id} card = {card} />
        })}
      </Box>
    </SortableContext>
  )
}

export default ListCards