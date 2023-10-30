import { Box, Toolbar } from "@mui/material";
import { NavBar, Sidebar } from "../components";

const drawerWidth = 280;

export const JournalLayout = ({ children }) => {
    return (
        <Box sx={{ display: 'flex' }} className="animate__animated animate__fadeIn animate__faster"
        >

            {/* Navbar drawerWidth */}
            <NavBar drawerWidth={drawerWidth} />


            {/* Sidebar drawerWidth */}
            <Sidebar drawerWidth={drawerWidth} />


            <Box component="main"
                sx={{ flexGrow: 1, p: 3 }}
            >
                {/* Toolbar */}
                <Toolbar />

                {children}

            </Box>
        </Box>
    );
}
