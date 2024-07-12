import { useColorScheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import LightModeIcon from '@mui/icons-material/LightMode'
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
function ModeSelect() {
  const { mode, setMode } = useColorScheme()

  const handleChange = (event) => {
    const SelectMode=event.target.value
    setMode(SelectMode)
  }

  return (
    <FormControl
      size="small"
      sx={{
        minWidth: '120px'
      }}
    >
      <InputLabel id="demo-select-small-label" sx={{ color: 'white' }} >Mode</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={mode}
        label="Mode"
        onChange={handleChange}
        sx={{
          color: 'white',
          '.MuiOutlinedInput-notchedOutline':{
            borderColor: 'white'
          },
          '&:hover .MuiOutlinedInput-notchedOutline':{
            borderColor: 'white'
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline':{
            borderColor: 'white'
          },
          '.MuiSvgIcon-root': {
            color: 'white'
          }
        }}

      >
        <MenuItem value="light" >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LightModeIcon/> Light
          </Box>
        </MenuItem>
        <MenuItem value="dark">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <DarkModeOutlinedIcon/> Dark
          </Box>
        </MenuItem>

        <MenuItem value="system">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <SettingsBrightnessIcon/> Mode
          </Box>
        </MenuItem>

      </Select>
    </FormControl>
  )
}
export default ModeSelect
