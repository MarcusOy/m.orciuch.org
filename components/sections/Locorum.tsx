import { ArrowForwardIcon } from '@chakra-ui/icons'
import {
    Box,
    Heading,
    HStack,
    Stack,
    Text,
    Wrap,
    WrapItem,
} from '@chakra-ui/layout'
import {
    Alert,
    AlertIcon,
    Button,
    Image as Img,
    SimpleGrid,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Tooltip,
    useColorModeValue,
} from '@chakra-ui/react'
import { ThemeTypings } from '@chakra-ui/styled-system'
import { Tag } from '@chakra-ui/tag'
import Image from 'next/image'
import React from 'react'
import { FaArchive, FaBell, FaPersonBooth, FaStopwatch } from 'react-icons/fa'

const locorumDetails = [
    {
        primary: 'Real-time election updates',
        secondary:
            'Get notified when results for your favorite candidates and offices change',
        icon: <FaBell color="#2196F2" fontSize={32} />,
    },
    {
        primary: 'Explore candidates',
        secondary: 'Easily know who to vote for before going to the polls',
        icon: <FaPersonBooth color="#2196F2" fontSize={32} />,
    },
    {
        primary: 'View past elections',
        secondary: 'View and download past election data',
        icon: <FaArchive color="#2196F2" fontSize={32} />,
    },
    {
        primary: 'No registration needed',
        secondary:
            'Browse and observe elections without personal information being tracked',
        icon: <FaStopwatch color="#2196F2" fontSize={32} />,
    },
]

const locorumTechs: {
    name: string
    color: ThemeTypings['colorSchemes']
}[][] = [
    [
        {
            name: 'Xamarin.Forms',
            color: 'cyan',
        },
        {
            name: 'ASP.NET',
            color: 'blue',
        },
        {
            name: 'SqlServer',
            color: 'red',
        },
    ],
    [
        {
            name: 'Xamarin.Forms',
            color: 'cyan',
        },
        {
            name: 'ASP.NET',
            color: 'blue',
        },
        {
            name: 'Serenity.is',
            color: 'blue',
        },
        {
            name: 'SqlServer',
            color: 'red',
        },
    ],
    [
        {
            name: 'React',
            color: 'facebook',
        },
        {
            name: 'React Native',
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
        {
            name: 'RabbitMQ',
            color: 'orange',
        },
        {
            name: 'MySQL',
            color: 'cyan',
        },
    ],
]

const Locorum = () => {
    const elementBg = useColorModeValue('white', 'gray.800')

    return (
        <Stack pt={24} maxW="4xl" spacing={5}>
            <Heading size="lg">
                <Text fontSize="sm" fontWeight={200}>
                    Project
                </Text>
                Locorum - Be a better citizen
            </Heading>
            <Alert status="warning">
                <AlertIcon />
                Project temporarily suspended
            </Alert>
            <Tabs defaultIndex={2}>
                <TabPanels>
                    <TabPanel>
                        <img src="https://via.placeholder.com/800x300?text=Locorum+Screenshots+Here" />
                        <Wrap pt={2} spacing={2}>
                            {locorumTechs[0].map((t, i) => {
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
                    </TabPanel>
                    <TabPanel>
                        <img src="https://via.placeholder.com/800x300?text=Locorum+Screenshots+Here/111" />
                        <Wrap pt={2} spacing={2}>
                            {locorumTechs[1].map((t, i) => {
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
                    </TabPanel>
                    <TabPanel>
                        <img src="https://via.placeholder.com/800x300?text=Locorum+Screenshots+Here/777" />
                        <Wrap pt={2} spacing={2}>
                            {locorumTechs[2].map((t, i) => {
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
                    </TabPanel>
                </TabPanels>
                <TabList>
                    <Tab>v1</Tab>
                    <Tab>v2</Tab>
                    <Tab>Phoenix</Tab>
                </TabList>
            </Tabs>
            <SimpleGrid columns={[1, 1, 2]} spacing={5}>
                {locorumDetails.map((d, i) => {
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
            </SimpleGrid>
        </Stack>
    )
}

export default Locorum
