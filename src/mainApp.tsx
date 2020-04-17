import React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import Sidebar from './layout/sidebar';
import Header from './layout/header';
import Body from './layout/body';

// import Routes from './routes';
export default function MainApp() {
    const [open, setOpen] = React.useState(false);

    function handleDrawerOpen() {
        setOpen(true);
    }

    function handleDrawerClose() {
        setOpen(false);
    }

    return (
        <div className="main-app-container">
            <CssBaseline />
            <Header
                open={open}
                onOpen={handleDrawerOpen}
                onClose={handleDrawerClose}
            />
            <Sidebar open={open}/>
            <Body/>
            {/* <Routes/> */}
        </div>
    );
}
