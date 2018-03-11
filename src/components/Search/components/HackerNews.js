import React from 'react'
import { withStyles } from 'material-ui/styles'

import { ListItem, ListItemText } from 'material-ui/List'

const styles = theme => {
  return {
    root: {
      '&:not(:last-child)': {
        borderBottom: '1px solid ' + theme.palette.divider
      }
    }
  }
}

class HackerNews extends React.Component {
  render() {
    const { classes, data } = this.props
    return (
      <ListItem classes={classes} button component='a' href={data.url} target='_blank'>
        <div>
          {data.score}
        </div>
        <ListItemText primary={data.data.title} secondary={data.text} />
      </ListItem>
    )
  }
}

export default withStyles(styles)(HackerNews)
