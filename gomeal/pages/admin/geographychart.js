import { Box, Typography } from "@mui/material";
import AdminLayout from "../../components/adminLayout";
import ChoroplethChart from "../../components/admin/ChoroplethChart";


export default function AdminDashboard() {
    return (
        <AdminLayout title='Dashboard'>
            <Box m='20px'>
                <Box height="75vh">
                    <ChoroplethChart />
                </Box>
                <Typography align="center" variant="h3" component="h2">Geography Chart</Typography>
            </Box>
        </AdminLayout>
    );
}