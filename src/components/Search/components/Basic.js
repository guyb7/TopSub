import React from 'react'
import { withStyles } from 'material-ui/styles'

import { ListItem, ListItemText } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'

const styles = theme => {
  return {
    root: {
      '&:not(:last-child)': {
        borderBottom: '1px solid ' + theme.palette.divider
      }
    }
  }
}

class Basic extends React.Component {
  render() {
    const { classes, data } = this.props
    console.log(data)
    return (
      <ListItem classes={classes} button component='a' href={data.url} target='_blank'>
        <Avatar src={data.image} />
        <ListItemText primary={data.data.title} secondary={data.text} />
      </ListItem>
    )
  }
}

export default withStyles(styles)(Basic)
