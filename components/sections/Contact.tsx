import { Heading, Stack, Text } from '@chakra-ui/layout'
import { useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import ContactButton from '../ContactButton'

const Contact = () => {
    return (
        <Stack
            id="Blog"
            pt={48}
            minHeight="50vh"
            // zIndex={1}
            px={[2, 10, 10, 36]}
        >
            <Heading width={['100%', '100%', '2xl']} size="lg">
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
