import { Heading, Stack, Text } from '@chakra-ui/layout'
import { useColorModeValue } from '@chakra-ui/react'
import React from 'react'

const Footer = () => {
    // const bg = useColorModeValue('white', '#1A202C')

    return (
        <Stack
            py={5}
            bg="#2196F2"
            color="white"
            px={[5, 5, 36, 36]}
            alignItems="center"
            justifyContent="center"
        >
            <Text>
                Copyright &copy; 2021 Marcus Orciuch. All rights reserved.
            </Text>
        </Stack>
    )
}

export default Footer
