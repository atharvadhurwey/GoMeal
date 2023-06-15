import { createTheme } from '@mui/material/styles';
import {
  AppBar,
  Badge,
  Box,
  Button,
  Container,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  InputBase,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  ThemeProvider,
  Toolbar,
  Typography,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import CancelIcon from '@mui/icons-material/Cancel';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import Head from 'next/head';
import NextLink from 'next/link';
import classes from '../utils/classes';
import { useContext, useEffect, useState } from 'react';
import { Store } from '../utils/Store';
import jsCookie from 'js-cookie';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { getError } from '../utils/error';

export default function Layout({ title, description, children }) {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { darkMode, cart, userInfo } = state;
  const theme = createTheme({
    components: {
      MuiLink: {
        defaultProps: {
          underline: 'hover',
        },
      },
    },
    typography: {
      h1: {
        fontSize: '1.6rem',
        fontWeight: 400,
        margin: '1rem 0',
      },
      h2: {
        fontSize: '1.4rem',
        fontWeight: 400,
        margin: '1rem 0',
      },
    },
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#f0c000',
      },
      secondary: {
        main: '#208080',
      },
    },
  });
  const darkModeChangeHandler = () => {
    dispatch({ type: darkMode ? 'DARK_MODE_OFF' : 'DARK_MODE_ON' });
    const newDarkMode = !darkMode;
    jsCookie.set('darkMode', newDarkMode ? 'ON' : 'OFF');
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const loginMenuCloseHandler = (e, redirect) => {
    setAnchorEl(null);
    if (redirect && redirect == "backdropClick")
      return;
    if (redirect) {
      router.push(redirect);
    }
  };
  const loginClickHandler = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const logoutClickHandler = () => {
    setAnchorEl(null);
    dispatch({ type: 'USER_LOGOUT' });
    jsCookie.remove('userInfo');
    jsCookie.remove('cartItems');
    jsCookie.remove('shippingAddress');
    jsCookie.remove('paymentMethod');
    router.push('/');
  };

  const [sidbarVisible, setSidebarVisible] = useState(false);
  const sidebarOpenHandler = () => {
    setSidebarVisible(true);
  };
  const sidebarCloseHandler = () => {
    setSidebarVisible(false);
  };

  const { enqueueSnackbar } = useSnackbar();
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`/api/products/categories`);
        setCategories(data);
      } catch (err) {
        enqueueSnackbar(getError(err), { variant: 'error' });
      }
    };
    fetchCategories();
  }, [enqueueSnackbar]);

  const isDesktop = useMediaQuery('(min-width:600px)');

  const [query, setQuery] = useState('');
  const queryChangeHandler = (e) => {
    setQuery(e.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    router.push(`/search?query=${query}`);
  };

  try {
    console.log(userInfo.isAdmin)
  } catch (error) {
    console.log(error)
  }
  return (
    <>
      <Head>
        <title>{title ? `${title} - GoMeal` : 'GoMeal'}</title>
        {description && <meta name="description" content={description}></meta>}
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static" sx={classes.appbar}>
          <Toolbar>
            <Box display="flex" alignItems="center">
              <IconButton
                edge="start"
                aria-label="open drawer"
                onClick={sidebarOpenHandler}
                sx={classes.menuButton}
              >
                <MenuIcon sx={classes.navbarButton} />
              </IconButton>
              <NextLink href="/" passHref>
                <Link>
                  <Typography sx={classes.brand}>GoMeal.</Typography>
                </Link>
              </NextLink>
            </Box>
            <Box sx={isDesktop ? classes.visible : classes.hidden}>
              <form onSubmit={submitHandler}>
                <Box sx={classes.searchForm}>
                  <IconButton
                    type="submit"
                    sx={classes.searchButton}
                    aria-label="search"
                  >
                    <SearchIcon />
                  </IconButton>
                  <InputBase
                    name="query"
                    sx={classes.searchInput}
                    placeholder="Search products"
                    onChange={queryChangeHandler}
                  />
                </Box>
              </form>
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: 'flex', gap: 2, }}>

              <NextLink href="/cart" passHref>
                <Link>
                  <Typography component="span">
                    {cart.cartItems.length > 0 ? (
                      <Badge
                        color="secondary"
                        badgeContent={cart.cartItems.length}
                      >
                        <ShoppingCartIcon />
                      </Badge>
                    ) : (
                      <ShoppingCartIcon />
                    )}
                  </Typography>
                </Link>
              </NextLink>
              {userInfo ? (
                <>
                  <Button
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    sx={classes.navbarButton}
                    onClick={loginClickHandler}
                  >
                    {userInfo.name}
                  </Button>
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={loginMenuCloseHandler}
                  >
                    <MenuItem
                      onClick={(e) => loginMenuCloseHandler(e, '/profile')}
                    >
                      Profile
                    </MenuItem>
                    <MenuItem
                      onClick={(e) =>
                        loginMenuCloseHandler(e, '/order-history')
                      }
                    >
                      Order History
                    </MenuItem>
                    {userInfo.isAdmin ? (<MenuItem
                      onClick={(e) =>
                        loginMenuCloseHandler(e, '/admin/dashboard')
                      }
                    >
                      Admin Dashboard
                    </MenuItem>) : null}
                    <MenuItem onClick={logoutClickHandler}>Logout</MenuItem>
                  </Menu>
                </>
              ) : (
                <NextLink href="/login" passHref>
                  <Link><AccountCircleIcon /></Link>
                </NextLink>
              )}
            </Box>
          </Toolbar>
        </AppBar>
        <Drawer
          anchor="left"
          open={sidbarVisible}
          onClose={sidebarCloseHandler}
        >
          <List>
            <ListItem>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography sx={{ color: '#1a4d2e', fontWeight: 'bold', fontSize: 20, }}>GoMeal.</Typography>
                <Box sx={{ flexGrow: 1, width: 80 }} />
                <IconButton
                  aria-label="close"
                  onClick={sidebarCloseHandler}
                >
                  <CancelIcon />
                </IconButton>
              </Box>
            </ListItem>
            <Divider light />
            <NextLink href="/" passHref>
              <ListItem button
                component="a"
                onClick={sidebarCloseHandler}>
                <ListItemIcon><DashboardIcon /></ListItemIcon>
                <ListItemText>Dashboard</ListItemText>
              </ListItem>
            </NextLink>
            <NextLink href="/cart" passHref>
              <ListItem button
                component="a"
                onClick={sidebarCloseHandler}>
                <ListItemIcon><ShoppingCartIcon /></ListItemIcon>
                <ListItemText>Cart</ListItemText>
              </ListItem>
            </NextLink>
            {userInfo ? (
              <NextLink href="/profile" passHref>
                <ListItem button
                  component="a"
                  onClick={sidebarCloseHandler}>
                  <ListItemIcon><AccountCircleIcon /></ListItemIcon>
                  <ListItemText>Profile</ListItemText>
                </ListItem>
              </NextLink>
            ) : (
              <NextLink href="/login" passHref>
                <ListItem button
                  component="a"
                  onClick={sidebarCloseHandler}>
                  <ListItemIcon><LoginIcon /></ListItemIcon>
                  <ListItemText>Login</ListItemText>
                </ListItem>
              </NextLink>
            )}
            {userInfo ? (
              <NextLink href="/" passHref>
                <ListItem button
                  component="a"
                  onClick={() => {
                    logoutClickHandler();
                    sidebarCloseHandler();
                  }}>
                  <ListItemIcon><LogoutIcon /></ListItemIcon>
                  <ListItemText>Logout</ListItemText>
                </ListItem>
              </NextLink>
            ) : (
              null
            )}
            {userInfo ? userInfo.isAdmin ? (
              <NextLink href="/admin/dashboard" passHref>
                <ListItem button
                  component="a"
                  onClick={sidebarCloseHandler}>
                  <ListItemIcon><AdminPanelSettingsIcon /></ListItemIcon>
                  <ListItemText>Admin Dashboard</ListItemText>
                </ListItem>
              </NextLink>
            ) : null : (
              null
            )}
          </List>
        </Drawer>
        <Container component="main" sx={classes.main}>
          {children}
        </Container>
        <Box component="footer" sx={classes.footer} style={{ marginTop: 40, marginBottom: 20, }}>
          <Typography>All rights reserved. GoMeal.</Typography>
        </Box>
      </ThemeProvider>
    </>
  );
}
