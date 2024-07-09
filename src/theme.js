import { experimental_extendTheme as extendTheme } from '@mui/material/styles'
import { teal, cyan } from '@mui/material/colors'

const theme = extendTheme({
  trelloCustom: {
    appBarHeight: '58px',
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
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none'
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root:({ theme }) => ({
          color: theme.palette.primary.light,
          fontSize: '0.85rem',
          '.MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.primary.main
          }
        })
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root:({ theme }) => ({
          fontSize: '0.85rem',
          color: theme.palette.primary.light
        })
      }
    }
  }

})
export default theme