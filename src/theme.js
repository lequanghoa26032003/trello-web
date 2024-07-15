import { experimental_extendTheme as extendTheme } from '@mui/material/styles'
const APP_BAR_HEIGHT='58px'
const BOARD_BAR_HEIGHT='60px'
const BOARD_CONTENT_HEIGHT= ` calc(100vh - ${APP_BAR_HEIGHT} - ${BOARD_BAR_HEIGHT} ) `
const theme = extendTheme({
  trelloCustom: {
    appBarHeight: APP_BAR_HEIGHT,
    boardBarHeight: BOARD_BAR_HEIGHT,
    boardContentHeight: BOARD_CONTENT_HEIGHT
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
    MuiTypography: {
      styleOverrides: {
        root:{
          '&.MuiTypography-body1': '0.85rem'
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