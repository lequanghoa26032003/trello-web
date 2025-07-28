import Button from '@mui/material/Button'
import { Card as MuiCard } from '@mui/material'
import Typography from '@mui/material/Typography'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import CardUserGroup from '~/components/Modal/ActiveCard/CardUserGroup'
import CommentIcon from '@mui/icons-material/Comment'
import AttachmentIcon from '@mui/icons-material/Attachment'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useDispatch, useSelector } from 'react-redux'
import { updateCurrentActiveCard,
  showModalActiveCard,
  selectCurrentActiveCard
} from '~/redux/activeCard/activeCardSlice'
import { updateCardDetailsAPI } from '~/apis'
import { updateCardInBoard } from '~/redux/activeBoard/activeBoardSlice'
function Card( props ) {
  const dispatch = useDispatch()
  const activeCard = useSelector(selectCurrentActiveCard)
  const { card } = props
  const shouldShowCardActions = () => {
    return !!card?.memberIds?.length || !!card?.comments?.length || !!card?.attachments?.length
  }
  //fc dùng chung cho update card
  const callApiUpdateCard = async(updateData) => {
    const updatedCard = await updateCardDetailsAPI(card?._id, updateData)

    dispatch(updateCurrentActiveCard(updatedCard))
    //
    dispatch(updateCardInBoard(updatedCard))
    return updatedCard
  }
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: card._id,
    data: { ...card }
  })
  const dndkitCardStyle = {
    touchAction: 'none',
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : undefined
  }
  const setActiveCard = () => {
    dispatch(updateCurrentActiveCard(card))
    // Hieenj Modal ActiveCard leen
    dispatch(showModalActiveCard())
  }
  const onUpdateCardMembers = (incomingMemberInfo) => {
    callApiUpdateCard({ incomingMemberInfo })
  }
  return (
    <MuiCard
      ref= {setNodeRef}
      style={dndkitCardStyle}
      {...attributes}
      {...listeners}
      sx={{ cursor:'pointer',
        boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
        overflow: 'unset',
        display: card?.FE_PlaceholderCard ? 'none' : 'block',
        border: '1px solid transparent',
        '&:hover': { borderColor: (theme) => theme.palette.primary.main }
      }}
    >
      {card?.cover &&
        <CardMedia
          sx={{ height: 140 }}
          image={card.cover}
          onClick={setActiveCard}

        />
      }
      <CardContent onClick={setActiveCard}>
        <Typography>{card?.title}</Typography>
      </CardContent>
      {shouldShowCardActions () &&
      <CardActions sx={{ p: '0 4px 8px 4px' }} >
        {!!card?.memberIds?.length &&
          <CardUserGroup
            cardMemberIds = { card?.memberIds}
            onUpdateCardMember = { onUpdateCardMembers }

          />
        // <Button size="small" startIcon={<GroupIcon/>} >{card?.memberIds?.length}</Button>
        }
        {!!card?.comments?.length &&
        <Button size="small" startIcon={<CommentIcon/>} >{card?.comments?.length}</Button>
        }
        {!!card?.attachments?.length &&
        <Button size="small" startIcon={<AttachmentIcon/>} >{card?.attachments?.length}</Button>
        }
      </CardActions>
      }


    </MuiCard>
  )
}

export default Card