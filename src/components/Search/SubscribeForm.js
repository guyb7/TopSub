import React from 'react'
import { withStyles } from 'material-ui/styles'

import Button from 'material-ui/Button'
import Divider from 'material-ui/Divider'
import TextField from 'material-ui/TextField'
import { MenuItem } from 'material-ui/Menu'
import Select from 'material-ui/Select'

import EmailSvg from 'mdi-svg/svg/email-outline.svg'
import ClockSvg from 'mdi-svg/svg/clock.svg'
import ClandarSvg from 'mdi-svg/svg/calendar.svg'
import ArrowRightSvg from 'mdi-svg/svg/arrow-right.svg'
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
    }
  }
}

const iconStyles = theme => {
  return {
    root: {
      fill: theme.palette.custom.brownLight,
      marginRight: theme.spacing.unit
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
      email: ''
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
      frequency: event.target.value
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
      email: event.target.value
    })
  }

  isEmailValid = () => {
    const re = /\S+@\S+\.\S+/
    return re.test(this.state.email)
  }

  render() {
    const { classes, form } = this.props
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
            value={this.state.frequency === 'once' ? '' : this.state.time}
            onChange={this.changeTime}
            disabled={this.state.frequency === 'once'}
            className={classes.select} >
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
            className={classes.textField}
            value={this.state.email}
            InputProps={{ className: classes.input }}
            onChange={this.changeEmail()} />
        </div>
        <Button
          className={classes.button}
          variant="raised"
          onClick={this.open}
          >
          {ctaText}
          <MdIcon className={classes.rightIcon} svg={ArrowRightSvg} />
        </Button>
      </div>
    )
  }
}

export default withStyles(styles)(SubscribeForm)
