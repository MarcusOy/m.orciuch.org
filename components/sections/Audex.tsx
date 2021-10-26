import { ArrowForwardIcon } from '@chakra-ui/icons'
import { Heading, HStack, Stack, Text, Wrap } from '@chakra-ui/layout'
import { Button, useColorModeValue } from '@chakra-ui/react'
import { ThemeTypings } from '@chakra-ui/styled-system'
import { Tag } from '@chakra-ui/tag'
import React from 'react'
import { FaLock, FaServer, FaStopwatch } from 'react-icons/fa'

const audexDetails = [
    {
        primary: 'Fast file sharing',
        secondary:
            'Share files between your devices and beyond faster than ever',
        icon: <FaStopwatch color="#2196F2" fontSize={32} />,
    },
    {
        primary: 'Own your files',
        secondary:
            'Host your own instance on your hardware to ensure compliance and peace of mind',
        icon: <FaServer color="#2196F2" fontSize={32} />,
    },
    {
        primary: 'End to end encryption',
        secondary:
            'Transmitted files are encrypted using RSA and cannot be viewed by the server owner',
        icon: <FaLock color="#2196F2" fontSize={32} />,
    },
]

const audexTechs: {
    name: string
    color: ThemeTypings['colorSchemes']
}[] = [
    {
        name: 'React',
        color: 'facebook',
    },
    {
        name: 'Electron',
        color: 'facebook',
    },
    {
        name: '.NET Core',
        color: 'blue',
    },
    {
        name: 'Entity Framework',
        color: 'blue',
    },
    {
        name: 'Apollo Client',
        color: 'purple',
    },
    {
        name: 'Hotchocolate GraphQL',
        color: 'purple',
    },
]

const Audex = () => {
    const elementBg = useColorModeValue('white', 'gray.800')

    return (
        <HStack flexDir={['column', 'column', 'row']} maxW="4xl" spacing={10}>
            <img src="https://via.placeholder.com/400x500?text=Audex+Animation+Here" />
            <Stack spacing={5}>
                <Heading size="lg">
                    <Text fontSize="sm" fontWeight={200}>
                        Project
                    </Text>
                    Audex - Own your sharing
                </Heading>
                {audexDetails.map((d, i) => {
                    return (
                        <HStack key={i} spacing={5}>
                            <Stack
                                minW={16}
                                minH={16}
                                borderRadius={64}
                                alignItems="center"
                                justifyContent="center"
                                bg={elementBg}
                                boxShadow="rgba(0, 0, 0, 0.45) 0px 25px 20px -20px;"
                            >
                                {d.icon}
                            </Stack>
                            <Stack spacing={0}>
                                <Text>{d.primary}</Text>
                                <Text mt={0} fontWeight={200}>
                                    {d.secondary}
                                </Text>
                            </Stack>
                        </HStack>
                    )
                })}
                <Wrap spacing={2}>
                    {audexTechs.map((t, i) => {
                        return (
                            <Tag
                                className="hov-scale-min"
                                colorScheme={t.color}
                                key={i}
                            >
                                {t.name}
                            </Tag>
                        )
                    })}
                </Wrap>
                <Button
                    onClick={() => {
                        window.open(
                            'https://github.com/MarcusOy/Audex',
                            '_blank'
                        )
                    }}
                    rightIcon={<ArrowForwardIcon />}
                    colorScheme="teal"
                    variant="outline"
                >
                    View project
                </Button>
            </Stack>
        </HStack>
    )
}

export default Audex
