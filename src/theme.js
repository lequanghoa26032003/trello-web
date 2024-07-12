import { experimental_extendTheme as extendTheme } from '@mui/material/styles'
const theme = extendTheme({
  trelloCustom: {
    appBarHeight: '58px',
    boarBarHeight: '58px'
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderWidth: '0.5px'
        }
      }
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          '*::-webkit-scrollbar':{
            width: '8px',
            height: '8px'
          },
          '*::-webkit-scrollbar-thumb':{
            backgroundColor: '#dcdde1',
            borderRadius: '8px'
          },
          '*::-webkit-scrollbar-thumb:hover':{
            backgroundColor: 'white'
          }
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root:{
          fontSize: '0.85rem',
          '& fieldset': { borderWidth: '0.5 !important' },
          '&:hover fieldset': { borderWidth: '1 !important' },
          '&:Mui-focused fieldset': { borderWidth: '1 !important' }
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root:{
          fontSize: '0.85rem',
        }
      }
    }
  }

})
export default theme