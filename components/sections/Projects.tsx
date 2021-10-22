import { Stack } from '@chakra-ui/layout'
import { Button, Heading, Text, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { FaGithub } from 'react-icons/fa'
import Audex from './Audex'
import Locorum from './Locorum'

const Projects = () => {
    const bg = useColorModeValue('gray.50', 'gray.900')

    return (
        <Stack
            id="Projects"
            pt={10}
            px={[2, 10, 10, 20]}
            minHeight="75vh"
            background={bg}
            alignItems="center"
            zIndex={1}
            style={{ marginTop: 0 }}
        >
            <Audex />
            <Locorum />
            <Stack
                py={24}
                maxW="4xl"
                spacing={5}
                alignItems="center"
                textAlign="center"
            >
                <Heading size="lg">Other projects</Heading>
                <Text fontWeight={200}>
                    Other projects can be found on my Github profile.
                </Text>
                <Button
                    colorScheme="blackAlpha"
                    color="white"
                    leftIcon={<FaGithub />}
                >
                    Github
                </Button>
            </Stack>
        </Stack>
    )
}

export default Projects
