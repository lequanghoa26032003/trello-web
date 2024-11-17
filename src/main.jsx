import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '~/App'
import CssBaseline from '@mui/material/CssBaseline'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import theme from '~/theme'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ConfirmProvider } from 'material-ui-confirm'
// import GlobalStyles from '@mui/material/GlobalStyles'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CssVarsProvider theme={theme}>
      <ConfirmProvider defaultOptions={{
        allowClose: false,
        dialogProps: { maxWidth: 'xs' },
        confirmationButtonProps: { color: 'error' },
        cancellationButtonProps: { color: 'primary' }
      }} >
        <CssBaseline/>
        <App/>
        <ToastContainer theme="colored" />
      </ConfirmProvider>
    </CssVarsProvider>
  </React.StrictMode>
)

