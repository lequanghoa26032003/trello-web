import { io } from 'socket.io-client'
import { API_ROOT } from '~/ultis/constants'
export const socketIoInstance = io(API_ROOT)