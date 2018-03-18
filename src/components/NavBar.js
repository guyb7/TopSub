import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles'
import { withRouter } from 'react-router'

import { Link } from 'react-router-dom'
import Button from 'material-ui/Button'
import Menu, { MenuItem } from 'material-ui/Menu'

import { setUser } from '../store/actions'
import API from '../components/API'

const styles = theme => {
  return {
    root: {
      paddingLeft: theme.spacing.triple,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      '&[with-border=true]': {
        borderBottom: '1px solid ' + theme.palette.divider
      },
      ...theme.utils.container
    },
    title: {
      ...theme.typography.title,
      textDecoration: 'none'
    },
    beta: {
      color: theme.palette.custom.blueSea,
      fontWeight: 300,
      fontSize: 12
    }
  }
}

const buttonStyles = theme => {
  return {
    root: {
      color: theme.palette.text.secondary,
      padding: theme.spacing.unit,
      paddingTop: theme.spacing.triple,
      paddingBottom: theme.spacing.triple,
      textTransform: 'none',
      borderBottom: '2px solid transparent',
      borderRadius: 0,
      '&:hover': {
        color: theme.palette.text.primary,
        borderBottom: '2px solid ' + theme.palette.text.primary,
        backgroundColor: 'transparent'
      }
    }
  }
}
const StyledButton = withStyles(buttonStyles)(Button)

class NavBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      isMenuOpen: false,
      anchorEl: null
    }
  }

  componentDidMount() {
    this.checkIfLoggedIn()
  }

  checkIfLoggedIn = async () => {
    try {
      const response = await API.get('/profile')
      this.props.setUser(response.data.user)
    } catch (e) {
      // Not logged in
    }
    this.setState({
      ...this.state,
      isLoading: false
    })
  }

  openMenu = e => {
    this.setState({
      ...this.state,
      isMenuOpen: true,
      anchorEl: e.currentTarget
    })
  }

  closeMenu = () => {
    this.setState({
      ...this.state,
      isMenuOpen: false,
      anchorEl: null
    })
  }

  navTo = path => () => {
    this.props.history.push(path)
  }

  logout = async () => {
    this.closeMenu()
    try {
      await API.get('/logout')
    } catch (e) {
    }
    this.props.setUser({ id: null })
    this.props.history.push('/')
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.root} with-border={this.props.withBorder ? 'true' : 'false'}>
        <Link className={classes.title} to='/'>
          TopSub <span className={classes.beta}>beta</span>
        </Link>
        {
          this.state.isLoading && <div></div>
        }
        {
          !this.state.isLoading && this.props.user.id &&
          <div className={classes.user}>
            <StyledButton onClick={this.openMenu}>
              {this.props.user.name || this.props.user.email}
            </StyledButton>
            <Menu
              open={this.state.isMenuOpen}
              onClose={this.closeMenu}
              anchorEl={this.state.anchorEl}
            >
              <MenuItem onClick={this.navTo('/profile')}>Profile</MenuItem>
              <MenuItem onClick={this.logout}>Logout</MenuItem>
            </Menu>
          </div>
        }
        {
          !this.state.isLoading && !this.props.user.id &&
          <div>
            <StyledButton to='/register' component={Link}>
              Sign Up
            </StyledButton>
            <StyledButton to='/login' component={Link}>
              Login
            </StyledButton>
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setUser(user) {
      dispatch(setUser(user))
    }
  }
}

const connectedNavBar = connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar)

export default withRouter(withStyles(styles)(connectedNavBar))
