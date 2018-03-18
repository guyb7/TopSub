import React from 'react'
import { withStyles } from 'material-ui/styles'

import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import Snackbar from 'material-ui/Snackbar'
import CheckSvg from 'mdi-svg/svg/check.svg'

import API from '../components/API'
import MdIcon from '../components/MdIcon'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'

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

class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      name: '',
      emailError: false,
      passwordError: false,
      isLoading: false,
      isDone: false,
      serverError: false
    }
  }

  handleChange = field => event => {
    this.setState({
      [field]: event.target.value,
      ...(field === 'email' ? { emailError: false } : {}),
      ...(field === 'password' ? { passwordError: false } : {})
    })
  }

  validateForm = () => {
    const errors = {}
    if (this.state.password.length < 8) {
      errors.passwordError = true
    }
    if (/\S+@\S+\.\S+/.test(this.state.email) === false) {
      errors.emailError = true
    }
    if (Object.keys(errors).length === 0) {
      return true
    } else {
      this.setState({
        ...this.state,
        ...errors
      })
      return false
    }
  }

  submit = e => {
    e.preventDefault()
    if (this.validateForm() === false) {
      return
    }
    this.setState({
      ...this.state,
      isLoading: true,
      serverError: false
    }, async () => {
      const form = {
        email: this.state.email,
        password: this.state.password,
        name: this.state.name
      }
      try {
        await API.post('/register', form)
        this.setState({
          ...this.state,
          isLoading: false,
          isDone: true
        })
      } catch (e) {
        const errorMessage = e.message || 'Something went wrong'
        this.setState({
          ...this.state,
          isLoading: false,
          serverError: errorMessage
        })
      }
    })
  }

  hideServerError = () => {
    this.setState({
      ...this.state,
      serverError: false
    })
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <NavBar withBorder />
        <div className={classes.container}>
          <h3 className={classes.title}>Create a new account</h3>
          {
            this.state.isDone === false &&
            <form className={classes.form} onSubmit={this.submit}>
              <TextField
                label="Email"
                type="email"
                className={classes.textField}
                value={this.state.email}
                error={this.state.emailError}
                onChange={this.handleChange('email')}
                disabled={this.state.isLoading}
                />
                <TextField
                label="Password"
                type="password"
                helperText="Minimum 8 characters"
                className={classes.textField}
                value={this.state.password}
                error={this.state.passwordError}
                onChange={this.handleChange('password')}
                disabled={this.state.isLoading}
              />
              <TextField
                label="Name"
                className={classes.textField}
                value={this.state.name}
                onChange={this.handleChange('name')}
                disabled={this.state.isLoading}
              />
              <Button
                variant="raised"
                color="primary"
                type="submit"
                className={classes.button}
                onClick={this.submit}
                disabled={this.state.isLoading}
                >
                Register
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
                We sent you a confirmation email. Click the link inside it to verify your email and activate your acount.
              </p>
            </div>
          }
        </div>
        <Footer />
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={!!this.state.serverError}
          onClose={this.hideServerError}
          message={<span>{this.state.serverError}</span>}
        />
      </div>
    )
  }
}

export default withStyles(styles)(Register)
