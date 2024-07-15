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
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import GroupIcon from '@mui/icons-material/Group'
import CommentIcon from '@mui/icons-material/Comment'
import AttachmentIcon from '@mui/icons-material/Attachment'
function BoardContent() {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const COLUMN_HEADER_HEIGHT= '50px'
  const COLUMN_FOOTER_HEIGHT= '56px'
  return (
    <Box sx={{
      bgcolor: ( theme )=> (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2' ),
      width: '100%',
      height: (theme) => theme.trelloCustom.boardContentHeight,

    }}>
      <Box sx={{
        bgcolor: 'inherit',
        width: '100%',
        height: '100%',
        display: 'flex',
        overflowX: 'auto',
        overflowY: 'hidden',
        '&::-webkit-scrollbar-track': { m: 2 }
      }} >
        <Box
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
            height: COLUMN_HEADER_HEIGHT,
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
              Column title
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
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap:1,
            maxHeight: (theme) => `calc(${theme.trelloCustom.boardContentHeight} - ${theme.spacing(5)} - ${COLUMN_HEADER_HEIGHT} - ${COLUMN_FOOTER_HEIGHT} )`,
            overflowX: 'hidden',
            '*::-webkit-scrollbar-thumb':{
              backgroundColor: '#ced0da',
              borderRadius: '8px'
            },
            '*::-webkit-scrollbar-thumb:hover':{
              backgroundColor: '#bfc2cf'
            },
            m: '0 5px',
            p: '0 5px'
          }} >
            <Card sx={{ cursor:'pointer', overflow: 'unset' }}>
              <CardMedia
                sx={{ height: 140 }}
                image="https://trungquandev.com/wp-content/uploads/2021/05/trungquandev-cover-animation-1024x758.jpg"
                title="green iguana"
              />
              <CardContent>
                <Typography>HoaconDev</Typography>
              </CardContent>
              <CardActions sx={{ p: '0 4px 8px 4px' }} >
                <Button size="small" startIcon={<GroupIcon/>} >20</Button>
                <Button size="small" startIcon={<CommentIcon/>} >20</Button>
                <Button size="small" startIcon={<AttachmentIcon/>} >20</Button>
              </CardActions>
            </Card>
            <Card sx={{ cursor:'pointer', overflow: 'unset' }}>
              <CardContent sx={ { '&:last-child':{ p: 1.5 } } } >
                <Typography >Card 01</Typography>
              </CardContent>
            </Card>
            <Card sx={{ cursor:'pointer', overflow: 'unset' }}>
              <CardContent sx={ { '&:last-child':{ p: 1.5 } } } >
                <Typography >Card 01</Typography>
              </CardContent>
            </Card>
            <Card sx={{ cursor:'pointer', overflow: 'unset' }}>
              <CardContent sx={ { '&:last-child':{ p: 1.5 } } } >
                <Typography >Card 01</Typography>
              </CardContent>
            </Card>
            <Card sx={{ cursor:'pointer', overflow: 'unset' }}>
              <CardContent sx={ { '&:last-child':{ p: 1.5 } } } >
                <Typography >Card 01</Typography>
              </CardContent>
            </Card>
            <Card sx={{ cursor:'pointer', overflow: 'unset' }}>
              <CardContent sx={ { '&:last-child':{ p: 1.5 } } } >
                <Typography >Card 01</Typography>
              </CardContent>
            </Card>
            <Card sx={{ cursor:'pointer', overflow: 'unset' }}>
              <CardContent sx={ { '&:last-child':{ p: 1.5 } } } >
                <Typography >Card 01</Typography>
              </CardContent>
            </Card>
            <Card sx={{ cursor:'pointer', overflow: 'unset' }}>
              <CardContent sx={ { '&:last-child':{ p: 1.5 } } } >
                <Typography >Card 01</Typography>
              </CardContent>
            </Card>
            <Card sx={{ cursor:'pointer', overflow: 'unset' }}>
              <CardContent sx={ { '&:last-child':{ p: 1.5 } } } >
                <Typography >Card 01</Typography>
              </CardContent>
            </Card>
            <Card sx={{ cursor:'pointer', overflow: 'unset' }}>
              <CardContent sx={ { '&:last-child':{ p: 1.5 } } } >
                <Typography >Card 01</Typography>
              </CardContent>
            </Card>
            <Card sx={{ cursor:'pointer', overflow: 'unset' }}>
              <CardContent sx={ { '&:last-child':{ p: 1.5 } } } >
                <Typography >Card 01</Typography>
              </CardContent>
            </Card>
            <Card sx={{ cursor:'pointer', overflow: 'unset' }}>
              <CardContent sx={ { '&:last-child':{ p: 1.5 } } } >
                <Typography >Card 01</Typography>
              </CardContent>
            </Card>
            <Card sx={{ cursor:'pointer', overflow: 'unset' }}>
              <CardContent sx={ { '&:last-child':{ p: 1.5 } } } >
                <Typography >Card 01</Typography>
              </CardContent>
            </Card>
            <Card sx={{ cursor:'pointer', overflow: 'unset' }}>
              <CardContent sx={ { '&:last-child':{ p: 1.5 } } } >
                <Typography >Card 01</Typography>
              </CardContent>
            </Card>
          </Box>
          <Box sx= {{
            height: COLUMN_FOOTER_HEIGHT,
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'

          }}>
            <Button startIcon={<AddCardIcon/>} >Add new card</Button>
            <Tooltip title="Drag to move" >
              <DragHandleIcon sx={{ cursor: 'pointer' }} />
            </Tooltip>
          </Box>
        </Box>
        <Box
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
            height: COLUMN_HEADER_HEIGHT,
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
              Column title
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
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap:1,
            maxHeight: (theme) => `calc(${theme.trelloCustom.boardContentHeight} - ${theme.spacing(5)} - ${COLUMN_HEADER_HEIGHT} - ${COLUMN_FOOTER_HEIGHT} )`,
            overflowX: 'hidden',
            '*::-webkit-scrollbar-thumb':{
              backgroundColor: '#ced0da',
              borderRadius: '8px'
            },
            '*::-webkit-scrollbar-thumb:hover':{
              backgroundColor: '#bfc2cf'
            },
            m: '0 5px',
            p: '0 5px'
          }} >
            <Card sx={{ cursor:'pointer', overflow: 'unset' }}>
              <CardMedia
                sx={{ height: 140 }}
                image="https://trungquandev.com/wp-content/uploads/2021/05/trungquandev-cover-animation-1024x758.jpg"
                title="green iguana"
              />
              <CardContent>
                <Typography>HoaconDev</Typography>
              </CardContent>
              <CardActions sx={{ p: '0 4px 8px 4px' }} >
                <Button size="small" startIcon={<GroupIcon/>} >20</Button>
                <Button size="small" startIcon={<CommentIcon/>} >20</Button>
                <Button size="small" startIcon={<AttachmentIcon/>} >20</Button>
              </CardActions>
            </Card>
            <Card sx={{ cursor:'pointer', overflow: 'unset' }}>
              <CardContent sx={ { '&:last-child':{ p: 1.5 } } } >
                <Typography >Card 01</Typography>
              </CardContent>
            </Card>
            <Card sx={{ cursor:'pointer', overflow: 'unset' }}>
              <CardContent sx={ { '&:last-child':{ p: 1.5 } } } >
                <Typography >Card 01</Typography>
              </CardContent>
            </Card>
            <Card sx={{ cursor:'pointer', overflow: 'unset' }}>
              <CardContent sx={ { '&:last-child':{ p: 1.5 } } } >
                <Typography >Card 01</Typography>
              </CardContent>
            </Card>
            <Card sx={{ cursor:'pointer', overflow: 'unset' }}>
              <CardContent sx={ { '&:last-child':{ p: 1.5 } } } >
                <Typography >Card 01</Typography>
              </CardContent>
            </Card>
            <Card sx={{ cursor:'pointer', overflow: 'unset' }}>
              <CardContent sx={ { '&:last-child':{ p: 1.5 } } } >
                <Typography >Card 01</Typography>
              </CardContent>
            </Card>
            <Card sx={{ cursor:'pointer', overflow: 'unset' }}>
              <CardContent sx={ { '&:last-child':{ p: 1.5 } } } >
                <Typography >Card 01</Typography>
              </CardContent>
            </Card>
            <Card sx={{ cursor:'pointer', overflow: 'unset' }}>
              <CardContent sx={ { '&:last-child':{ p: 1.5 } } } >
                <Typography >Card 01</Typography>
              </CardContent>
            </Card>
            <Card sx={{ cursor:'pointer', overflow: 'unset' }}>
              <CardContent sx={ { '&:last-child':{ p: 1.5 } } } >
                <Typography >Card 01</Typography>
              </CardContent>
            </Card>
            <Card sx={{ cursor:'pointer', overflow: 'unset' }}>
              <CardContent sx={ { '&:last-child':{ p: 1.5 } } } >
                <Typography >Card 01</Typography>
              </CardContent>
            </Card>
            <Card sx={{ cursor:'pointer', overflow: 'unset' }}>
              <CardContent sx={ { '&:last-child':{ p: 1.5 } } } >
                <Typography >Card 01</Typography>
              </CardContent>
            </Card>
            <Card sx={{ cursor:'pointer', overflow: 'unset' }}>
              <CardContent sx={ { '&:last-child':{ p: 1.5 } } } >
                <Typography >Card 01</Typography>
              </CardContent>
            </Card>
            <Card sx={{ cursor:'pointer', overflow: 'unset' }}>
              <CardContent sx={ { '&:last-child':{ p: 1.5 } } } >
                <Typography >Card 01</Typography>
              </CardContent>
            </Card>
            <Card sx={{ cursor:'pointer', overflow: 'unset' }}>
              <CardContent sx={ { '&:last-child':{ p: 1.5 } } } >
                <Typography >Card 01</Typography>
              </CardContent>
            </Card>
          </Box>
          <Box sx= {{
            height: COLUMN_FOOTER_HEIGHT,
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'

          }}>
            <Button startIcon={<AddCardIcon/>} >Add new card</Button>
            <Tooltip title="Drag to move" >
              <DragHandleIcon sx={{ cursor: 'pointer' }} />
            </Tooltip>
          </Box>
        </Box>
      </Box>

    </Box>

  )
}

export default BoardContent
