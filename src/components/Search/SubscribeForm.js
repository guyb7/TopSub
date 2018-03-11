import React from 'react'
import { withStyles } from 'material-ui/styles'

import Button from 'material-ui/Button'
import EmailSvg from 'mdi-svg/svg/email-outline.svg'
import Divider from 'material-ui/Divider'
import Tabs, { Tab } from 'material-ui/Tabs'
import TextField from 'material-ui/TextField'
import Paper from 'material-ui/Paper'

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
      top: theme.spacing.quad - 10,
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
      width: '100%',
      backgroundColor: theme.palette.custom.brownLight,
      opacity: 0.35,
      marginTop: theme.spacing.quad,
      marginBottom: theme.spacing.quad,
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
      backgroundColor: theme.palette.common.blueSea
    },
    form: {
      marginTop: theme.spacing.quad,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      minWidth: 400
    }
  }
}

const tabStyle = theme => {
  return {
    root: {
      color: theme.palette.common.blueSea,
      '&[aria-selected=false]': {
        color: theme.palette.grey[500]
      }
    }
  }
}
const StyledTab = withStyles(tabStyle)(Tab)

class SubscribeForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tab: 0,
      email: ''
    }
  }

  getPeriodText(form) {
    let text = 'periodic'
    if (form && form.period) {
      switch (form.period) {
        case 'week':
          text = 'weekly'
          break
        case 'month':
          text = 'monthly'
          break
        default:
          text = 'daily'
      }
    }
    return text
  }

  changeTab = (event, value) => {
    this.setState({
      ...this.state,
      tab: value
    })
  }

  changeEmail = () => event => {
    this.setState({
      ...this.state,
      email: event.target.value,
    })
  }

  render() {
    const { classes, form } = this.props
    const period = this.getPeriodText(form)
    return (
      <div className={classes.root}>
        <div className={classes.dividerText}>Email this list</div>
        <Divider className={classes.divider} />
        <Paper className={classes.form} elevation={4}>
          <Tabs
            value={this.state.tab}
            onChange={this.changeTab}
            centered
            indicatorClassName={classes.indicator}
          >
            <StyledTab label="Once" />
            <StyledTab label="Daily" />
            <StyledTab label="Weekly" />
          </Tabs>
          <TextField
            label="email"
            className={classes.textField}
            value={this.state.email}
            onChange={this.changeEmail()}
            margin="normal"
          />
          <Button className={classes.button} variant="raised" onClick={this.open}>
            Email results {period}
            <MdIcon className={classes.rightIcon} svg={EmailSvg} />
          </Button>
        </Paper>
      </div>
    )
  }
}

export default withStyles(styles)(SubscribeForm)
