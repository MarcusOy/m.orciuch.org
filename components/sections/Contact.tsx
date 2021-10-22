import { Heading, Stack, Text } from '@chakra-ui/layout'
import { useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import ContactButton from '../ContactButton'

const Contact = () => {
    // const bg = useColorModeValue('white', '#1A202C')

    return (
        <Stack
            id="Blog"
            pt={48}
            minHeight="50vh"
            // zIndex={1}
            px={[5, 5, 36, 36]}
        >
            <Heading size="lg">
                <Text fontSize="sm" fontWeight={200}>
                    Need something?
                </Text>
                Feel free to contact me!
            </Heading>
            <ContactButton />
        </Stack>
    )
}

export default Contact
