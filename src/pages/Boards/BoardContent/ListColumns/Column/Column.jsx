import React from 'react'
import Tooltip from '@mui/material/Tooltip'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import Typography from '@mui/material/Typography'
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
import { mapOrder } from '~/ultis/sorts'
import TextField from '@mui/material/TextField'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import theme from '~/theme'


function Column( props ) {
  const { column } = props
  const orderedCards = mapOrder(column?.cards, column?.cardOrderIds, '_id')

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
  const addNewCard = () => {
    if (!newCardTite) {
      console.error('Thêm title đi')
      return
    }
    toggleOpenNewCardForm()
    setNewCardTitle('')
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
          <Typography variant='h6' sx={{
            fontWeight: 'bold',
            cursor: 'pointer',
            fontSize: '1rem'
          }} >
            {column?.title}
          </Typography>
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
              MenuListProps={{
                'aria-labelledby': 'basic-button-workspaces'
              }}
            >
              <MenuItem onClick={handleClose} >
                <ListItemIcon><AddCardIcon fontSize="small" /></ListItemIcon>
                <ListItemText>Add new card</ListItemText>
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
              <MenuItem onClick={handleClose} >
                <ListItemIcon><DeleteForeverIcon fontSize="small" />
                </ListItemIcon><ListItemText>Remove this column</ListItemText>
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
              <Button startIcon={<AddCardIcon/>} onClick={toggleOpenNewCardForm} >Add new card</Button>
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
                label="Enter card title..."
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
                  onClick={addNewCard}
                  variant="contained" color="success" size="small"
                  sx={{
                    boxShadow: 'none',
                    border: '0.5px solid',
                    borderColor: (theme) => theme.palette.success.main,
                    '&:hover': { bgcolor: (theme) => theme.palette.success.main }
                  }}
                >Add</Button>
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