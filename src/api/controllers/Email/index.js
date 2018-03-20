import Mailgun from 'mailgun-js'

import BasicTemplate from './Templates/Basic'
import RegisterTemplate from './Templates/Register'
import ResetPasswordTemplate from './Templates/ResetPassword'

import { isProd } from '../../../components/Utils'

const api_key = process.env.RAZZLE_MAILGUN_KEY
const domain = process.env.RAZZLE_MAILGUN_DOMAIN

const mailgun = Mailgun({
  apiKey: api_key,
  domain: domain
})

const templates = {
  'basic': BasicTemplate,
  'register': RegisterTemplate,
  'reset-password': ResetPasswordTemplate
}

const send = ({ template, to, context }) => {
  if (typeof templates[template] === 'undefined') {
    throw new Error('no-such-template')
  }

  if (isProd) {
    const data = {
      from: 'Mailgun Sandbox <postmaster@sandbox608e7943283b44b68992a618476f81c3.mailgun.org>',
      to,
      ...(templates[template](context))
    }
    mailgun.messages().send(data, (error, body) => {
      console.log('Email result', body)
    })
  } else {
    console.log('[Email]', template, context)
    console.log(templates[template](context).html)
  }
}

const preview = req => {
  const template = req.query.template
  const context = { ...req.query }
  const data = templates[template](context)
  return data.html
}

export default {
  send,
  preview
}
