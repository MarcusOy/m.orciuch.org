import {
    ExternalLinkIcon,
    HamburgerIcon,
    MoonIcon,
    SunIcon,
} from '@chakra-ui/icons'
import {
    Box,
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    Heading,
    HStack,
    IconButton,
    Link,
    useColorMode,
    useColorModeValue,
    useDisclosure,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import ContactButton from './ContactButton'

const Navigation = () => {
    const { colorMode, toggleColorMode } = useColorMode()
    const bg = useColorModeValue('white', '#1A202C')

    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef(null)

    const [scrollY, setScrollY] = useState(0)

    let links = (
        <>
            <Link href="#">Home</Link>
            <Link href="#About">About</Link>
            <Link href="#Projects">Projects</Link>
            <Link href="https://blog.m.orciuch.org" isExternal>
                Blog
                <ExternalLinkIcon mx="2px" />
            </Link>
        </>
    )

    useEffect(() => {
        window.addEventListener('scroll', () => {
            setScrollY(window.scrollY)
        })
    })

    let isSticky = scrollY >= 225
    let nav = (
        <>
            <Heading fontWeight="800" size="md">
                Marcus Orciuch
            </Heading>
            <Box flexGrow={1}></Box>
            <IconButton
                ref={btnRef}
                onClick={onOpen}
                display={['block', 'block', 'none']}
                aria-label="Open menu"
                icon={<HamburgerIcon />}
            />
            <HStack display={['none', 'none', 'block']} spacing="5">
                {links}
                <ContactButton />
            </HStack>
            <IconButton
                onClick={toggleColorMode}
                aria-label="Toggle color mode"
                icon={colorMode == 'light' ? <MoonIcon /> : <SunIcon />}
            />
            <Drawer
                isOpen={isOpen}
                placement="bottom"
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Menu</DrawerHeader>

                    <DrawerBody>
                        <HStack
                            onClick={onClose}
                            flexDir="column"
                            alignItems="flex-end"
                        >
                            {links}
                        </HStack>
                    </DrawerBody>

                    <DrawerFooter>
                        <ContactButton />
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )

    return (
        <>
            {/* Normal nav bar */}
            <HStack
                opacity={isSticky ? 0 : 1}
                fontWeight="400"
                as="nav"
                zIndex={100}
                p={5}
            >
                {nav}
            </HStack>
            {/* Stick nav bar (when scrolling) */}
            <HStack
                position="fixed"
                bg={bg}
                boxShadow={`0px 20px 50px 50px ${bg}`}
                opacity={isSticky ? 1 : 0}
                transform={isSticky ? 'translateY(0px)' : 'translateY(-20px)'}
                transition="all 0.3s"
                fontWeight="400"
                as="nav"
                zIndex={100}
                p={5}
            >
                {nav}
            </HStack>
        </>
    )
}

export default Navigation
