import React from 'react'
import { withStyles } from 'material-ui/styles'

import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import CheckSvg from 'mdi-svg/svg/check.svg'

import API from '../components/API'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import MdIcon from '../components/MdIcon'

const styles = theme => {
  return {
    root: {
    },
    container: {
      ...theme.utils.container,
      maxWidth: theme.breakpoints.values.sm,
      padding: theme.spacing.double
    },
    title: {
      textAlign: 'center',
      fontWeight: 300,
      paddingTop: theme.spacing.quad,
      paddingBottom: theme.spacing.double
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom: theme.spacing.quad
    },
    textField: {
      width: '100%',
      maxWidth: 300,
      marginBottom: theme.spacing.double
    },
    button: {
      marginTop: theme.spacing.double
    },
    error: {
      color: theme.palette.custom.red,
      marginTop: theme.spacing.double,
      marginBottom: theme.spacing.double
    },
    done: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      '& h3': {
        color: theme.palette.custom.green,
        fontWeight: 500,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '& svg': {
          marginRight: theme.spacing.unit
        }
      },
      '& p': {
        maxWidth: 400,
        textAlign: 'center'
      }
    }
  }
}

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      isLoading: false,
      error: false,
      isDone: false
    }
  }

  onChangeEmail = e => {
    this.setState({
      ...this.state,
      email: e.target.value,
      isLoading: false
    })
  }

  submit = e => {
    e.preventDefault()
    this.setState({
      ...this.state,
      isLoading: true,
      serverError: false
    }, async () => {
      const form = {
        email: this.state.email
      }
      try {
        await API.post('/recover-password', form)
        this.setState({
          ...this.state,
          isLoading: false,
          error: false,
          isDone: true
        })
      } catch (e) {
        const errorMessage = e.message || 'Something went wrong'
        this.setState({
          ...this.state,
          isLoading: false,
          error: errorMessage
        })
      }
    })
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <NavBar withBorder />
        <div className={classes.container}>
          <h3 className={classes.title}>Password Recovery</h3>
          {
            !this.state.isDone === true &&
            <form className={classes.form} onSubmit={this.submit}>
              <TextField
                label="Email"
                type="email"
                className={classes.textField}
                value={this.state.email}
                onChange={this.onChangeEmail}
                disabled={this.state.isLoading}
                />
              {
                this.state.error &&
                <div className={classes.error}>
                  {this.state.error}
                </div>
              }
              <Button
                variant="raised"
                color="primary"
                type="submit"
                className={classes.button}
                onClick={this.submit}
                disabled={this.state.isLoading}
                >
                Send Reset Link
              </Button>
            </form>
          }
          {
            this.state.isDone === true &&
            <div className={classes.done}>
              <h3>
                <MdIcon svg={CheckSvg} />
                Done!
              </h3>
              <p>
                We sent you a password recovery email.<br/>
                Click the link inside it to set a new password.
              </p>
            </div>
          }
        </div>
        <Footer />
      </div>
    )
  }
}

export default withStyles(styles)(ForgotPassword)
