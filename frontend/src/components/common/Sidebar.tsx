import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { FaHome, FaUsers, FaBuilding, FaCog } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const menuItems = [
    { text: 'Dashboard', icon: <FaHome />, path: '/dashboard' },
    { text: 'Tenants', icon: <FaUsers />, path: '/tenants' },
    { text: 'Properties', icon: <FaBuilding />, path: '/properties' },
    { text: 'Settings', icon: <FaCog />, path: '/settings' },
  ];

  return (
    <Drawer variant="permanent" sx={{ width: 240, flexShrink: 0 }}>
      <List sx={{ width: 240, mt: 8 }}>
        {menuItems.map((item) => (
          <ListItem button key={item.text} onClick={() => navigate(item.path)}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;