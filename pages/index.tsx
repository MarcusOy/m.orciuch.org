import { Heading, Stack, Text } from '@chakra-ui/layout'
import type { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import BokehBackground from '../components/BokehBackground'
import Navigation from '../components/Navigation'
import About from '../components/sections/About'
import Hero from '../components/sections/Hero'

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
                <Stack>
                    <Hero />
                    <About />
                    <Stack
                        height="75vh"
                        background="gray.100"
                        alignItems="center"
                    >
                        <Heading>
                            Welcome to <a href="https://nextjs.org">Next.js!</a>
                        </Heading>

                        <Text>
                            Get started by editing <code>pages/index.js</code>
                        </Text>
                    </Stack>
                </Stack>
            </Stack>

            {/* <div className={styles.container}>
                <main className={styles.main}>

                    <div className={styles.hero}>
                        <h1 className={styles.title}>
                            Welcome to <a href="https://nextjs.org">Next.js!</a>
                        </h1>

                        <p className={styles.description}>
                            Get started by editing{' '}
                            <code className={styles.code}>pages/index.js</code>
                        </p>
                    </div>

                    <div className={styles.grid}>
                        <a
                            href="https://nextjs.org/docs"
                            className={styles.card}
                        >
                            <h2>Documentation &rarr;</h2>
                            <p>
                                Find in-depth information about Next.js features
                                and API.
                            </p>
                        </a>

                        <a
                            href="https://nextjs.org/learn"
                            className={styles.card}
                        >
                            <h2>Learn &rarr;</h2>
                            <p>
                                Learn about Next.js in an interactive course
                                with quizzes!
                            </p>
                        </a>

                        <a
                            href="https://github.com/vercel/next.js/tree/master/examples"
                            className={styles.card}
                        >
                            <h2>Examples &rarr;</h2>
                            <p>
                                Discover and deploy boilerplate example Next.js
                                projects.
                            </p>
                        </a>

                        <a
                            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                            className={styles.card}
                        >
                            <h2>Deploy &rarr;</h2>
                            <p>
                                Instantly deploy your Next.js site to a public
                                URL with Vercel.
                            </p>
                        </a>
                    </div>
                    <div className={styles.grid}>
                        <a
                            href="https://nextjs.org/docs"
                            className={styles.card}
                        >
                            <h2>Documentation &rarr;</h2>
                            <p>
                                Find in-depth information about Next.js features
                                and API.
                            </p>
                        </a>

                        <a
                            href="https://nextjs.org/learn"
                            className={styles.card}
                        >
                            <h2>Learn &rarr;</h2>
                            <p>
                                Learn about Next.js in an interactive course
                                with quizzes!
                            </p>
                        </a>

                        <a
                            href="https://github.com/vercel/next.js/tree/master/examples"
                            className={styles.card}
                        >
                            <h2>Examples &rarr;</h2>
                            <p>
                                Discover and deploy boilerplate example Next.js
                                projects.
                            </p>
                        </a>

                        <a
                            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                            className={styles.card}
                        >
                            <h2>Deploy &rarr;</h2>
                            <p>
                                Instantly deploy your Next.js site to a public
                                URL with Vercel.
                            </p>
                        </a>
                    </div>
                </main>

                <footer className={styles.footer}>
                    <a
                        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Powered by{' '}
                        <span className={styles.logo}>
                            <Image
                                src="/vercel.svg"
                                alt="Vercel Logo"
                                width={72}
                                height={16}
                            />
                        </span>
                    </a>
                </footer>
            </div> */}
        </>
    )
}

export default Home
