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

import Avatar from '@mui/material';
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
export default function Products() {
    const router = useRouter();
    const { redirect } = router.query;
    const { enqueueSnackbar } = useSnackbar();
    const [state, setState] = useState({
        products: [],
        error: '',
        loading: true,
    });
    const { loading, error, products } = state;
    useEffect(() => {
        const fetchData = async () => {
            try {
                const products = await client.fetch(`*[_type == "product"]`);
                setState({ products, loading: false });
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
            enqueueSnackbar(getError(err), { variant: 'error' });
        } catch (err) {
            enqueueSnackbar(getError(err), { variant: 'error' });
        }
    };
    return (
        <AdminLayout title='Products'>
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
                                    Products
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
                                    Add Product
                                </Button>

                                <Dialog open={addNewUser} onClose={handleCloseAddNewUser}>
                                    <DialogTitle>Add New Product</DialogTitle>
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
                                                        name="brand"
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
                                                                id="brand"
                                                                label="Brand"
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
                                                        name="category"
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
                                                                id="category"
                                                                label="Category"
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
                                                        name="price"
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
                                                                id="price"
                                                                label="Price"
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
                                                        name="description"
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
                                                                id="description"
                                                                label="Description"
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
                                                    <Button variant="contained" type="submit" fullWidth color="primary" onClick={() => {
                                                        {
                                                            handleCloseAddNewUser();
                                                            // router.reload(window.location.pathname);
                                                        }
                                                    }}>
                                                        Add Product
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
                                                    Image
                                                </TableCell>
                                                <TableCell>
                                                    Name
                                                </TableCell>
                                                <TableCell>
                                                    Brand
                                                </TableCell>
                                                <TableCell>
                                                    Category
                                                </TableCell>
                                                <TableCell>
                                                    Price
                                                </TableCell>
                                                <TableCell>
                                                    Description
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {products.map((item) => {
                                                // const createdAt = format(customer._createdAt, 'dd/MM/yyyy');

                                                return (
                                                    <TableRow
                                                        hover
                                                        key={item.id}
                                                    >
                                                        <TableCell padding="checkbox">
                                                            <Checkbox
                                                            />
                                                        </TableCell>
                                                        <TableCell>
                                                            <img src={urlForThumbnail(item.image)} height={80} width={80} />
                                                        </TableCell>
                                                        <TableCell>
                                                            <Stack
                                                                alignItems="center"
                                                                direction="row"
                                                                spacing={2}
                                                            >
                                                                <Typography variant="subtitle2">
                                                                    {item.name}
                                                                </Typography>
                                                            </Stack>
                                                        </TableCell>
                                                        <TableCell>
                                                            {item.brand}
                                                        </TableCell>
                                                        <TableCell>
                                                            {item.category}
                                                        </TableCell>
                                                        <TableCell>
                                                            {item.price}
                                                        </TableCell>
                                                        <TableCell>
                                                            {item.description}
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