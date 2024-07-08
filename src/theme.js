import { createTheme } from '@mui/material/styles'
import { red } from '@mui/material/colors'
import { experimental_extendTheme as extendTheme } from '@mui/material/styles'
import { teal, deepOrange, cyan, orange } from '@mui/material/colors'
// Create a theme instance.

const theme = extendTheme({
  trelloCustom: {
    appBarHeight: '48px',
    boarBarHeight: '58px'
  },
  colorSchemes: {
    light: {
      palette: {
        primary: teal
      }
    },
    dark: {
      palette: {
        primary: cyan
      }
    }
  }

})
export default theme