import { Heading, Stack, Text } from '@chakra-ui/layout'
import { useColorModeValue } from '@chakra-ui/react'
import React from 'react'

const Footer = () => {
    // const bg = useColorModeValue('white', '#1A202C')

    return (
        <Stack
            id="Blog"
            pt={10}
            minHeight="25vh"
            bg="#2196F2"
            color="white"
            px={[5, 5, 36, 36]}
        >
            <Heading size="lg">Marcus Orciuch</Heading>
        </Stack>
    )
}

export default Footer
