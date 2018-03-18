import Mailgun from 'mailgun-js'

const api_key = process.env.RAZZLE_MAILGUN_KEY
const domain = process.env.RAZZLE_MAILGUN_DOMAIN

const mailgun = Mailgun({
  apiKey: api_key,
  domain: domain
})

const templates = {
  basic: context => ({
    subject: `Hello ${context.name}!`,
    text: `Testing Mailgun! ${context.name}, ${context.text} :)`
  }),
  register: context => ({
    subject: `Welcome to TopSub!`,
    text: `Click here to verify your email: /verify?emailToken=${context.emailToken}`
  }),
  'reset-password': context => ({
    subject: `Reset your TopSub password`,
    text: `Click here to change your email: /reset?emailToken=${context.emailToken}`
  })
}

const send = ({ template, to, context }) => {
  const data = {
    from: 'Mailgun Sandbox <postmaster@sandbox608e7943283b44b68992a618476f81c3.mailgun.org>',
    to,
    ...(templates[template](context))
  }

  console.log(data)
  // mailgun.messages().send(data, (error, body) => {
  //   console.log('email response', body)
  // })
}

export default {
  send
}