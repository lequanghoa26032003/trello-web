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
const Icon_Styles={
  color: 'primary.main',
  bgcolor: 'white',
  px:'5px',
  border: 'none',
  borderRadius: '4px',
  '& .MuiSvgIcon-root':{
    color: 'primary.main'
  },
  '&:hover': {
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
      border: '1px solid #16a085'
    }}>
      <Box sx= {{ display: 'flex', alignItems: 'center', gap:2 }} >
        <Chip sx={Icon_Styles}
          icon={< DashboardIcon />}
          label= 'HoaConDev MERN Stack Board'
        >
        </Chip>
        <Chip sx={Icon_Styles}
          icon={< VpnLockIcon />}
          label= 'Public/Private Workspace'
        >
        </Chip>
        <Chip sx={Icon_Styles}
          icon={< AddToDriveIcon />}
          label= 'Add to Google Drive'
        >
        </Chip>
        <Chip sx={Icon_Styles}
          icon={< BoltIcon />}
          label= 'Automation'
        >
        </Chip>
        <Chip sx={Icon_Styles}
          icon={< FilterListIcon />}
          label= 'Filters'
        >
        </Chip>
      </Box>

      <Box sx= {{ display: 'flex', alignItems: 'center', gap:2 }} >
        <Chip sx={Icon_Styles}
          icon={< PersonAddIcon />}
          label= 'Invite'
        >
        </Chip>
        <AvatarGroup sx={{ 
          '& .MuiAvatar-root ':{
            height:'34px',
            width: '34px',
            fontSize: '16px'
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
