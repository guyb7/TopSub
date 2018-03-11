import React from 'react'
import { withStyles } from 'material-ui/styles'
import moment from 'moment'

const styles = theme => {
  return {
    root: {
      backgroundColor: '#f6f6ef',
      color: '#000',
      width: '100%',
      padding: 5,
      paddingLeft: 10,
      paddingRight: 10,
      '&:first-child': {
        paddingTop: 10
      },
      '&:last-child': {
        paddingBottom: 10
      },
      '& a': {
        color: '#000',
        textDecoration: 'none'
      },
      '& a:visited': {
        color: '#828282'
      }
    },
    title: {
      fontSize: 14,
      paddingTop: 2,
      paddingBottom: 2
    },
    domain: {
      marginLeft: 4
    },
    subtext: {
      color: '#828282',
      fontSize: 11,
      '& a': {
        color: '#828282',
      },
      '& a:hover': {
        textDecoration: 'underline'
      }
    }
  }
}

class HackerNews extends React.Component {
  render() {
    const { classes, data } = this.props
    const timeAgo = moment.utc(data.publishTime).fromNow()
    const hnUrl = `https://news.ycombinator.com/item?id=${data.externalId}`
    
    return (
      <div className={classes.root}>
        <div className={classes.title}>
          <a href={data.url} target='_blank'>
            {data.data.title}
          </a>
          {
            data.data.domain &&
            <span className={`${classes.subtext} ${classes.domain}`}>
              ({data.data.domain})
            </span>
          }
        </div>
        <div className={classes.subtext}>
          {data.score} points <a href={hnUrl} target='_blank'>{timeAgo}</a> | <a href={hnUrl} target='_blank'>{data.data.comments} comments</a>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(HackerNews)
