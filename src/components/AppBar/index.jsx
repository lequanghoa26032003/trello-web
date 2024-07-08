import Box from '@mui/material/Box'
import ModeSelect from '~/components/ModeSelect'
import AppsIcon from '@mui/icons-material/Apps'
import { ReactComponent as StarIcon } from '~/assets/trello.svg'
import SvgIcon from '@mui/material/SvgIcon'
import Typography from '@mui/material/Typography'
function AppBar() {
  return (
    <Box px={2} my={0.5} sx={{
      width: '100%',
      height: (theme) => theme.trelloCustom.appBarHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      <Box sx= {{ display: 'flex', alignItems: 'center', gap:2 }} >
        <AppsIcon sx= {{ color: 'primary.main' } } />
        <Box sx= {{ display: 'flex', alignItems: 'center', gap:1 }}>
          <SvgIcon component={StarIcon} inheritViewBox sx= { { color: 'primary.main' } } />
          <Typography variant="span" sx= {{ fontSize: '1.2rem', fontWeight: 'bold', color: 'primary.main' }} >
            Trello
          </Typography>
        </Box>
      </Box>
      <Box>
        <ModeSelect/>
      </Box>
    </Box>
  )
}

export default AppBar
