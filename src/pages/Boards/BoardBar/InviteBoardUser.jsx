import { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import Popover from '@mui/material/Popover'
import Button from '@mui/material/Button'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import TextField from '@mui/material/TextField'
import { useForm } from 'react-hook-form'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { EMAIL_RULE, FIELD_REQUIRED_MESSAGE, EMAIL_RULE_MESSAGE } from '~/ultis/validators'
import FieldErrorAlert from '~/components/Form/FieldErrorAlert'
import { inviteUserToBoarAPI } from '~/apis'
import { socketIoInstance } from '~/socketClient'
function InviteBoardUser( { boardId } ) {
  const [members, setMembers] = useState([
    { id: 1, name: 'Hòa Lê Quang', email: 'hoaflo2603@gmail.com', role: 'Thành viên' }
  ])
  const [selectedMember, setSelectedMember] = useState(null)
  const [anchorMenuElement, setAnchorMenuElement] = useState(null)
  const handleOpenMenu = (event, member) => {
    setSelectedMember(member)
    setAnchorMenuElement(event.currentTarget)
  }
  const handleCloseMenu = () => {
    setAnchorMenuElement(null)
    setSelectedMember(null)
  }
  const handleChangeRole = (role) => {
    setMembers((prev) =>
      prev.map((member) =>
        member.id === selectedMember.id ? { ...member, role } : member
      )
    )
    handleCloseMenu()
  }
  /**
   * Xử lý Popover để ẩn hoặc hiện một popup nhỏ, tương tự docs để tham khảo ở đây:
   * https://mui.com/material-ui/react-popover/
  */
  const [anchorPopoverElement, setAnchorPopoverElement] = useState(null)
  const isOpenPopover = Boolean(anchorPopoverElement)
  const popoverId = isOpenPopover ? 'invite-board-user-popover' : undefined
  const handleTogglePopover = (event) => {
    if (!anchorPopoverElement) setAnchorPopoverElement(event.currentTarget)
    else setAnchorPopoverElement(null)
  }

  const { register, handleSubmit, setValue, formState: { errors } } = useForm()
  const submitInviteUserToBoard = (data) => {
    const { inviteeEmail } = data
    // console.log('inviteeEmail:', inviteeEmail)
    // gọi api mời người nào đó vào bỏad
    inviteUserToBoarAPI({ inviteeEmail, boardId }).then(invitation => {
      // Clear thẻ input sử dụng react-hook-form bằng setValue, đồng thời đóng popover lại
      setValue('inviteeEmail', null)
      setAnchorPopoverElement(null)
      // Mời một người dùng vào board xong  thì gửi sự kiện socket lên server 
      socketIoInstance.emit('FE_USER_INVITED_BOARD', invitation)

    })
  }

  return (
    <Box>
      <Tooltip title="Mời thành viên vào bảng!">
        <Button
          aria-describedby={popoverId}
          onClick={handleTogglePopover}
          variant="outlined"
          startIcon={<PersonAddIcon />}
          sx={{ color: 'white', borderColor: 'white', '&:hover': { borderColor: 'white' } }}
        >
          Thêm thành viên
        </Button>
      </Tooltip>

      {/* Khi Click vào butotn Invite ở trên thì sẽ mở popover */}
      <Popover
        id={popoverId}
        open={isOpenPopover}
        anchorEl={anchorPopoverElement}
        onClose={handleTogglePopover}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <form onSubmit={handleSubmit(submitInviteUserToBoard)} style={{ width: '500px' }}>
          <Box sx={{ p: '15px 20px 20px 20px', display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="span" sx={{ fontWeight: 'bold', fontSize: '16px' }}>Thêm thành viên vào bảng này!</Typography>
            <Box>
              <TextField
                autoFocus
                fullWidth
                label="Nhập email để mời..."
                type="text"
                variant="outlined"
                {...register('inviteeEmail', {
                  required: FIELD_REQUIRED_MESSAGE,
                  pattern: { value: EMAIL_RULE, message: EMAIL_RULE_MESSAGE }
                })}
                error={!!errors['inviteeEmail']}
              />
              <FieldErrorAlert errors={errors} fieldName={'inviteeEmail'} />
            </Box>

            <Box sx={{ alignSelf: 'flex-end' }}>
              <Button
                className="interceptor-loading"
                type="submit"
                variant="contained"
                color="info"
              >
                Thêm
              </Button>
            </Box>
          </Box>
        </form>
        <Box>
          <Typography variant="h6" sx={{ mt: 3, ml: 2 }}>
            Danh sách thành viên
          </Typography>
          {members.map((member) => (
            <Box
              key={member.id}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                p: 1,
                borderBottom: '1px solid #ddd',
              }}
            >
              <Box>
                <Typography>{member.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {member.email}
                </Typography>
              </Box>
              <Button
                variant="outlined"
                size="small"
                onClick={(event) => handleOpenMenu(event, member)}
              >
                {member.role}
              </Button>
            </Box>
          ))}
        </Box>
      </Popover>
      <Menu
        anchorEl={anchorMenuElement}
        open={Boolean(anchorMenuElement)}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={() => handleChangeRole('Quản trị viên')}>Quản trị viên</MenuItem>
        <MenuItem onClick={() => handleChangeRole('Thành viên')}>Thành viên</MenuItem>
        <MenuItem disabled>
          Quan sát viên <Typography variant="body2" sx={{ ml: 1, color: 'gray' }}>(Nâng cấp)</Typography>
        </MenuItem>
        <MenuItem onClick={() => handleChangeRole('Xóa khỏi bảng')} sx={{ color: 'red' }}>
          Xóa khỏi bảng
        </MenuItem>
      </Menu>

    </Box>
  )
}

export default InviteBoardUser
