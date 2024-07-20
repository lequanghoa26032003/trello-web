import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/ultis/sorts'
function BoardContent( props ) {
  const { board } = props
  const orderredColumns = mapOrder(board?.columns,board?.columnOrderIds, '_id')
  return (
    <Box sx={{
      bgcolor: ( theme ) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2' ),
      width: '100%',
      height: (theme) => theme.trelloCustom.boardContentHeight
    }}>
      <ListColumns columns= {orderredColumns} />
    </Box>

  )
}

export default BoardContent
