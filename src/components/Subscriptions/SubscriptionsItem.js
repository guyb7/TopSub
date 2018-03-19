import React from 'react'
import { withStyles } from 'material-ui/styles'

import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  ExpansionPanelActions
} from 'material-ui/ExpansionPanel'
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog'
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
      fontWeight: 500,
      borderBottom: `1px solid ${theme.palette.divider}`,
      paddingBottom: theme.spacing.unit
    },
    confirmDelete: {
      color: theme.palette.custom.red
    }
  }
}

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
    const id = this.props.data.id
    await API.delete('/subscriptions/' + id)
    if (this.props.onDelete) {
      this.props.onDelete(id)
    }
  }

  render() {
    const { classes, data } = this.props
    return (
      <div>
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
            <h3 className={classes.sectionTitle}>
              Source
            </h3>
            <p>
              source, period, count, filter
            </p>
            <h3 className={classes.sectionTitle}>
              Schedule
            </h3>
            <p>
              * * * * * *
            </p>
            {JSON.stringify(data)}
          </ExpansionPanelDetails>
          <ExpansionPanelActions>
            <Button size="small" onClick={this.confirmDelete}>
              Unsubscribe
            </Button>
            <Button size="small">
              Edit
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
      </div>
    )
  }
}

export default withStyles(styles)(SubscriptionsItem)
