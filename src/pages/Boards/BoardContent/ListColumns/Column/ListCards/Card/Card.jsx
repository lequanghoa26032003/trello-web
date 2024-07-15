import Button from '@mui/material/Button'
import { Card as MuiCard } from '@mui/material'
import Typography from '@mui/material/Typography'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import GroupIcon from '@mui/icons-material/Group'
import CommentIcon from '@mui/icons-material/Comment'
import AttachmentIcon from '@mui/icons-material/Attachment'
function Card( { Card01 } ) {
  if (Card01) {
    return (
      <MuiCard sx={{ cursor:'pointer', overflow: 'unset' }}>
        <CardContent>
          <Typography>HoaconDev</Typography>
        </CardContent>
      </MuiCard>
    )
  }
  return (
    <MuiCard sx={{ cursor:'pointer', overflow: 'unset' }}>
      <CardMedia
        sx={{ height: 140 }}
        image="https://trungquandev.com/wp-content/uploads/2021/05/trungquandev-cover-animation-1024x758.jpg"
        title="green iguana"
      />
      <CardContent>
        <Typography>HoaconDev</Typography>
      </CardContent>
      <CardActions sx={{ p: '0 4px 8px 4px' }} >
        <Button size="small" startIcon={<GroupIcon/>} >20</Button>
        <Button size="small" startIcon={<CommentIcon/>} >20</Button>
        <Button size="small" startIcon={<AttachmentIcon/>} >20</Button>
      </CardActions>
    </MuiCard>
  )
}

export default Card