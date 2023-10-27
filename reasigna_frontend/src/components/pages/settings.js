import Head from 'next/head';
import { Box, Container, Typography } from '@mui/material';
import { DashboardLayout } from '../dashboard/dashboard-layout';
import { SettingsNotifications } from './settings/settings-notifications';
import { SettingsPassword } from './settings/settings-password';

const Settings = () => (
  <DashboardLayout>
    <Head>
      <title>
        Settings | Material Kit
      </title>
    </Head>
    <Box component="main" sx={{ flexGrow: 1, py: 8 }}    >
      <Container maxWidth="lg">
        <Typography
          sx={{ mb: 3 }}
          variant="h4"
        >
          Settings
        </Typography>
        <SettingsNotifications />
        <Box sx={{ pt: 3 }}>
          <SettingsPassword />
        </Box>
      </Container>
    </Box>
  </DashboardLayout>
);



export default Settings;
