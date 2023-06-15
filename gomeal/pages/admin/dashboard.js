import { Box, Divider, Typography } from "@mui/material";
import AdminLayout from "../../components/adminLayout";
import BarChart from "../../components/admin/BarChart";
import PieChart from "../../components/admin/PieChart";
import ChoroplethChart from "../../components/admin/ChoroplethChart";


export default function AdminDashboard() {
    return (
        <AdminLayout title='Dashboard'>
            <Box m='20px'>
                <Box height="75vh">
                    <BarChart />
                </Box>
                <Typography align="center" variant="h3" component="h2">Bar Chart</Typography>
            </Box>
            <Divider/>
            <Box m='20px'>
                <Box height="75vh">
                    <PieChart />
                </Box>
                <Typography align="center" variant="h3" component="h2">Pie Chart</Typography>
            </Box>
            <Divider/>
            <Box m='20px'>
                <Box height="75vh">
                    <ChoroplethChart />
                </Box>
                <Typography align="center" variant="h3" component="h2">Geography Chart</Typography>
            </Box>
        </AdminLayout>
    );
}