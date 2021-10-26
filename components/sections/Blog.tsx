import { Heading, HStack, Stack, Text } from '@chakra-ui/layout'
import { Box, useColorModeValue, Image } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import GhostContentAPI from '@tryghost/content-api'
import { FaSpinner } from 'react-icons/fa'
import { BeatLoader } from 'react-spinners'

interface IBlogArticle {
    uuid: string
    title: string
    author: {
        name: string
        image: string
        url: string
    }
    image: string
    tag: string
    url: string
    date: string
    readingTime: number
}

const BlogArticle = (p: IBlogArticle) => {
    return (
        <Box
            className="hov-scale-min"
            p="6"
            maxW="md"
            borderWidth="1px"
            borderRadius="lg"
            mr={25}
            cursor="pointer"
            onClick={() => {
                window.open(p.url)
            }}
        >
            <Text
                mb={2}
                fontSize={11}
                fontWeight={200}
                letterSpacing={1.05}
                sx={{ textTransform: 'uppercase' }}
            >
                {p.tag}
            </Text>
            <Image
                src={p.image}
                sx={{
                    pointerEvents: 'none',
                }}
            />

            <Text py={2} fontWeight="bold">
                {p.title}
            </Text>
            <Text fontSize={12} color="#E4E4E4">
                {p.date} • {p.readingTime} min{p.readingTime > 1 && 's'} read
            </Text>
        </Box>
    )
}

const Blog = () => {
    const bg = useColorModeValue('white', '#1A202C')

    const [data, setData] = useState<IBlogArticle[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        if (!isLoading) {
            setIsLoading(true)
            fetchData()
        }
    }, [])

    const fetchData = () => {
        const api = new GhostContentAPI({
            url: 'https://blog.m.orciuch.org',
            key: '01235e76f00145c42aa41c69e6',
            version: 'v3',
        })
        api.posts
            .browse({ limit: 3, include: ['tags', 'authors'] })
            .then((posts: any) => {
                let articles: IBlogArticle[] = (posts as Array<any>).map(
                    (p) => {
                        return {
                            uuid: p.uuid,
                            title: p.title,
                            author: {
                                name: p.primary_author.name,
                                image: p.primary_author.profile_image,
                                url: p.primary_author.url,
                            },
                            image: p.feature_image,
                            tag: p.primary_tag.name,
                            url: p.url,
                            date: new Date(p.created_at).toLocaleDateString(),
                            readingTime: p.reading_time,
                        }
                    }
                )
                setData(articles.splice(0, 3))
                setIsLoading(false)
            })
            .catch((err) => {
                console.group(err)
                setError(err.message)
            })
    }

    let content

    if (isLoading)
        content = (
            <Stack alignItems="center" justifyContent="center">
                <BeatLoader size={8} color="white" />
            </Stack>
        )
    if (error != '')
        content = <Text>An error occured retrieving blog posts: {error}</Text>

    content = data.map((b, i) => {
        return <BlogArticle key={i} {...b} />
    })

    return (
        <Stack
            id="Blog"
            pt={16}
            boxShadow={`0px 50px 50px 35px ${bg}`}
            minHeight="50vh"
            background={bg}
            zIndex={1}
            px={[2, 10, 10, 36]}
            style={{ marginTop: 0 }}
        >
            <Heading width={['100%', '100%', '2xl']} size="lg">
                <Text fontSize="sm" fontWeight={200}>
                    From the blog
                </Text>
                Latest posts
            </Heading>
            <HStack>{content}</HStack>
        </Stack>
    )
}

export default Blog
