import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import Head from 'next/head';
import AdminLayout from "../../components/adminLayout";
import { Alert, CircularProgress, Grid } from '@mui/material';
import axios from 'axios';
import Router, { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useContext, useEffect, useState } from 'react';
import client from '../../utils/client';
import { urlForThumbnail } from '../../utils/image';
import { Store } from '../../utils/Store';
import { format } from 'date-fns';

import { useForm, Controller } from 'react-hook-form';
import Form from '../../components/Form';
import { getError } from '../../utils/error';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';

import { Card, InputAdornment, OutlinedInput, List, ListItem, NextLink, Link } from '@mui/material';

import {
    Checkbox,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
} from '@mui/material';
import { Scrollbar } from '../../components/scrollbar';

export const CustomersSearch = () => (
    <Card sx={{ p: 2 }}>
        <OutlinedInput
            defaultValue=""
            fullWidth
            placeholder="Search customer"
            startAdornment={(
                <InputAdornment position="start">
                    <SvgIcon
                        color="action"
                        fontSize="small"
                    >
                        <SearchIcon />
                    </SvgIcon>
                </InputAdornment>
            )}
            sx={{ maxWidth: 500 }}
        />
    </Card>
);


export default function Users() {
    const router = useRouter();
    const { redirect } = router.query;
    const { enqueueSnackbar } = useSnackbar();
    const [state, setState] = useState({
        users: [],
        error: '',
        loading: true,
    });
    const { loading, error, users } = state;
    useEffect(() => {
        const fetchData = async () => {
            try {
                const users = await client.fetch(`*[_type == "user"]`);
                setState({ users, loading: false });
            } catch (err) {
                setState({ loading: false, error: err.message });
            }
        };
        fetchData();
    }, []);

    const [addNewUser, setAddNewUser] = useState(false)

    const handleOpenAddNewUser = () => {
        setAddNewUser(true);
    };

    const handleCloseAddNewUser = () => {
        setAddNewUser(false);
    };

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();

    const submitHandler = async ({ name, email, password, confirmPassword }) => {
        const isAdmin = true;
        if (password !== confirmPassword) {
            enqueueSnackbar("Passwords don't match", { variant: 'error' });
            return;
        }
        try {
            const { data } = await axios.post('/api/users/register', {
                name,
                email,
                password,
                isAdmin,
            });
        } catch (err) {
            enqueueSnackbar(getError(err), { variant: 'error' });
        }
    };

    return (
        <AdminLayout title='Users'>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8
                }}
            >
                <Container maxWidth="xl">
                    <Stack spacing={3}>
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            spacing={4}
                        >
                            <Stack spacing={1}>
                                <Typography variant="h4">
                                    Users
                                </Typography>
                                <Stack
                                    alignItems="center"
                                    direction="row"
                                    spacing={1}
                                >
                                    <Button
                                        color="inherit"
                                        startIcon={(
                                            <SvgIcon fontSize="small">
                                                <ArrowUpwardIcon />
                                            </SvgIcon>
                                        )}
                                    >
                                        Import
                                    </Button>
                                    <Button
                                        color="inherit"
                                        startIcon={(
                                            <SvgIcon fontSize="small">
                                                <ArrowDownwardIcon />
                                            </SvgIcon>
                                        )}
                                    >
                                        Export
                                    </Button>
                                </Stack>
                            </Stack>
                            <div>
                                <Button
                                    startIcon={(
                                        <SvgIcon fontSize="small">
                                            <AddIcon />
                                        </SvgIcon>
                                    )}
                                    variant="contained"
                                    onClick={handleOpenAddNewUser}
                                >
                                    Add Admin
                                </Button>

                                <Dialog open={addNewUser} onClose={handleCloseAddNewUser}>
                                    <DialogTitle>Add New Admin</DialogTitle>
                                    <DialogContent>
                                        <Form onSubmit={handleSubmit(submitHandler)}>
                                            <List>
                                                <ListItem>
                                                    <Controller
                                                        name="name"
                                                        control={control}
                                                        defaultValue=""
                                                        rules={{
                                                            required: true,
                                                            minLength: 2,
                                                        }}
                                                        render={({ field }) => (
                                                            <TextField
                                                                variant="outlined"
                                                                fullWidth
                                                                id="name"
                                                                label="Name"
                                                                inputProps={{ type: 'name' }}
                                                                error={Boolean(errors.name)}
                                                                helperText={
                                                                    errors.name
                                                                        ? errors.name.type === 'minLength'
                                                                            ? 'Name length is more than 1'
                                                                            : 'Name is required'
                                                                        : ''
                                                                }
                                                                {...field}
                                                            ></TextField>
                                                        )}
                                                    ></Controller>
                                                </ListItem>

                                                <ListItem>
                                                    <Controller
                                                        name="email"
                                                        control={control}
                                                        defaultValue=""
                                                        rules={{
                                                            required: true,
                                                            pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                                                        }}
                                                        render={({ field }) => (
                                                            <TextField
                                                                variant="outlined"
                                                                fullWidth
                                                                id="email"
                                                                label="Email"
                                                                inputProps={{ type: 'email' }}
                                                                error={Boolean(errors.email)}
                                                                helperText={
                                                                    errors.email
                                                                        ? errors.email.type === 'pattern'
                                                                            ? 'Email is not valid'
                                                                            : 'Email is required'
                                                                        : ''
                                                                }
                                                                {...field}
                                                            ></TextField>
                                                        )}
                                                    ></Controller>
                                                </ListItem>
                                                <ListItem>
                                                    <Controller
                                                        name="password"
                                                        control={control}
                                                        defaultValue=""
                                                        rules={{
                                                            required: true,
                                                            minLength: 6,
                                                        }}
                                                        render={({ field }) => (
                                                            <TextField
                                                                variant="outlined"
                                                                fullWidth
                                                                id="password"
                                                                label="Password"
                                                                inputProps={{ type: 'password' }}
                                                                error={Boolean(errors.password)}
                                                                helperText={
                                                                    errors.password
                                                                        ? errors.password.type === 'minLength'
                                                                            ? 'Password length is more than 5'
                                                                            : 'Password is required'
                                                                        : ''
                                                                }
                                                                {...field}
                                                            ></TextField>
                                                        )}
                                                    ></Controller>
                                                </ListItem>
                                                <ListItem>
                                                    <Controller
                                                        name="confirmPassword"
                                                        control={control}
                                                        defaultValue=""
                                                        rules={{
                                                            required: true,
                                                            minLength: 6,
                                                        }}
                                                        render={({ field }) => (
                                                            <TextField
                                                                variant="outlined"
                                                                fullWidth
                                                                id="confirmPassword"
                                                                label="Confirm Password"
                                                                inputProps={{ type: 'password' }}
                                                                error={Boolean(errors.confirmPassword)}
                                                                helperText={
                                                                    errors.confirmPassword
                                                                        ? errors.confirmPassword.type === 'minLength'
                                                                            ? 'Confirm Password length is more than 5'
                                                                            : 'Confirm Password is required'
                                                                        : ''
                                                                }
                                                                {...field}
                                                            ></TextField>
                                                        )}
                                                    ></Controller>
                                                </ListItem>
                                                <ListItem>
                                                    <Button variant="contained" type="submit" fullWidth color="primary" onClick={() => {
                                                        {
                                                            handleCloseAddNewUser();
                                                            router.reload(window.location.pathname);
                                                        }
                                                    }}>
                                                        Add Admin
                                                    </Button>
                                                </ListItem>
                                            </List>
                                        </Form>
                                    </DialogContent>
                                </Dialog>

                            </div>
                        </Stack>
                        <CustomersSearch />
                        {/* table */}
                        <Card>
                            <Scrollbar>
                                <Box sx={{ minWidth: 800 }}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell padding="checkbox">
                                                    <Checkbox
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    Name
                                                </TableCell>
                                                <TableCell>
                                                    Email
                                                </TableCell>
                                                <TableCell>
                                                    Signed Up
                                                </TableCell>
                                                <TableCell>
                                                    Role
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {users.map((customer) => {
                                                // const createdAt = format(customer._createdAt, 'dd/MM/yyyy');

                                                return (
                                                    <TableRow
                                                        hover
                                                        key={customer.id}
                                                    >
                                                        <TableCell padding="checkbox">
                                                            <Checkbox
                                                            />
                                                        </TableCell>
                                                        <TableCell>
                                                            <Stack
                                                                alignItems="center"
                                                                direction="row"
                                                                spacing={2}
                                                            >
                                                                <Typography variant="subtitle2">
                                                                    {customer.name}
                                                                </Typography>
                                                            </Stack>
                                                        </TableCell>
                                                        <TableCell>
                                                            {customer.email}
                                                        </TableCell>
                                                        <TableCell>
                                                            {customer._createdAt}
                                                        </TableCell>
                                                        <TableCell>
                                                            {customer.isAdmin ? "Admin" : "User"}
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            })}
                                        </TableBody>
                                    </Table>
                                </Box>
                            </Scrollbar>
                            <TablePagination />
                        </Card>
                    </Stack>
                </Container>
            </Box>
        </AdminLayout>
    );
}