export default context => ({
  subject: `Reset your TopSub password`,
  text: `Click here to change your email: /reset?emailToken=${context.emailToken}`
})
