import { Heading, Stack, Text } from '@chakra-ui/layout'
import { ColorModeScript } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import BokehBackground from '../components/BokehBackground'
import Navigation from '../components/Navigation'
import About from '../components/sections/About'
import Blog from '../components/sections/Blog'
import Contact from '../components/sections/Contact'
import Footer from '../components/sections/Footer'
import Hero from '../components/sections/Hero'
import Projects from '../components/sections/Projects'
import theme from '../theme'

const Home: NextPage = () => {
    return (
        <>
            <Head>
                <title>Marcus Orciuch - Portfolio</title>
                <meta
                    name="description"
                    content="A portfolio site that showcases Marcus Orciuch's work."
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <BokehBackground />
            <Stack>
                <Navigation />
                <Stack className="content">
                    <Hero />
                    <About />
                    <Projects />
                    <BokehBackground />
                    <Blog />
                    <Contact />
                    <Footer />
                </Stack>
            </Stack>
        </>
    )
}

export default Home
