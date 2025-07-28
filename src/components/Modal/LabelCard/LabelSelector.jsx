import React, { useState } from 'react'
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  IconButton,
  Box
} from '@mui/material'
import { Edit } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'

function LabelSelector() {
  const [open, setOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [labels, setLabels] = useState([
    { id: 1, color: '#4caf50', title: 'Xanh lá cây', checked: false },
    { id: 2, color: '#ffeb3b', title: 'Vàng', checked: false },
    { id: 3, color: '#ff9800', title: 'Cam', checked: false },
    { id: 4, color: '#f44336', title: 'Đỏ', checked: false },
    { id: 5, color: '#3f51b5', title: 'Xanh dương', checked: false }
  ])

  const handleToggle = (id) => {
    setLabels((prevLabels) =>
      prevLabels.map((label) =>
        label.id === id ? { ...label, checked: !label.checked } : label
      )
    )
  }

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleSearch = (event) => setSearchTerm(event.target.value.toLowerCase())

  const filteredLabels = labels.filter(
    (label) => label.title.toLowerCase().includes(searchTerm)
  )

  return (
    <>
      <Button variant="outlined" onClick={handleOpen}>
        Chỉnh sửa nhãn
      </Button>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Nhãn</DialogTitle>
        <DialogContent>
          {/* Input tìm kiếm */}
          <TextField
            fullWidth
            placeholder="Tìm nhãn..."
            variant="outlined"
            margin="normal"
            onChange={handleSearch}
          />

          {/* Danh sách nhãn */}
          <List>
            {filteredLabels.map((label) => (
              <ListItem key={label.id} button onClick={() => handleToggle(label.id)}>
                <Checkbox checked={label.checked} color="primary" />
                <Box
                  sx={{
                    width: 24,
                    height: 24,
                    backgroundColor: label.color,
                    borderRadius: '4px',
                    marginRight: '16px',
                  }}
                />
                <ListItemText primary={label.title || 'Không có tiêu đề'} />
                <IconButton>
                  <Edit />
                </IconButton>
              </ListItem>
            ))}
          </List>

          {/* Nút tạo nhãn mới */}
          <Button
            variant="contained"
            fullWidth
            sx={{ marginTop: 2 }}
            onClick={() => alert('Tính năng tạo nhãn mới!')}
          >
            Tạo nhãn mới
          </Button>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default LabelSelector
