import { Box, Typography } from "@mui/material";
import AdminLayout from "../../components/adminLayout";
import PieChart from "../../components/admin/PieChart";


export default function PieChartPage() {
    return (
        <AdminLayout title='Dashboard'>
            <Box m='20px'>
                <Box height="75vh">
                    <PieChart />
                </Box>
                <Typography align="center" variant="h3" component="h2">Pie Chart</Typography>
            </Box>
        </AdminLayout>
    );
}