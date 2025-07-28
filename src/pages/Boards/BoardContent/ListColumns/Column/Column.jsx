import React from 'react'
import Tooltip from '@mui/material/Tooltip'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import ContentCut from '@mui/icons-material/ContentCut'
import ContentCopy from '@mui/icons-material/ContentCopy'
import ContentPaste from '@mui/icons-material/ContentPaste'
import Cloud from '@mui/icons-material/Cloud'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Box from '@mui/material/Box'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import AddCardIcon from '@mui/icons-material/AddCard'
import Button from '@mui/material/Button'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import ListCards from './ListCards/ListCards'
import TextField from '@mui/material/TextField'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import { useConfirm } from 'material-ui-confirm'
import { toast } from 'react-toastify'
import {
  createNewCardAPI,
  deleteColumnDetailsAPI,
  updateColumnDetailsAPI
} from '~/apis'
import { updateCurrentActiveBoard, selectCurrentActiveBoard
} from '~/redux/activeBoard/activeBoardSlice'
import { useDispatch, useSelector } from 'react-redux'
import { cloneDeep } from 'lodash'
import ToggleFocusInput from '~/components/Form/ToggleFocusInput'
function Column( props ) {
  const dispatch = useDispatch()
  const board = useSelector(selectCurrentActiveBoard)
  const { column } = props
  const orderedCards = column.cards

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: column._id,
    data: { ...column }
  })
  const dndkitColumnStyle = {
    touchAction: 'none',
    transform: CSS.Translate.toString(transform),
    transition,
    height: '100%',
    opacity: isDragging ? 0.5 : undefined
  }

  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const [openNewCardForm, setOpenNewCardForm] = useState(false)
  const toggleOpenNewCardForm = () => {setOpenNewCardForm(!openNewCardForm)}
  const [newCardTite, setNewCardTitle] = useState('')
  const addNewCard = async () => {
    if (!newCardTite) {
      toast.error('Thêm title đi')
      return
    }
    const newCardData = {
      title: newCardTite,
      columnId: column._id
    }
    // Gọi API tạo mới Card và làm lại dữ liệu State Board
    const createdCard = await createNewCardAPI({
      ...newCardData,
      boardId: board._id
    })
    // const newBoard = { ...board }
    const newBoard = cloneDeep(board)
    const columnToUpdate = newBoard.columns.find( column => column._id === createdCard.columnId)
    if (columnToUpdate) {
      if (columnToUpdate.cards.some( card => card.FE_PlaceholderCard )) {
        columnToUpdate.cards = [createdCard]
        columnToUpdate.cardOrderIds = [createdCard._id]
      } else {
        columnToUpdate.cards.push(createdCard)
        columnToUpdate.cardOrderIds.push(createdCard._id)
      }

    }
    dispatch(updateCurrentActiveBoard(newBoard))
    toggleOpenNewCardForm()
    setNewCardTitle('')
  }
  const confirmDeleteColumn = useConfirm()
  const handleDeleteColumn = () => {
    confirmDeleteColumn ( {
      title : 'Delete column?',
      description : 'Are you sure you want to delete this column?',
      confirmationText : 'Đồng ý',
      cancellationText : 'Hủy'
      // allowClose: false,
      // content:'',
      // dialogProps: { maxWidth: 'sm' },
      // confirmationButtonProps: { color: 'error' },
      // cancellationButtonProps: { color: 'primary' }
    }) . then( () => {
      const newBoard = { ...board }
      newBoard.columns = newBoard.columns.filter( c => c._id !== column._id)
      newBoard.columnOrderIds = newBoard.columnOrderIds.filter( _id => _id !== column._id)
      dispatch(updateCurrentActiveBoard(newBoard))
      deleteColumnDetailsAPI(column._id).then( res => {
        toast.success(res?.deleteResult)
      })
    }).cath(() => {})
  }

  const onUpdateColumnTitle = (newTitle) => {
    updateColumnDetailsAPI(column._id, { title: newTitle }).then( () => {
      const newBoard = cloneDeep(board)
      const columnToUpdate = newBoard.columns.find( c => c._id === column._id )
      if (columnToUpdate) {
        columnToUpdate.title = newTitle
      }
      dispatch(updateCurrentActiveBoard(newBoard))
    })
  }
  return (
    <div ref= {setNodeRef} style={dndkitColumnStyle} {...attributes}>
      <Box
        {...listeners}
        sx={{
          minWidth: '300px',
          maxWidth: '300px',
          bgcolor: ( theme ) => (theme.palette.mode === 'dark' ? '#333643' : '#ebecf0' ),
          ml: 2,
          borderRadius: '6px',
          height: 'fit-content',
          maxHeight: (theme) => `calc(${theme.trelloCustom.boardContentHeight} - ${theme.spacing(5)} )`
        }}>
        <Box sx= {{
          height: (theme) => theme.trelloCustom.columnHeaderHeight,
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'

        }}>
          <ToggleFocusInput
            value={column?.title}
            onChangedValue={onUpdateColumnTitle}
            data-no-dnd="true"

          />
          <Box>
            <Tooltip title="More options" >
              <ExpandMoreIcon
                id="basic-button-workspaces"
                aria-controls={open ? 'basic-menu-workspaces' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              />
            </Tooltip>
            <Menu
              id="basic-menu-workspaces"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button-workspaces'
              }}
            >
              <MenuItem
                onClick={toggleOpenNewCardForm}
                sx = {{
                  '&:hover': {
                    color: 'success.light',
                    '& .add-card-icon':{
                      color: 'success.light'
                    }
                  }
                }}
              >
                <ListItemIcon><AddCardIcon className='add-card-icon' fontSize="small" /></ListItemIcon>
                <ListItemText>Thêm thẻ</ListItemText>
              </MenuItem>
              <MenuItem onClick={handleClose} >
                <ListItemIcon><ContentCopy fontSize="small" /></ListItemIcon>
                <ListItemText>Cut</ListItemText>
              </MenuItem>
              <MenuItem onClick={handleClose} >
                <ListItemIcon><ContentPaste fontSize="small" /></ListItemIcon>
                <ListItemText>Copy</ListItemText>
              </MenuItem>
              <MenuItem onClick={handleClose} >
                <ListItemIcon><ContentCut fontSize="small" /></ListItemIcon>
                <ListItemText>Paste</ListItemText>
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleClose} >
                <ListItemIcon><Cloud fontSize="small" />
                </ListItemIcon><ListItemText>Archive this column</ListItemText>
              </MenuItem>
              <MenuItem
                onClick={handleDeleteColumn}
                sx = {{
                  '&:hover': {
                    color: 'warning.dark',
                    '& .delete-Forever-icon':{
                      color: 'warning.dark'
                    }
                  }
                }}
              >
                <ListItemIcon><DeleteForeverIcon className='delete-Forever-icon' fontSize="small" />
                </ListItemIcon><ListItemText>Xóa danh sách</ListItemText>
              </MenuItem>
            </Menu>
          </Box>
        </Box>
        <ListCards cards = {orderedCards} />
        <Box sx= {{
          height: (theme) => theme.trelloCustom.columnFooterHeight,
          p: 2

        }}>
          {!openNewCardForm
            ?
            <Box
              sx={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <Button startIcon={<AddCardIcon/>} onClick={toggleOpenNewCardForm} >Thêm thẻ</Button>
              <Tooltip title="Drag to move" >
                <DragHandleIcon sx={{ cursor: 'pointer' }} />
              </Tooltip>
            </Box>
            :
            <Box
              sx={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              <TextField
                label="Nhập tiêu đề thẻ..."
                variant="outlined"
                value={newCardTite}
                onChange={ ( e ) => setNewCardTitle(e.target.value) }
                size="small"
                autoFocus
                data-no-dnd="true"
                sx={{
                  '& label':{ color: 'text.primary' },
                  '& label.Mui-focused': { color: (theme) => theme.palette.primary.main },
                  '& input': {
                    color: (theme) => theme.palette.primary.main,
                    bgcolor: (theme) => theme.palette.mode === 'dark' ? '#333643' : 'white'
                  },
                  '& .MuiOutlinedInput-root':{
                    '& fieldset': {
                      borderColor: (theme) => theme.palette.primary.main
                    },
                    '&:hover fieldset':{
                      borderColor: (theme) => theme.palette.primary.main
                    },
                    '&.Mui-focused fieldset':{
                      borderColor: (theme) => theme.palette.primary.main
                    },
                    '& .MuiOutlinedInput-input': {
                      borderRadius: 1
                    }
                  }
                }}
              />
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Button
                  className="interceptor-loading"
                  onClick={addNewCard}
                  variant="contained" color="success" size="small"
                  sx={{
                    boxShadow: 'none',
                    border: '0.5px solid',
                    borderColor: (theme) => theme.palette.success.main,
                    '&:hover': { bgcolor: (theme) => theme.palette.success.main }
                  }}
                >Thêm</Button>
                <CloseIcon
                  fontSize="small"
                  sx={{
                    color: (theme) => theme.palette.warning.light,
                    cursor: 'pointer',
                    '&:hover': { color: (theme) => theme.palette.warning.light }
                  }}
                  onClick={toggleOpenNewCardForm}
                />
              </Box>
            </Box>
          }

        </Box>
      </Box>
    </div>

  )
}

export default Column