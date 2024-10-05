import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle 
} from '@mui/material';

const UserTable = ({ users, onEdit, onDelete }) => {
  const navigate = useNavigate();
  const [deleteConfirmation, setDeleteConfirmation] = useState({ open: false, userId: null });

  const handleView = (userId) => {
    navigate(`/user/${userId}`);
  };

  const handleDeleteClick = (userId) => {
    setDeleteConfirmation({ open: true, userId });
  };

  const handleDeleteConfirm = () => {
    onDelete(deleteConfirmation.userId);
    setDeleteConfirmation({ open: false, userId: null });
  };

  const handleDeleteCancel = () => {
    setDeleteConfirmation({ open: false, userId: null });
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">No users found</TableCell>
              </TableRow>
            ) : (
              users.map((user, index) => (
                <TableRow key={user.id} style={{ backgroundColor: index % 2 === 0 ? '#f5f5f5' : 'white' }}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleView(user.id)}>View</Button>
                    <Button onClick={() => onEdit(user)}>Edit</Button>
                    <Button onClick={() => handleDeleteClick(user.id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={deleteConfirmation.open}
        onClose={handleDeleteCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this user? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UserTable;