import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import UserTable from './components/UserTable';
import UserForm from './components/UserForm';
import UserDetails from './components/UserDetails';
import SearchBar from './components/SearchBar';
import { Container, Typography, Button, Snackbar, CircularProgress } from '@mui/material';
import { Alert } from '@mui/material';

const App = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    setFilteredUsers(
      users.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [users, searchTerm]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      setUsers(response.data);
    } catch (error) {
      showNotification('Error fetching users', 'error');
    }
    setLoading(false);
  };

  const handleOpenForm = (user = null) => {
    setSelectedUser(user);
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setSelectedUser(null);
    setOpenForm(false);
  };

  const addOrUpdateUser = (user) => {
    if (user.id) {
      setUsers(users.map(u => u.id === user.id ? user : u));
      showNotification('User updated successfully', 'success');
    } else {
      setUsers([...users, { ...user, id: Date.now() }]);
      showNotification('User created successfully', 'success');
    }
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${userId}`);
      setUsers(users.filter(user => user.id !== userId));
      showNotification('User deleted successfully', 'success');
    } catch (error) {
      showNotification('Error deleting user', 'error');
    }
  };

  const showNotification = (message, severity) => {
    setNotification({ open: true, message, severity });
  };

  const handleCloseNotification = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setNotification({ ...notification, open: false });
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <Router>
      <Container maxWidth="lg">
        <Typography variant="h3" component="h1" gutterBottom>
        User Management
        </Typography>
        <Routes>
          <Route path="/" element={
            <>
              <Button variant="contained" color="primary" onClick={() => handleOpenForm()} style={{ marginBottom: '20px' }}>
                Create New User
              </Button>
              <SearchBar onSearch={handleSearch} />
              {loading ? (
                <CircularProgress style={{ display: 'block', margin: '20px auto' }} />
              ) : (
                <UserTable 
                  users={filteredUsers} 
                  onEdit={handleOpenForm} 
                  onDelete={deleteUser}
                />
              )}
            </>
          } />
          <Route path="/user/:id" element={<UserDetails users={users} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <UserForm 
          open={openForm} 
          handleClose={handleCloseForm} 
          addOrUpdateUser={addOrUpdateUser} 
          initialData={selectedUser} 
        />
        <Snackbar open={notification.open} autoHideDuration={6000} onClose={handleCloseNotification}>
          <Alert onClose={handleCloseNotification} severity={notification.severity}>
            {notification.message}
          </Alert>
        </Snackbar>
      </Container>
    </Router>
  );
};

export default App;