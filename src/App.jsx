import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import UserDetail from './UserDetail';
import UserList from './UserList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/user/:id" element={<UserDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
