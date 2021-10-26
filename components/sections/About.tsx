import {
    Box,
    Heading,
    HStack,
    Stack,
    Text,
    Wrap,
    WrapItem,
} from '@chakra-ui/layout'
import { Button, Image as Img, useColorModeValue } from '@chakra-ui/react'
import { ThemeTypings } from '@chakra-ui/styled-system'
import { Tag } from '@chakra-ui/tag'
import Image from 'next/image'
import React from 'react'
import ResumeButton from '../ResumeButton'

const skills = [
    {
        name: <>.NET Core</>,
        image: '/img/tech/dotnet.svg',
    },
    {
        name: (
            <>
                React <br />+ Native
            </>
        ),
        image: '/img/tech/react.svg',
    },
    {
        name: <>NodeJS</>,
        image: '/img/tech/node.svg',
    },
    {
        name: <>Docker</>,
        image: '/img/tech/docker.svg',
    },
]

const moreSkills: {
    name: string
    color: ThemeTypings['colorSchemes']
}[] = [
    {
        name: 'C#',
        color: 'green',
    },
    {
        name: 'Typescript',
        color: 'yellow',
    },
    {
        name: 'HTML/CSS/JS',
        color: 'gray',
    },
    {
        name: 'Python',
        color: 'yellow',
    },
    {
        name: 'Java',
        color: 'orange',
    },
    {
        name: 'Azure',
        color: 'cyan',
    },
    {
        name: 'Electron',
        color: 'facebook',
    },
    {
        name: '.NET Framework',
        color: 'blue',
    },
    {
        name: 'ASP.NET',
        color: 'blue',
    },
    {
        name: 'Entity Framework',
        color: 'blue',
    },
    {
        name: 'Xamarin.Forms',
        color: 'cyan',
    },
    {
        name: 'GraphQL',
        color: 'purple',
    },
    {
        name: 'RabbitMQ',
        color: 'orange',
    },
    {
        name: 'SqlServer',
        color: 'red',
    },
    {
        name: 'MySQL',
        color: 'cyan',
    },
    {
        name: 'JQuery',
        color: 'orange',
    },
]

const About = () => {
    let sDate = new Date('2/1/2018')
    let yoe = new Date().getFullYear() - sDate.getFullYear()

    const bg = useColorModeValue('white', '#1A202C')

    return (
        <Stack
            id="About"
            px={[2, 10, 10, 20]}
            pb={5}
            boxShadow={`0px -50px 50px 35px ${bg}`}
            minHeight="50vh"
            background={bg}
            zIndex={10}
            alignItems="center"
        >
            <Heading width="100%" size="lg">
                <Text fontSize="sm" fontWeight={200}>
                    In a nutshell
                </Text>
                About me
            </Heading>
            <HStack
                mt={10}
                flexDir={['column-reverse', 'column-reverse', 'row', 'row']}
                maxW="2xl"
                padding={[5, 5, 0, 0]}
                spacing={[0, 0, 10, 10]}
            >
                <Stack
                    pt="5"
                    alignItems="center"
                    width={['100%', '100%', 'unset', 'unset']}
                >
                    <Stack
                        flexDir={['row', 'row', 'column']}
                        alignItems="center"
                        justifyContent="center"
                        width={['100%', '100%', 'unset', 'unset']}
                        p="6"
                        borderWidth="1px"
                        borderRadius="lg"
                    >
                        <Heading pr={[5, 5, 0]} color="#2196F2">
                            {yoe}+
                        </Heading>
                        <Text size="sm">
                            years of <br />
                            professional
                            <br /> experience
                        </Text>
                    </Stack>
                    <ResumeButton />
                </Stack>
                <Stack>
                    <Text>
                        I've worked as a software engineer utilizing many
                        technologies:
                    </Text>
                    <Wrap>
                        {skills.map((s, i) => {
                            return (
                                <WrapItem key={i}>
                                    <Stack
                                        className="hov-scale-min"
                                        alignItems="center"
                                        justifyContent="center"
                                        // width="110px"
                                        width={['140px', '110px']}
                                        height="140px"
                                        p="6"
                                        borderWidth="1px"
                                        borderRadius="lg"
                                    >
                                        <Image
                                            src={s.image}
                                            height={50}
                                            width={50}
                                        />
                                        <Text textAlign="center" fontSize="xs">
                                            {s.name}
                                        </Text>
                                    </Stack>
                                </WrapItem>
                            )
                        })}
                    </Wrap>
                    <Wrap spacing={2}>
                        {moreSkills.map((s, i) => {
                            return (
                                <Tag
                                    className="hov-scale-min"
                                    colorScheme={s.color}
                                    key={i}
                                >
                                    {s.name}
                                </Tag>
                            )
                        })}
                    </Wrap>
                </Stack>
            </HStack>
        </Stack>
    )
}

export default About
