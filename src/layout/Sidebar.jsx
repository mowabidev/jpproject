import React, { useState } from 'react'
import { Box, List, ListIcon, ListItem, Link, HStack, VStack, IconButton } from '@chakra-ui/react'
import { MdDashboard, MdLogout, MdSettings, MdGroups, MdHandshake, MdSavings, MdAccountBalance, MdMoreHoriz, MdClose, MdMenu } from 'react-icons/md'
import { useLocation } from 'react-router-dom'

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
  
    const handleToggle = () => {
      setIsOpen(!isOpen);
    }
  return (
    <div>
        <IconButton 
            icon={isOpen ? <MdClose /> : <MdMenu />} 
            display={["block", "none"]} 
            variant="ghost" 
            onClick={handleToggle} 
        />
        <VStack display={["none", "block"]} bg={"#f4f4f4"} minHeight={"100vh"} w={"17vw"} justifyContent={"space-between"} alignItems={"stretch"} flexShrink={0}>
            <Box>
                <Box textAlign={"center"} fontSize={"1.2rem"} textTransform={"uppercase"} fontWeight={"bold"} height={"4rem"} lineHeight={"4rem"}>
                    Micro-tontine
                </Box>
                <List>
                    <NavLink label="Tableau de bord" href="/" icon={MdDashboard} active={false} />
                    <NavLink label="Souscriptions" href="/souscriptions" icon={MdAccountBalance} active={false} />
                    <NavLink label="Prêts" href="/prets" icon={MdHandshake} active={false}/>
                    <NavLink label="Épargne" href="#" icon={MdSavings} />
                    <NavLink label="Membres" href="/membres" icon={MdGroups} />
                    <NavLink label="Paramètres" href="#" icon={MdSettings} />
                    <NavLink label="Déconnexion" href="#" icon={MdLogout} />
                </List>
            </Box>
            <HStack padding={".5em 1em"} justifyContent={"space-between"} borderTop={"1px solid #d1d1d1"}>
            <Box display={['none', 'block']}>Member Name</Box>
            <MdMoreHoriz />
            </HStack>
        </VStack>
    </div>
  )
}

export default Sidebar



const NavLink = ({label, icon, href}) => {
    const location = useLocation();
    const active = location.pathname === href;
    return (
        <ListItem>
            <Link href={href} padding={".5em 1em"} display={"block"} borderBottom={"1px solid #d1d1d1"} _hover={{ textDecor: 'none', bg: '#d1d1d1'}} bg={!active || "#d1d1d1"} borderTop={href==="/" ? "1px solid #d1d1d1" : "none"}>
                <ListIcon as={icon} />
                <span display={['none', 'block']}> {label} </span>
            </Link>
        </ListItem>
    )
}