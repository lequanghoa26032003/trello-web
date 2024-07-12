import Box from '@mui/material/Box'
import DashboardIcon from '@mui/icons-material/Dashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import Chip from '@mui/material/Chip'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import User from '~/assets/hoa.jpg'
import theme from '~/theme'
import { Button } from '@mui/material'
const Icon_Styles={
  color: 'white',
  bgcolor: 'transparent',
  px:'5px',
  border: 'none',
  borderRadius: '4px',
  '.MuiSvgIcon-root': {
    color: 'white'
  },
  '.MuiSvgIcon-root:hover': {
    bgcolor: 'primary.50'
  }
}
function BoardBar() {
  return (
    <Box sx={{
      width: '100%',
      height: (theme) => theme.trelloCustom.boarBarHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 2,
      px:2,
      overflow: 'auto',

      bgcolor: (theme) => (theme.palette.mode === 'dark'? '#34495e': '#1976d2' )
    }}>
      <Box sx= {{ display: 'flex', alignItems: 'center', gap:2 }} >
        <Chip sx={Icon_Styles}
          icon={< DashboardIcon />}
          label= 'HoaConDev MERN Stack Board'
          clickable
        >
        </Chip>
        <Chip sx={Icon_Styles}
          icon={< VpnLockIcon />}
          label= 'Public/Private Workspace'
          clickable
        >
        </Chip>
        <Chip sx={Icon_Styles}
          icon={< AddToDriveIcon />}
          label= 'Add to Google Drive'
          clickable
        >
        </Chip>
        <Chip sx={Icon_Styles}
          icon={< BoltIcon />}
          label= 'Automation'
          clickable
        >
        </Chip>
        <Chip sx={Icon_Styles}
          icon={< FilterListIcon />}
          label= 'Filters'
          clickable
        >
        </Chip>
      </Box>

      <Box sx= {{ display: 'flex', alignItems: 'center', gap:2 }} >
        <Button
          startIcon={< PersonAddIcon />}
          variant="outlined"
          sx= {{
            color: 'white',
            borderColor: 'white',
            '&:hover': { borderColor: 'white'}
          }}
        >
          Invite
        </Button>
        <AvatarGroup sx={{ 
          '& .MuiAvatar-root ':{
            height:'34px',
            width: '34px',
            fontSize: '16px',
            border: 'none',
            color: 'white'
          }
        }} max={4}>
          <Avatar alt="HoaDev" src={User} />
          <Avatar alt="Travis Howard" src={User} />
          <Avatar alt="Cindy Baker" src={User} />
          <Avatar alt="Agnes Walker" src={User} />
          <Avatar alt="Trevor Henderson" src={User} />
        </AvatarGroup>
      </Box>


    </Box>

  )
}

export default BoardBar
