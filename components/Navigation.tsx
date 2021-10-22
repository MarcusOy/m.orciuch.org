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
    DrawerHeader,
    DrawerOverlay,
    Heading,
    HStack,
    IconButton,
    Link,
    useColorMode,
    useDisclosure,
} from '@chakra-ui/react'
import React from 'react'
import ContactButton from './ContactButton'

const Navigation = () => {
    const { colorMode, toggleColorMode } = useColorMode()

    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef(null)

    let links = (
        <>
            <Link href="#">Home</Link>
            <Link href="#About">About</Link>
            <Link href="#Projects">Projects</Link>
            <Link href="https://blog.m.orciuch.org" isExternal>
                Blog
                <ExternalLinkIcon mx="2px" />
            </Link>
            <ContactButton />
        </>
    )

    return (
        <HStack fontWeight="400" as="nav" zIndex={100} p={5}>
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

                    {/* <DrawerFooter>
                        <Button variant="outline" mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button colorScheme="blue">Save</Button>
                    </DrawerFooter> */}
                </DrawerContent>
            </Drawer>
        </HStack>
    )
}

export default Navigation
