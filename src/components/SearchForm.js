import React from 'react'
import { withStyles } from 'material-ui/styles'
import _sample from 'lodash/sample'

import { MenuItem } from 'material-ui/Menu'
import { FormControl } from 'material-ui/Form'
import Select from 'material-ui/Select'

const limits = [
  { label: '3', value: 3 },
  { label: '5', value: 5 },
  { label: '10', value: 10 }
]
const topics = [
  { label: 'GitHub repos', value: 'github-repos' },
  { label: 'HN posts', value: 'hn-posts' },
  { label: 'Tweets', value: 'tweets' },
  { label: 'Nasdaq Stocks', value: 'nasdaq-stocks' }
]
const periods = [
  { label: 'hour', value: 'hour' },
  { label: 'day', value: 'day' },
  { label: '3 days', value: '3days' },
  { label: 'week', value: 'week' },
  { label: 'month', value: 'month' }
]

const styles = theme => {
  return {
    root: {
      color: theme.palette.getContrastText(theme.palette.custom.blueSea),
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    formControl: {
      margin: theme.spacing.unit,
      textAlign: 'center'
    },
    text: {
      paddingTop: 8,
      paddingBottom: 12
    }
  }
}

const selectStyles = theme => {
  return {
    select: {
      color: theme.palette.getContrastText(theme.palette.custom.blueSea),
      paddingRight: theme.spacing.double,
      paddingLeft: theme.spacing.double
    },
    icon: {
      display: 'none'
    }
  }
}
const StyledSelect = withStyles(selectStyles)(Select)

class SearchForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      limit: 10,
      topic: topics[0].value,
      period: 'day'
    }
  }

  componentDidMount() {
    this.setState({
      ...this.state,
      topic: _sample(topics, 1).value
    }, () => {
      this.publishChange()
    })
  }

  handleChange = e => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    }, () => {
      this.publishChange()
    })
  }

  publishChange() {
    this.props.onChange(this.state)
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <span className={classes.text}>Top</span>
        <FormControl className={classes.formControl}>
          <StyledSelect
            value={this.state.limit}
            onChange={this.handleChange}
            name="limit"
          >
            {
              limits.map(l => <MenuItem key={l.value} value={l.value}>{l.label}</MenuItem>)
            }
          </StyledSelect>
        </FormControl>
        <FormControl className={classes.formControl}>
          <StyledSelect
            value={this.state.topic}
            onChange={this.handleChange}
            name="topic"
          >
            {
              topics.map(t => <MenuItem key={t.value} value={t.value}>{t.label}</MenuItem>)
            }
          </StyledSelect>
        </FormControl>
        <span className={classes.text}>in the last</span>
        <FormControl className={classes.formControl}>
          <StyledSelect
            value={this.state.period}
            onChange={this.handleChange}
            name="period"
          >
            {
              periods.map(p => <MenuItem key={p.value} value={p.value}>{p.label}</MenuItem>)
            }
          </StyledSelect>
        </FormControl>
      </div>
    )
  }
}

export default withStyles(styles)(SearchForm)
