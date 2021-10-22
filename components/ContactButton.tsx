import { ChevronDownIcon } from '@chakra-ui/icons'
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogCloseButton,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
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
    useDisclosure,
} from '@chakra-ui/react'
import ReCAPTCHA from 'react-google-recaptcha'
import React, { createRef, useState } from 'react'

const ContactButton = () => {
    let [wantPhoneNumber, setWantPhoneNumber] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()

    const recaptchaRef = createRef<ReCAPTCHA>()
    const onReCAPTCHAChange = (captchaCode: string | null) => {
        if (!captchaCode) {
            return
        }

        alert(`captcha triggered`)
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

            <AlertDialog
                motionPreset="slideInBottom"
                onClose={onClose}
                isOpen={isOpen}
                leastDestructiveRef={undefined}
                isCentered
            >
                <AlertDialogOverlay />

                <AlertDialogContent>
                    <AlertDialogHeader>Discard Changes?</AlertDialogHeader>
                    <AlertDialogCloseButton />
                    <AlertDialogBody>
                        Are you sure you want to discard all of your notes? 44
                        words will be deleted.
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button onClick={onClose}>No</Button>
                        <Button colorScheme="red" ml={3}>
                            Yes
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{title}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                         <ReCAPTCHA
                            ref={recaptchaRef}
                            size="invisible"
                            sitekey={
                                process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!
                            }
                            onChange={onReCAPTCHAChange}
                        /> 
                    </ModalBody>
                </ModalContent>
            </Modal> */}
        </Menu>
    )
}

export default ContactButton
