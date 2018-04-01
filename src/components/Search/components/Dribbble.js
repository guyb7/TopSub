import React from 'react'
import { withStyles } from 'material-ui/styles'

const styles = theme => {
  return {
    root: {
      display: 'grid',
      gridGap: '10px',
      gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
      width: '100%',
      maxWidth: 750
    }
  }
}

const itemStyles = theme => {
  return {
    root: {
      width: 90
    },
    image: {
      width: '100%'
    }
  }
}
class DribbbleItem extends React.Component {
  render() {
    const { classes, data } = this.props
    return (
      <div className={classes.root}>
        <h3>{data.data.title}</h3>
        <img className={classes.image} src={data.data.imageUrl} alt={data.data.title} />
      </div>
    )
  }
}
const StyledDribbbleItem = withStyles(itemStyles)(DribbbleItem)

class Dribbble extends React.Component {
  render() {
    const { classes, results } = this.props
    console.log('re', results)
    return (
      <div className={classes.root}>
        {
          results.map(r => <StyledDribbbleItem key={r.id} data={r} />)
        }
      </div>
    )
  }
}

export default withStyles(styles)(Dribbble)
