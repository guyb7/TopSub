import React from 'react'
import { withStyles } from 'material-ui/styles'

import Button from 'material-ui/Button'
import Divider from 'material-ui/Divider'
import TextField from 'material-ui/TextField'
import { MenuItem } from 'material-ui/Menu'
import Select from 'material-ui/Select'
import Snackbar from 'material-ui/Snackbar'

import API from '../API'
import EmailSvg from 'mdi-svg/svg/email-outline.svg'
import ClockSvg from 'mdi-svg/svg/clock.svg'
import ClandarSvg from 'mdi-svg/svg/calendar.svg'
import ArrowRightSvg from 'mdi-svg/svg/arrow-right.svg'
import DoneSvg from 'mdi-svg/svg/check.svg'
import MdIcon from '../MdIcon'

const styles = theme => {
  return {
    root: {
      ...theme.utils.container,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'relative'
    },
    dividerText: {
      position: 'absolute',
      height: 20,
      top: theme.spacing.double - 10,
      fontSize: 14,
      display: 'flex',
      alignItems: 'center',
      color: theme.palette.custom.brownLight,
      backgroundColor: theme.palette.custom.blueSea,
      paddingLeft: theme.spacing.double,
      paddingRight: theme.spacing.double,
      zIndex: 500
    },
    divider: {
      width: '90%',
      backgroundColor: theme.palette.custom.brownLight,
      opacity: 0.35,
      marginTop: theme.spacing.double,
      marginBottom: theme.spacing.triple,
      zIndex: 400
    },
    button: {
      margin: theme.spacing.unit,
      marginTop: theme.spacing.double,
      '&>span>div>div': {
        display: 'flex'
      }
    },
    rightIcon: {
      marginLeft: theme.spacing.unit
    },
    indicator: {
      backgroundColor: theme.palette.common.white
    },
    textField: {
      width: '100%'
    },
    select: {
      width: '100%'
    },
    input: {
      color: theme.palette.custom.brownLight
    },
    fieldContainer: {
      marginTop: theme.spacing.unit,
      marginBottom: theme.spacing.unit,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'flex-end',
      width: '100%',
      maxWidth: 230
    },
    done: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: theme.palette.custom.brownLight,
      margin: theme.spacing.unit,
      marginTop: theme.spacing.double,
      height: 40,
      '& *': {
        display: 'flex'
      },
      '& svg': {
        marginLeft: theme.spacing.unit
      }
    }
  }
}

const iconStyles = theme => {
  return {
    root: {
      fill: theme.palette.custom.brownLight,
      marginRight: theme.spacing.unit,
      marginBottom: 4
    }
  }
}
const StyledIcon = withStyles(iconStyles)(MdIcon)

const selectStyles = theme => {
  return {
    root: {
      color: theme.palette.custom.brownLight
    }
  }
}
const StyledSelect = withStyles(selectStyles)(Select)

class SubscribeForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      frequency: 'sunday',
      time: 'morning',
      email: '',
      emailError: false,
      isLoading: false,
      isDone: false,
      submitError: false
    }
  }

  getCtaText() {
    const { frequency } = this.state
    if (frequency === 'once') {
      return 'Send Email'
    } else if (frequency === 'daily') {
      return 'Send Daily Emails'
    } else {
      return 'Send Weekly Emails'
    }
  }

  changeFrequency = event => {
    this.setState({
      ...this.state,
      frequency: event.target.value,
      time: event.target.value === 'once' ? 'now' : (this.state.time === 'now' ? 'morning' : this.state.time)
    })
  }

  changeTime = event => {
    this.setState({
      ...this.state,
      time: event.target.value
    })
  }

  changeEmail = () => event => {
    this.setState({
      ...this.state,
      email: event.target.value,
      emailError: false
    })
  }

  isEmailValid = () => {
    const re = /\S+@\S+\.\S+/
    return re.test(this.state.email)
  }

  subscribe = () => {
    if (!this.isEmailValid()) {
      this.setState({
        ...this.state,
        emailError: true
      })
      return
    }
    const tzHoursOffset = Math.round(-(new Date().getTimezoneOffset() / 60))
    const form = {
      ...this.props.form,
      frequency: this.state.frequency,
      time: this.state.time,
      email: this.state.email,
      tzHoursOffset
    }
    this.setState({
      ...this.state,
      isLoading: true,
      submitError: false
    }, async () => {
      try {
        await API.post('/subscribe', form)
        this.setState({
          ...this.state,
          isLoading: false,
          isDone: true
        })
      } catch (e) {
        console.error(e)
        this.setState({
          ...this.state,
          isLoading: false,
          submitError: 'Something went wrong, the email was not registered'
        })
      }
    })
  }

  reset = () => {
    this.setState({
      ...this.state,
      isDone: false
    })
  }

  hideSubmitError = () => {
    this.setState({
      ...this.state,
      submitError: false
    })
  }

  render() {
    const { classes } = this.props
    const ctaText = this.getCtaText()
    return (
      <div className={classes.root}>
        <div className={classes.dividerText}>Email this list</div>
        <Divider className={classes.divider} />
        <div className={classes.fieldContainer}>
          <StyledIcon svg={ClandarSvg} />
          <StyledSelect
            value={this.state.frequency}
            onChange={this.changeFrequency}
            disabled={this.state.isLoading || this.state.isDone}
            className={classes.select} >
            <MenuItem value='once'>One time</MenuItem>
            <MenuItem value='daily'>Every day</MenuItem>
            <MenuItem value='sunday'>Every Sunday</MenuItem>
            <MenuItem value='monday'>Every Monday</MenuItem>
            <MenuItem value='friday'>Every Friday</MenuItem>
          </StyledSelect>
        </div>
        <div className={classes.fieldContainer}>
          <StyledIcon svg={ClockSvg} />
          <StyledSelect
            value={this.state.time}
            onChange={this.changeTime}
            disabled={this.state.frequency === 'once' || this.state.isLoading || this.state.isDone}
            className={classes.select} >
            {
              this.state.frequency === 'once' &&
              <MenuItem value='now'>Now</MenuItem>
            }
            <MenuItem value='morning'>In the morning</MenuItem>
            <MenuItem value='noon'>At noon</MenuItem>
            <MenuItem value='evening'>In the evening</MenuItem>
          </StyledSelect>
        </div>
        <div className={classes.fieldContainer}>
          <StyledIcon svg={EmailSvg} />
          <TextField
            placeholder='Email'
            type='email'
            disabled={this.state.isLoading || this.state.isDone}
            className={classes.textField}
            value={this.state.email}
            InputProps={{ className: classes.input }}
            error={this.state.emailError || null}
            onChange={this.changeEmail()} />
        </div>
        {
          !this.state.isDone &&
          <Button
            className={classes.button}
            variant="raised"
            onClick={this.subscribe}
            disabled={this.state.isLoading}
            >
            {ctaText}
            <MdIcon className={classes.rightIcon} svg={ArrowRightSvg} />
          </Button>
        }
        {
          this.state.isDone &&
          <Button className={classes.done} onClick={this.reset}>
            Done!
            <MdIcon svg={DoneSvg} />
          </Button>
        }
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={!!this.state.submitError}
          onClose={this.hideSubmitError}
          message={<span>{this.state.submitError}</span>}
        />
      </div>
    )
  }
}

export default withStyles(styles)(SubscribeForm)
