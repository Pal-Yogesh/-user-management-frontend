import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Paper, Button } from '@mui/material';

const UserDetails = ({ users }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = users.find(u => u.id === parseInt(id));

  if (!user) {
    return <Typography>User not found</Typography>;
  }

  return (
    <Paper style={{ padding: '20px', marginTop: '20px' }}>
      <Typography variant="h4" gutterBottom>{user.name}</Typography>
      <Typography><strong>Email:</strong> {user.email}</Typography>
      <Typography><strong>Phone:</strong> {user.phone}</Typography>
      <Typography><strong>Username:</strong> {user.username}</Typography>
      <Typography><strong>Address:</strong> {user.address?.street}, {user.address?.city}</Typography>
      <Typography><strong>Company:</strong> {user.company?.name}</Typography>
      <Typography><strong>Website:</strong> {user.website}</Typography>
      <Button onClick={() => navigate('/')} style={{ marginTop: '20px' }}>
        Back to User List
      </Button>
    </Paper>
  );
};

export default UserDetails;