import Juice from 'juice'

import css from '../css'

const ROOT_URL = process.env.RAZZLE_ROOT_URL

const html = context => `
<!doctype html>
<html>
  <head>
    <meta name="viewport" content="width=device-width" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>Welcome to TopSub!</title>
  </head>
  <body class="">
    <table border="0" cellpadding="0" cellspacing="0" class="body">
      <tr>
        <td>&nbsp;</td>
        <td class="container">
          <div class="content">

            <!-- START CENTERED WHITE CONTAINER -->
            <span class="preheader">This is preheader text. Some clients will show this text as a preview.</span>
            <table class="main">

              <!-- START MAIN CONTENT AREA -->
              <tr>
                <td class="wrapper">
                  <table border="0" cellpadding="0" cellspacing="0">
                    <tr>
                      <td>
                        <p>Hi ${context.name},</p>
                        <p>Click here to verify your email:</p>
                        <table border="0" cellpadding="0" cellspacing="0" class="btn btn-primary">
                          <tbody>
                            <tr>
                              <td align="left">
                                <table border="0" cellpadding="0" cellspacing="0">
                                  <tbody>
                                    <tr>
                                      <td> <a href="${ROOT_URL}/login?email=${context.email}&emailToken=${context.emailToken}" target="_blank">Activate Account</a> </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <p>If you did not sign up for TopSub, please ignore this email.</p>
                        <p>See you soon!</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

            <!-- END MAIN CONTENT AREA -->
            </table>

            <!-- START FOOTER -->
            <div class="footer">
              <table border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td class="content-block">
                    <span class="apple-link">TopSub Inc, 1 Street Road, San Francisco CA 94123</span>
                    <br>Don't like these emails? <a href="${ROOT_URL}/unsubscribe?email=${context.email}&emailToken=${context.emailToken}">Unsubscribe</a>.
                  </td>
                </tr>
                <tr>
                  <td class="content-block powered-by">
                    Sent from <a href="${ROOT_URL}">TopSub</a>.
                  </td>
                </tr>
              </table>
            </div>
            <!-- END FOOTER -->

          <!-- END CENTERED WHITE CONTAINER -->
          </div>
        </td>
        <td>&nbsp;</td>
      </tr>
    </table>
  </body>
</html>
`

export default context => {
  const finalHtml = Juice.inlineContent(html(context), css)
  return {
    subject: `Welcome to TopSub!`,
    html: finalHtml
  }
}
