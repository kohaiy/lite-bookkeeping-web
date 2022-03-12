import { AppBar, BottomNavigation, BottomNavigationAction, Box, Paper, Toolbar, Typography } from '@mui/material';
import { Home, AddCircle, Person } from '@mui/icons-material';
import { useState } from 'react';
import { matchPath, matchRoutes, NavLink, Outlet, useLocation, useMatch } from 'react-router-dom';

const useRouteMatch = (patterns: readonly string[]) => {
    const { pathname } = useLocation();

    for (let i = 0; i < patterns.length; i += 1) {
        const pattern = patterns[i];
        const possibleMatch = matchPath(pattern, pathname);
        if (possibleMatch !== null) {
            return possibleMatch;
        }
    }

    return null;
};

const Main: React.FC = () => {
    const match = useRouteMatch(['/', '/bill-add', '/user']);
    const currentTab = match?.pattern.path;

    const actions = [
        { to: '/', label: '主页', icon: <Home /> },
        { to: '/bill-add', label: '记一笔', icon: <AddCircle /> },
        { to: '/user', label: '我的', icon: <Person /> },
    ];

    return (
        <Box sx={{ py: 7 }}>
            <AppBar position="fixed">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        青鱼记账
                    </Typography>
                </Toolbar>
            </AppBar>
            <Outlet />
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                <BottomNavigation showLabels value={currentTab}>
                    {actions.map((action) => (
                        <BottomNavigationAction {...action} key={action.to} component={NavLink} value={action.to} />
                    ))}
                </BottomNavigation>
            </Paper>
        </Box>
    );
};

export default Main;
