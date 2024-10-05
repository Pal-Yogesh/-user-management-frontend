import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';

const UserForm = ({ open, handleClose, addOrUpdateUser, initialData }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    username: '',
    street: '',
    city: '',
    companyName: '',
    website: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        street: initialData.address?.street || '',
        city: initialData.address?.city || '',
        companyName: initialData.company?.name || '',
      });
    } else {
      setFormData({
        name: '',
        email: '',
        phone: '',
        username: '',
        street: '',
        city: '',
        companyName: '',
        website: '',
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === 'name' && !initialData) {
      setFormData(prev => ({ ...prev, username: `USER-${value.toLowerCase().replace(/\s/g, '')}` }));
    }
  };

  const validate = () => {
    let tempErrors = {};
    tempErrors.name = formData.name.length < 3 ? "Name must be at least 3 characters" : "";
    tempErrors.email = !/\S+@\S+\.\S+/.test(formData.email) ? "Email is not valid" : "";
    tempErrors.phone = !/^\d{10}$/.test(formData.phone) ? "Phone must be 10 digits" : "";
    tempErrors.street = !formData.street ? "Street is required" : "";
    tempErrors.city = !formData.city ? "City is required" : "";
    tempErrors.companyName = formData.companyName && formData.companyName.length < 3 ? "Company name must be at least 3 characters" : "";
    // tempErrors.website = formData.website && !/^(http|https):\/\/[^ "]+$/.test(formData.website) ? "Website must be a valid URL" : "";
    setErrors(tempErrors);
    return Object.values(tempErrors).every(x => x === "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const userData = {
        ...formData,
        address: { street: formData.street, city: formData.city },
        company: { name: formData.companyName },
      };
      addOrUpdateUser(userData);
      handleClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{initialData ? 'Update User' : 'Create New User'}</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            margin="dense"
            name="name"
            label="Name"
            fullWidth
            value={formData.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            margin="dense"
            name="email"
            label="Email"
            fullWidth
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            margin="dense"
            name="phone"
            label="Phone"
            fullWidth
            value={formData.phone}
            onChange={handleChange}
            error={!!errors.phone}
            helperText={errors.phone}
          />
          <TextField
            margin="dense"
            name="username"
            label="Username"
            fullWidth
            value={formData.username}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            margin="dense"
            name="street"
            label="Street"
            fullWidth
            value={formData.street}
            onChange={handleChange}
            error={!!errors.street}
            helperText={errors.street}
          />
          <TextField
            margin="dense"
            name="city"
            label="City"
            fullWidth
            value={formData.city}
            onChange={handleChange}
            error={!!errors.city}
            helperText={errors.city}
          />
          <TextField
            margin="dense"
            name="companyName"
            label="Company Name"
            fullWidth
            value={formData.companyName}
            onChange={handleChange}
            error={!!errors.companyName}
            helperText={errors.companyName}
          />
          <TextField
            margin="dense"
            name="website"
            label="Website"
            fullWidth
            value={formData.website}
            onChange={handleChange}
            error={!!errors.website}
            helperText={errors.website}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>{initialData ? 'Update' : 'Create'}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserForm;