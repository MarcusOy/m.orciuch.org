import React from 'react'
import TextLoop from 'react-text-loop'
import { Box, Heading, Stack, Text } from '@chakra-ui/layout'
import {
    FaGithub,
    FaInstagram,
    FaYoutube,
    FaDribbble,
    FaLinkedin,
} from 'react-icons/fa'
import { HStack } from '@chakra-ui/react'

const smIcons = [FaGithub, FaLinkedin, FaInstagram, FaYoutube, FaDribbble]
const smLinks = [
    'https://github.com/MarcusOy',
    'https://www.linkedin.com/in/marcus-orciuch-507215132/',
    'https://www.instagram.com/m.orciuch/',
    'https://www.youtube.com/channel/UC1mbZlDmGkDjvNkf00aJlnw',
    'https://dribbble.com/MarcusOy',
]

const Hero = () => {
    return (
        <Stack
            id="#"
            height="65vh"
            px={[2, 10, 20, 50]}
            alignItems="center"
            textAlign="center"
        >
            <HStack mt="14">
                {smIcons.map((IconComponent, i) => (
                    <div key={i}>
                        <IconComponent
                            className="feature-icon hov-scale-min"
                            style={{
                                fontSize: 20,
                                marginRight: 30,
                                cursor: 'pointer',
                            }}
                            onClick={() => {
                                window.open(smLinks[i])
                            }}
                        />
                    </div>
                ))}
            </HStack>
            {/* Desktop friendly version */}
            <Box display={['none', 'none', 'block', 'block']}>
                <Heading size="2xl">
                    👋 Hi, I'm
                    <span style={{ color: '#2196F2' }}> Marcus Orciuch</span>,
                </Heading>
                <Heading size="2xl">
                    a{' '}
                    <TextLoop
                        delay={1000}
                        springConfig={{ stiffness: 180, damping: 8 }}
                    >
                        <span>Software Engineer</span>
                        <span>Videographer</span>
                        <span>Designer</span>
                        <span>Cybersecurity Student</span>
                    </TextLoop>
                    .
                </Heading>
            </Box>
            {/* Mobile friendly version */}
            <Box display={['block', 'block', 'none', 'none']}>
                <Heading size="2xl">
                    👋 Hi, I'm
                    <span style={{ color: '#2196F2' }}> Marcus Orciuch</span>,
                </Heading>
                <Heading size="2xl">
                    <TextLoop
                        delay={1000}
                        springConfig={{ stiffness: 180, damping: 8 }}
                    >
                        <span>
                            a Software
                            <br /> Engineer.
                        </span>
                        <span>a Videographer.</span>
                        <span>a Designer.</span>
                        <span>
                            a Cybersecurity
                            <br /> Student.
                        </span>
                    </TextLoop>
                </Heading>
            </Box>
        </Stack>
    )
}

export default Hero
