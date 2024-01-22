import React from 'react'
import { Box, List, ListIcon, ListItem, Link, HStack, VStack, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, DrawerFooter, useDisclosure } from '@chakra-ui/react'
import { MdDashboard, MdLogout, MdSettings, MdGroups, MdHandshake, MdSavings, MdAccountBalance, MdMoreHoriz, MdDehaze } from 'react-icons/md'
import { useLocation } from 'react-router-dom'

const Sidebar = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()

    return (
        <div>
            <VStack bg={"#f4f4f4"} minHeight={"100vh"} w={"220px"} justifyContent={"space-between"} alignItems={"stretch"} flexShrink={0} display={{base: "none", lg: "block"}}>
                <Box>
                    <Box textAlign={"center"} fontSize={"1.2rem"} textTransform={"uppercase"} fontWeight={"bold"} height={"4rem"} lineHeight={"4rem"}>
                        Micro-tontine
                    </Box>
                    <List>
                        <NavLink label="Tableau de bord" href="/" icon={MdDashboard} active={false} />
                        <NavLink label="Souscriptions" href="/souscriptions" icon={MdAccountBalance} active={false} />
                        <NavLink label="Prêts" href="/prets" icon={MdHandshake} active={false}/>
                        <NavLink label="Épargne" href="/epargne" icon={MdSavings} />
                        <NavLink label="Membres" href="/membres" icon={MdGroups} />
                        <NavLink label="Paramètres" href="#" icon={MdSettings} />
                    </List>
                </Box>
            </VStack>
            <Box display={{ base: 'block', lg: 'none' }}>
                <MdDehaze onClick={onOpen} />
            </Box>

            <Drawer
                isOpen={isOpen}
                placement='left'
                onClose={onClose}
                finalFocusRef={btnRef}
                display={{ base: 'none', md: 'block' }}
            >
                <DrawerContent>
                    <DrawerCloseButton />
                    <VStack bg={"#f4f4f4"} minHeight={"100vh"} w={"220px"} justifyContent={"space-between"} alignItems={"stretch"} flexShrink={0}>
                        <Box>
                            <DrawerHeader textAlign={"center"} fontSize={"1.2rem"} textTransform={"uppercase"} fontWeight={"bold"} height={"4rem"} lineHeight={"4rem"}>
                                Micro-tontine
                            </DrawerHeader>
                            <DrawerBody>
                                <List>
                                    <NavLink label="Tableau de bord" href="/" icon={MdDashboard} active={false} />
                                    <NavLink label="Souscriptions" href="/souscriptions" icon={MdAccountBalance} active={false} />
                                    <NavLink label="Prêts" href="/prets" icon={MdHandshake} active={false}/>
                                    <NavLink label="Épargne" href="#" icon={MdSavings} />
                                    <NavLink label="Membres" href="/membres" icon={MdGroups} />
                                    <NavLink label="Paramètres" href="#" icon={MdSettings} />
                                    <NavLink label="Déconnexion" href="#" icon={MdLogout} />
                                </List>
                            </DrawerBody>
                        </Box>
                        <DrawerFooter>
                            <HStack padding={".5em 1em"} justifyContent={"space-between"} borderTop={"1px solid #d1d1d1"}>
                                <Box>Member Name</Box>
                                <MdMoreHoriz />
                            </HStack>
                        </DrawerFooter>
                    </VStack>
                </DrawerContent>
            </Drawer>
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
                { label }
            </Link>
        </ListItem>
    )
}
