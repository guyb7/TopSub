export default context => ({
  subject: `Hello ${context.name}!`,
  text: `Testing Mailgun! ${context.name}, ${context.text} :)`
})
