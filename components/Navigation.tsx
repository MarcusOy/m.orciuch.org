import { ExternalLinkIcon, HamburgerIcon } from '@chakra-ui/icons'
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
    useDisclosure,
} from '@chakra-ui/react'
import React, { useState } from 'react'

const Navigation = () => {
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
            <Button
                className="smart-shadow"
                boxShadow="0px 16px 24px -2px rgba(33, 150, 242, 0.4)"
                onClick={() => (window.location.hash = 'Contact')}
                colorScheme="blue"
                variant="solid"
            >
                Contact
            </Button>
        </>
    )

    return (
        <HStack fontWeight="400" as="nav" p={5}>
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
