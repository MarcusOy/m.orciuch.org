import { Box, Heading, Stack, Text } from '@chakra-ui/layout'
import { useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import ContactButton from '../ContactButton'

const Contact = () => {
    return (
        <Stack id="Contact" pt={48} minHeight="50vh" px={[2, 10, 10, 20]}>
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
