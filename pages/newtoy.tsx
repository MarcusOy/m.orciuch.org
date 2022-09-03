import { Heading, Stack, Text } from '@chakra-ui/layout'
import { Box, ColorModeScript } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import React, { Suspense, useEffect, useRef } from 'react'
import BokehBackground from '../components/BokehBackground'
import Navigation from '../components/Navigation'
import About from '../components/sections/About'
import Blog from '../components/sections/Blog'
import Contact from '../components/sections/Contact'
import Footer from '../components/sections/Footer'
import Hero from '../components/sections/Hero'
import Projects from '../components/sections/Projects'
import ReactGA from 'react-ga'
import { Canvas, useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
// import Script from 'next/script'

// Makes sure that HeroToy is not SSR-ed
import dynamic from 'next/dynamic'
const HeroToy = dynamic(() => import('../components/HeroToy'), {
    ssr: false,
})

const NewToy: NextPage = () => {
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
            <Box position="relative" zIndex="10" h="100vh" w="100vw">
                <HeroToy/>
            </Box>
        </>
    )
}

export default NewToy
