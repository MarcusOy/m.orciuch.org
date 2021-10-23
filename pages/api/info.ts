// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'
import info from '../../data/info'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { body, method } = req

    // Extract the email and captcha code from the request body
    const { type, captcha } = JSON.parse(body)

    if (method === 'POST') {
        // If email or captcha are missing return an error
        if (!type || !captcha) {
            return res.status(422).json({
                message:
                    'Unproccesable request, please provide the required fields',
            })
        }

        try {
            // Ping the google recaptcha verify API to verify the captcha code you received
            const response = await fetch(
                `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captcha}`,
                {
                    headers: {
                        'Content-Type':
                            'application/x-www-form-urlencoded; charset=utf-8',
                    },
                    method: 'POST',
                }
            )
            const captchaValidation = await response.json()

            if (captchaValidation.success) {
                if (type == 'resume') {
                    const filePath = path.resolve('.', 'resume.pdf')
                    const buffer = fs.readFileSync(filePath)
                    res.setHeader('Content-Type', 'application/pdf')
                    res.setHeader(
                        'Content-disposition',
                        'attachment; filename=Orciuch_Marcus_Resume.pdf'
                    )
                    res.send(buffer)
                    return
                }

                let response = info[type]

                // Return 200 if everything is successful
                return res.status(200).send(response ?? 'Nothing here :/')
            }

            return res.status(422).json({
                message: 'Unproccesable request, Invalid captcha code',
            })
        } catch (error) {
            console.log(error)
            return res.status(422).json({ message: 'Something went wrong' })
        }
    }
    // Return 404 if someone pings the API with a method other than
    // POST
    return res.status(404).send('Invalid REST verb.')
    // res.status(200).send('marcus@orciuch.org')
}
