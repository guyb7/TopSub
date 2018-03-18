import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles'
import { withRouter } from 'react-router'

import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'

import { setUser } from '../store/actions'
import API from '../components/API'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import { getParams } from '../components/Utils'

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
    }
  }
}

class ResetPassword extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      emailToken: '',
      password: '',
      passwordError: false,
      isLoading: false,
      error: false
    }
  }

  componentDidMount() {
    const { emailToken } = getParams(this.props.history.location.search)
    if (!emailToken) {
      return this.setState({
        ...this.state,
        error: 'Invalid reset token'
      })
    }
    this.setState({
      ...this.state,
      emailToken
    })
  }

  onPasswordChange = e => {
    this.setState({
      ...this.state,
      password: e.target.value,
      passwordError: false
    })
  }

  validateForm = () => {
    const errors = {}
    if (this.state.password.length < 8) {
      errors.passwordError = true
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

  onResetSuccess = user => {
    this.props.setUser(user)
    this.props.history.push('/')
  }

  submit = e => {
    e.preventDefault()
    if (this.validateForm() === false) {
      return
    }
    this.setState({
      ...this.state,
      isLoading: true,
      error: false
    }, async () => {
      const form = {
        emailToken: this.state.emailToken,
        password: this.state.password
      }
      try {
        const response = await API.post('/reset-password', form)
        this.setState({
          ...this.state,
          isLoading: false
        })
        this.onResetSuccess(response.data.user)
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

  hideServerError = () => {
    this.setState({
      ...this.state,
      error: false
    })
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <NavBar withBorder />
        <div className={classes.container}>
          <h3 className={classes.title}>Choose a new password</h3>
          <form className={classes.form} onSubmit={this.submit}>
            <TextField
              label="Password"
              type="password"
              helperText="Minimum 8 characters"
              className={classes.textField}
              value={this.state.password}
              error={this.state.passwordError}
              onChange={this.onPasswordChange}
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
              Reset Password
            </Button>
          </form>
        </div>
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setUser(user) {
      dispatch(setUser(user))
    }
  }
}

const connectedResetPassword = connect(
  mapStateToProps,
  mapDispatchToProps
)(ResetPassword)

export default withRouter(withStyles(styles)(connectedResetPassword))
