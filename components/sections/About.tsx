import {
    Box,
    Heading,
    HStack,
    Stack,
    Text,
    Wrap,
    WrapItem,
} from '@chakra-ui/layout'
import { Button, Image as Img } from '@chakra-ui/react'
import { ThemeTypings } from '@chakra-ui/styled-system'
import { Tag } from '@chakra-ui/tag'
import Image from 'next/image'
import React from 'react'

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

    return (
        <Stack
            id="About"
            // px={[2, 10, 24, 48]}a
            boxShadow="0px -50px 50px 35px white"
            height="75vh"
            background="white"
            alignItems="center"
            zIndex={1}
        >
            <HStack
                mt={10}
                flexDir={['column', 'column', 'row', 'row']}
                maxW="2xl"
                padding={[5, 5, 0, 0]}
                spacing={[0, 0, 10, 10]}
            >
                <Stack
                    // width={['100%', null, null, null]}
                    alignItems="center"
                >
                    <Stack
                        flexDir={['row', 'row', 'column']}
                        alignItems="center"
                        // width={['100%', '100%', null, null]}
                        p="6"
                        borderWidth="1px"
                        borderRadius="lg"
                    >
                        <Heading color="#2196F2">{yoe}+</Heading>
                        <Text size="sm">
                            years of <br />
                            professional
                            <br /> experience
                        </Text>
                    </Stack>

                    {/* <Img
                        src="/img/pfp.jpg"
                        borderRadius="32"
                        maxW="32"
                        maxH="32"
                    /> */}
                    <Button width="100%" variant="outline">
                        Resume
                    </Button>
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
                                        width="110px"
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
