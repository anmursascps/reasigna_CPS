import Head from "next/head";
import { Box, Container, Grid } from "@mui/material";
import { Budget } from "./stats/budget";
import { LatestOrders } from "./stats/latest-orders";
import { LatestProducts } from "./stats/latest-products";
import { Sales } from "./stats/sales";
import { TasksProgress } from "./stats/tasks-progress";
import { TotalCustomers } from "./stats/total-customers";
import { TotalProfit } from "./stats/total-profit";
import { TrafficByDevice } from "./stats/traffic-by-device";
import { DashboardLayout } from "../dashboard/dashboard-layout";

const Stats = () => {

  return (
    <DashboardLayout>
      <Head>
        <title>Dashboard | Material Kit</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <Grid container spacing={3}>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <Budget />
            </Grid>
            <Grid item xl={3} lg={3} sm={6} xs={12}>
              <TotalCustomers />
            </Grid>
            <Grid item xl={3} lg={3} sm={6} xs={12}>
              <TasksProgress />
            </Grid>
            <Grid item xl={3} lg={3} sm={6} xs={12}>
              <TotalProfit sx={{ height: "100%" }} />
            </Grid>
            <Grid item lg={8} md={12} xl={9} xs={12}>
              <Sales />
            </Grid>
            <Grid item lg={4} md={6} xl={3} xs={12}>
              <TrafficByDevice sx={{ height: "100%" }} />
            </Grid>
            <Grid item lg={4} md={6} xl={3} xs={12}>
              <LatestProducts sx={{ height: "100%" }} />
            </Grid>
            <Grid item lg={8} md={12} xl={9} xs={12}>
              <LatestOrders />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </DashboardLayout>
  );
};

export default Stats;
