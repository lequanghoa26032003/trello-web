import { useState } from 'react'
import Box from '@mui/material/Box'
import ModeSelect from '~/components/ModeSelect/ModeSelect'
import AppsIcon from '@mui/icons-material/Apps'
import { ReactComponent as StarIcon } from '~/assets/trello.svg'
import SvgIcon from '@mui/material/SvgIcon'
import Typography from '@mui/material/Typography'
import Workspaces from './Menus/Workspaces'
import Recent from './Menus/Recent'
import Starred from './Menus/Starred'
import Templates from './Menus/Templates'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import Badge from '@mui/material/Badge'
import Tooltip from '@mui/material/Tooltip'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import Profile from './Menus/Profile'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
import { Link } from 'react-router-dom'
import { verifyUserAPI } from '~/apis'
import Notifications from './Notifications/Notifications'
import AutoCompleteSearchBoard from './SearchBoards/AutoCompleteSearchBoard'
function AppBar() {
  const [searchValue, setSearchValue]= useState('')
  return (
    <Box sx={{
      width: '100%',
      height: (theme) => theme.trelloCustom.appBarHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 2,
      px:2,
      overflowX: 'auto',
      bgcolor: (theme) => (theme.palette.mode === 'dark'? '#2c3e50': '#1565c0' )
    }}>
      <Box sx= {{ display: 'flex', alignItems: 'center', gap:2 }} >
        <Link to="/boards" >
          <Tooltip title="Board List">
            <AppsIcon sx = {{ color: 'white', verticalAlign: 'middle' }} />
          </Tooltip>
        </Link>
        <Link to="/" >
          <Box sx= {{ display: 'flex', alignItems: 'center', gap:1 }}>
            <SvgIcon component={StarIcon} inheritViewBox fontSize="small" sx= { { color: 'white' } } />
            <Typography variant="span" sx= {{ fontSize: '1.2rem', fontWeight: 'bold', color: 'white' }} >
              Trello
            </Typography>
          </Box>
        </Link>
        <Box sx={{ display: { xs: 'none', md: 'flex', gap: 1 } }} >
          <Workspaces />
          <Recent />
          <Starred />
          <Templates />
          <Button variant="outlined" startIcon={ <LibraryAddIcon /> } sx={{ color: 'white' }} >Tạo mới</Button>
        </Box>
      </Box>
      <Box sx= {{ display: 'flex', alignItems: 'center', gap:2 }} >
        <AutoCompleteSearchBoard />
        <ModeSelect/>

        <Notifications />

        <Tooltip title="Help" placement="top">
          <HelpOutlineIcon color="action" sx={{ cursor: 'pointer', color: 'white' }} />
        </Tooltip>
        <Profile />
      </Box>
    </Box>
  )
}

export default AppBar
