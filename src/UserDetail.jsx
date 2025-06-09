import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { API_BASE } from './constants';

const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [userRes, postsRes] = await Promise.all([
          axios.get(`${API_BASE}/users/${id}`),
          axios.get(`${API_BASE}/users/${id}/posts`),
        ]);
        setUser(userRes.data);
        setPosts(postsRes.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  if (loading)
    return (
      <Container>
        <CircularProgress />
      </Container>
    );
  if (error)
    return (
      <Container>
        <Alert severity="error">{error}</Alert>
      </Container>
    );

  const userFields = [
    { label: 'Nombre', value: user.name },
    { label: 'Nombre de usuario', value: user.username },
    { label: 'Email', value: user.email },
    { label: 'Teléfono', value: user.phone },
    { label: 'Ciudad', value: user.address?.city },
    { label: 'Empresa', value: user.company?.name },
  ];

  return (
    <Container>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={2}
      >
        <Typography variant="h5">Detalle del Usuario</Typography>
        <Button
          variant="outlined"
          sx={{ marginTop: '5px' }}
          onClick={() => navigate('/')}
        >
          Volver
        </Button>
      </Box>

      <Card variant="outlined" sx={{ mb: 3 }}>
        <CardContent>
          {userFields.map((field) => (
            <Typography key={field.label} gutterBottom>
              <strong>{field.label}:</strong> {field.value}
            </Typography>
          ))}
        </CardContent>
      </Card>

      <Typography variant="h6" gutterBottom>
        Posts
      </Typography>
      {posts.map((post) => (
        <Card key={post.id} variant="outlined" style={{ marginBottom: '1rem' }}>
          <CardContent>
            <Typography variant="subtitle1" fontWeight="bold">
              {post.title}
            </Typography>
            <Typography>{post.body}</Typography>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
};

export default UserDetail;
