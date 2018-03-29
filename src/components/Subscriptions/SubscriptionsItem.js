import React from 'react'
import { withStyles } from 'material-ui/styles'

import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  ExpansionPanelActions
} from 'material-ui/ExpansionPanel'
import Dialog, { DialogActions, DialogContent } from 'material-ui/Dialog'
import Button from 'material-ui/Button'

import API from '../API'
import MdIcon from '../MdIcon'
import ChevronDownIcon from 'mdi-svg/svg/chevron-down.svg'

const styles = theme => {
  return {
    root: {
    },
    title: {
      ...theme.typography.heading
    },
    titleDescriptionDivider: {
      marginLeft: theme.spacing.double,
      marginRight: theme.spacing.double
    },
    description: {
      fontSize: 14,
      color: theme.palette.grey[600]
    },
    detailsContainer: {
      flexDirection: 'column'
    },
    sectionTitle: {
      ...theme.typography.subheading,
      fontWeight: 400,
      borderBottom: `1px solid ${theme.palette.divider}`,
      marginTop: theme.spacing.big,
      paddingBottom: theme.spacing.unit
    },
    confirmDelete: {
      color: theme.palette.custom.red
    }
  }
}

const itemDataStyles = theme => {
  return {
    sourceItems: {
      display: 'flex',
      '& > *': {
        marginRight: theme.spacing.quad
      }
    },
    sourceItemTitle: {
      ...theme.typography.caption
    },
    sourceItemValue: {
      ...theme.typography.body1
    }
  }
}

class ItemData extends React.Component {
  render() {
    const { classes } = this.props
    return (
      <div className={classes.sourceItems}>
        {
          this.props.items.map(i => 
            <div key={i.title}>
              <div className={classes.sourceItemTitle}>
                {i.title}
              </div>
              <div className={classes.sourceItemValue}>
                {i.value}
              </div>
            </div>
          )
        }
      </div>
    )
  }
}
const StyledItemData = withStyles(itemDataStyles)(ItemData)

class SubscriptionsItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      deleteDialogIsOpen: false
    }
  }

  confirmDelete = () => {
    this.setState({
      ...this.state,
      deleteDialogIsOpen: true
    })
  }

  cancelDelete = () => {
    this.setState({
      ...this.state,
      deleteDialogIsOpen: false
    })
  }

  delete = async () => {
    const unsubscribeToken = this.props.data.unsubscribeToken
    await API.delete('/subscriptions/' + unsubscribeToken)
    if (this.props.onDelete) {
      this.props.onDelete(unsubscribeToken)
    }
  }

  parseCron = () => {
    const schedule = this.props.data.schedule
    return {
      second: 0,
      minute: schedule.minutes.join(', '),
      hour: schedule.hours.join(', '),
      monthDay: 0,
      month: 0,
      weekDay: schedule.weekDay.join(', ')
    }
  }

  render() {
    const { classes, data } = this.props
    const schedule = this.parseCron()
    const timezoneStr = data.tzHoursOffset > 0 ? `UTC +${data.tzHoursOffset}` : (data.tzHoursOffset < 0 ? `UTC -${data.tzHoursOffset}` : 'UTC')
    return (
      <React.Fragment>
        <ExpansionPanel className={classes.root}>
          <ExpansionPanelSummary expandIcon={<MdIcon svg={ChevronDownIcon} />}>
            <div className={classes.title}>
              {data.topic.name}
              <span className={classes.description}>
                <span className={classes.titleDescriptionDivider}>–</span>
                {data.topic.description}
              </span>
            </div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.detailsContainer}>
            <StyledItemData items={[
              { title: 'Source', value: data.topic.name },
              { title: 'Period', value: data.period },
              { title: 'Count', value: data.limit }
            ]} />
            
            <h3 className={classes.sectionTitle}>
              Schedule ({timezoneStr})
            </h3>
            <StyledItemData items={[
              { title: 'Minute (0-59)', value: schedule.minute },
              { title: 'Hour (0-23)', value: schedule.hour },
              { title: 'Month Day (1-31)', value: schedule.monthDay },
              { title: 'Month (1-12)', value: schedule.month },
              { title: 'Week Day (0-6) (0 is Sun)', value: schedule.weekDay }
            ]} />
          </ExpansionPanelDetails>
          <ExpansionPanelActions>
            <Button size="small" onClick={this.confirmDelete}>
              Unsubscribe
            </Button>
          </ExpansionPanelActions>
        </ExpansionPanel>

        <Dialog
          open={this.state.deleteDialogIsOpen}
          onClose={this.cancelDelete}
          >
          <DialogContent>
            Delete your subscription to {data.topic.name}?<br/>
            This cannot be undone.
          </DialogContent>
          <DialogActions>
            <Button onClick={this.cancelDelete}>
              Cancel
            </Button>
            <Button onClick={this.delete} className={classes.confirmDelete}>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(SubscriptionsItem)
