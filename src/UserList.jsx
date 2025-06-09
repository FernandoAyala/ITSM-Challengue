import { Box, Container, TextField, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE } from './constants';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_BASE}/users`)
      .then((res) => {
        const rows = res.data.map((user) => ({
          ...user,
          city: user.address?.city ?? '',
          company: user.company?.name ?? '',
        }));
        setUsers(rows);
      })
      .catch(console.error);
  }, []);

  const filteredUsers = users.filter((user) => {
    const term = search.toLowerCase();
    return (
      user.name.toLowerCase().includes(term) ||
      user.username.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term) ||
      user.company.toLowerCase().includes(term)
    );
  });

  const columns = [
    { field: 'name', headerName: 'Nombre', flex: 1 },
    { field: 'username', headerName: 'Nombre de usuario', flex: 1 },
    { field: 'phone', headerName: 'Teléfono', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'city', headerName: 'Ciudad', flex: 1 },
    { field: 'company', headerName: 'Empresa', flex: 1 },
  ];

  return (
    <Container
      sx={{
        width: '1500px',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography variant="h4" gutterBottom>
        Lista de Usuarios
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        label="Buscar por nombre, usuario, email o empresa"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        margin="normal"
      />
      <Box sx={{ height: 650, width: '100%' }}>
        <DataGrid
          rows={filteredUsers ?? []}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          getRowId={(row) => row.id}
          onRowClick={(params) => navigate(`/user/${params.id}`)}
        />
      </Box>
    </Container>
  );
};

export default UserList;
