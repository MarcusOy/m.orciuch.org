import { ChevronDownIcon } from '@chakra-ui/icons'
import {
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
import React, { createRef, useState } from 'react'
import { BeatLoader } from 'react-spinners'

const ContactButton = () => {
    let [wantPhoneNumber, setWantPhoneNumber] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [data, setData] = useState<string>('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string>('')
    const toast = useToast()

    const reset = () => {
        setData('')
        setLoading(false)
        setError('')
        onClose()
    }

    const handleInfoClick = () => {
        navigator.clipboard.writeText(data).then(() => {
            toast({
                title: 'Info copied',
                description: 'Info copied to clipboard',
                status: 'success',
                duration: 3000,
            })
        })
    }

    const recaptchaRef = createRef<ReCAPTCHA>()
    const onReCAPTCHAChange = (captchaCode: string | null) => {
        if (!captchaCode) {
            return
        }

        setLoading(true)
        fetch('/api/info', {
            method: 'POST',
            body: JSON.stringify({
                type: wantPhoneNumber ? 'phone' : 'email',
                captcha: captchaCode,
            }),
        })
            .then((d) => {
                d.text().then((t) => {
                    setLoading(false)
                    setData(t)
                })
            })
            .catch((e) => {
                setError(e)
            })

        // alert(`captcha triggered`)
        recaptchaRef!.current!.reset()
    }

    const handleEmailRequest = () => {
        setWantPhoneNumber(false)
        onOpen()
    }

    const handlePhoneRequest = () => {
        setWantPhoneNumber(true)
        onOpen()
    }

    const handleIGRequest = () => {
        window.open('https://www.instagram.com/m.orciuch/', '_blank')
    }
    const handleLIRequest = () => {
        window.open(
            'https://www.linkedin.com/in/marcus-orciuch-507215132/',
            '_blank'
        )
    }

    let title = wantPhoneNumber
        ? "Marcus's Phone Number"
        : "Marcus's Email Address"

    return (
        <Menu>
            <MenuButton
                as={Button}
                className="smart-shadow"
                boxShadow="0px 16px 24px -2px rgba(33, 150, 242, 0.4)"
                maxWidth="36"
                // onClick={() => (window.location.hash = 'Contact')}
                colorScheme="blue"
                variant="solid"
                rightIcon={<ChevronDownIcon />}
            >
                Contact
            </MenuButton>
            <MenuList>
                <MenuItem onClick={handleEmailRequest}>
                    Send me an Email
                </MenuItem>
                <MenuItem onClick={handlePhoneRequest}>
                    Shoot me a text
                </MenuItem>
                <MenuItem onClick={handleIGRequest}>
                    DM me on Instagram
                </MenuItem>
                <MenuItem onClick={handleLIRequest}>
                    Connect with me on LinkedIn
                </MenuItem>
            </MenuList>

            <Modal isOpen={isOpen} onClose={reset} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{title}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb="5">
                        {data != '' && (
                            <Box
                                onClick={handleInfoClick}
                                cursor="pointer"
                                alignItems="center"
                                justifyContent="center"
                                p="6"
                                borderWidth="1px"
                                borderRadius="lg"
                            >
                                {data}
                            </Box>
                        )}
                        {loading && (
                            <Stack alignItems="center" justifyContent="center">
                                <BeatLoader size={8} color="white" />
                            </Stack>
                        )}
                        <Box hidden={data != '' || loading || error != ''}>
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
        </Menu>
    )
}

export default ContactButton
