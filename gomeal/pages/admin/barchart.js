import { Box, Typography } from "@mui/material";
import AdminLayout from "../../components/adminLayout";
import BarChart from "../../components/admin/BarChart";


export default function BarChartPage() {
    return (
        <AdminLayout title='Dashboard'>
            <Box m='20px'>
                <Box height="75vh">
                    <BarChart />
                </Box>
                <Typography align="center" variant="h3" component="h2">Bar Chart</Typography>
            </Box>
        </AdminLayout>
    );
}