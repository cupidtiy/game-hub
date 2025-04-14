import React, { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import NavBar from '../components/NavBar'
import { Box } from '@chakra-ui/react'
import useGameQueryStore from '../store'

const Layout = () => {
    const location = useLocation();
    const setSearchText = useGameQueryStore(s => s.setSearchText);

    //reset search text when navigating to the home page
    useEffect(() => {
        //only clear search when on the home page
        if (location.pathname === '/') {
            setSearchText('');
        }
    }, [location.pathname, setSearchText]);



    return (
        <>
            <NavBar />
            <Box padding={5}>

                <Outlet />

            </Box>
        </>
    )
}

export default Layout