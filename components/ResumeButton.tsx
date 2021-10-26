import { ChevronDownIcon } from '@chakra-ui/icons'
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogCloseButton,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Box,
    Button,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Stack,
    useDisclosure,
    useToast,
} from '@chakra-ui/react'
import ReCAPTCHA from 'react-google-recaptcha'
import React, { createRef, useEffect, useState } from 'react'
import { BeatLoader } from 'react-spinners'
import { downloadFile } from '../helpers/DownloadHelper'
import ReactGA from 'react-ga'

const ResumeButton = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [loading, setLoading] = useState(false)
    const toast = useToast()

    const recaptchaRef = createRef<ReCAPTCHA>()
    const onReCAPTCHAChange = (captchaCode: string | null) => {
        if (!captchaCode) {
            return
        }

        setLoading(true)
        fetch('/api/info', {
            method: 'POST',
            body: JSON.stringify({
                type: 'resume',
                captcha: captchaCode,
            }),
        })
            .then((res) => {
                setLoading(false)
                onClose()
                if (res.status == 200) {
                    downloadFile(res)
                    toast({
                        title: 'Resume downloading...',
                        description:
                            'Your browser is now downloading my resume',
                        status: 'success',
                        duration: 3000,
                    })
                    ReactGA.event({
                        category: 'Info Request',
                        action: "Marcus's Resume",
                    })
                    return
                }
                throw new Error('Something bad happened')
            })
            .catch(() => {
                setLoading(false)
                onClose()
                toast({
                    title: 'Something went wrong',
                    description: 'Cannot retrieve my resume at this time',
                    status: 'error',
                    duration: 3000,
                })
            })

        recaptchaRef!.current!.reset()
    }

    return (
        <>
            <Button
                colorScheme="blue"
                onClick={onOpen}
                width="100%"
                variant="outline"
            >
                Resume
            </Button>

            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Marcus's Resume</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb="5">
                        {loading && (
                            <Stack alignItems="center" justifyContent="center">
                                <BeatLoader size={8} color="white" />
                            </Stack>
                        )}
                        <Box hidden={loading}>
                            <ReCAPTCHA
                                ref={recaptchaRef}
                                size="normal"
                                theme="dark"
                                sitekey={
                                    process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!
                                }
                                onChange={onReCAPTCHAChange}
                            />
                        </Box>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ResumeButton
