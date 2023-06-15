import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import NextLink from 'next/link';

import { Link } from '@mui/material';

import PeopleIcon from '@mui/icons-material/People';
import DashboardIcon from '@mui/icons-material/Dashboard';
import IconButton from '@mui/material/IconButton';
import PieChartIcon from '@mui/icons-material/PieChart';
import ClassIcon from '@mui/icons-material/Class';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircle from '@mui/icons-material/AccountCircle';
import TerrainIcon from '@mui/icons-material/Terrain';
import BarChartIcon from '@mui/icons-material/BarChart';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { styled } from '@mui/material/styles';
import WebIcon from '@mui/icons-material/Web';

import jsCookie from 'js-cookie';
import { useRouter } from 'next/router';
import { Store } from '../utils/Store';

import { useContext, useEffect } from 'react';

import Head from "next/head";

const MuiLink = styled(Link)({
    color: 'darkslategray',
    textDecoration: 'none',
});

const drawerWidth = 240;

export default function AdminLayout({ title, description, children }) {
    const router = useRouter();
    const { state, dispatch } = useContext(Store);
    const { userInfo } = state;

    useEffect(() => {
        if (!userInfo) {
            return router.push('/login');
        }
    }, []);

    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const logoutClickHandler = () => {
        setAnchorEl(null);
        dispatch({ type: 'USER_LOGOUT' });
        jsCookie.remove('userInfo');
        jsCookie.remove('cartItems');
        jsCookie.remove('shippingAddress');
        jsCookie.remove('paymentMethod');
        router.push('/');
    };

    const handleChange = (event) => {
        setAuth(event.target.checked);
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <>
            <Head>
                <title>{title ? `${title} - GoMeal` : 'GoMeal'}</title>
                {description && <meta name="description" content={description}></meta>}
            </Head>
            <Box sx={{ display: 'flex', flexGrow: 1 }}>
                <CssBaseline />
                <AppBar position="fixed" sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}>
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            GoMeal. - Admin Panel
                        </Typography>
                        {auth && (
                            <div>
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleMenu}
                                    color="inherit"
                                >
                                    <AccountCircle />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >
                                    <MenuItem onClick={logoutClickHandler}>Logout</MenuItem>
                                </Menu>
                            </div>
                        )}
                    </Toolbar>
                </AppBar>
                <Drawer
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                        },
                    }}
                    variant="permanent"
                    anchor="left"
                >
                    <Toolbar />
                    <List>
                        <NextLink href='/' passHref>
                            <MuiLink>
                                <ListItem button
                                    component="a">
                                    <ListItemIcon><WebIcon /></ListItemIcon>
                                    <ListItemText>Back to Website</ListItemText>
                                </ListItem>
                            </MuiLink>
                        </NextLink>
                    </List>
                    <Divider />
                    <List>
                        <NextLink href='dashboard' passHref>
                            <MuiLink>
                                <ListItem button
                                    component="a">
                                    <ListItemIcon><DashboardIcon /></ListItemIcon>
                                    <ListItemText>Dashboard</ListItemText>
                                </ListItem>
                            </MuiLink>
                        </NextLink>
                        <NextLink href='users' passHref>
                            <MuiLink>
                                <ListItem button
                                    component="a">
                                    <ListItemIcon><PeopleIcon /></ListItemIcon>
                                    <ListItemText>Users</ListItemText>
                                </ListItem>
                            </MuiLink>
                        </NextLink>
                        <NextLink href='products' passHref>
                            <MuiLink>
                                <ListItem button
                                    component="a">
                                    <ListItemIcon><ClassIcon /></ListItemIcon>
                                    <ListItemText>Products</ListItemText>
                                </ListItem>
                            </MuiLink>
                        </NextLink>
                    </List>
                    <Divider />
                    <List>
                        <NextLink href='barchart' passHref>
                            <MuiLink>
                                <ListItem button
                                    component="a">
                                    <ListItemIcon><BarChartIcon /></ListItemIcon>
                                    <ListItemText>Bar Chart</ListItemText>
                                </ListItem>
                            </MuiLink>
                        </NextLink>
                        <NextLink href='piechart' passHref>
                            <MuiLink>
                                <ListItem button
                                    component="a">
                                    <ListItemIcon><PieChartIcon /></ListItemIcon>
                                    <ListItemText>Pie Chart</ListItemText>
                                </ListItem>
                            </MuiLink>
                        </NextLink>
                        <NextLink href='geographychart' passHref>
                            <MuiLink>
                                <ListItem button
                                    component="a">
                                    <ListItemIcon><TerrainIcon /></ListItemIcon>
                                    <ListItemText>Geography Chart</ListItemText>
                                </ListItem>
                            </MuiLink>
                        </NextLink>
                    </List>
                    <Divider />
                    <List>
                        <ListItem button
                            component="a"
                            onClick={logoutClickHandler}>
                            <ListItemIcon><LogoutIcon /></ListItemIcon>
                            <ListItemText>Logout</ListItemText>
                        </ListItem>
                    </List>
                </Drawer>
                <Box
                    component="main"
                    sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
                >
                    <Toolbar />
                    {children}
                </Box>
            </Box>
        </>
    );
}