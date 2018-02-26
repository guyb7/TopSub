import React from 'react'
import { withStyles } from 'material-ui/styles'

import Autocomplete from './Autocomplete'

const suggestions = [
  { label: 'Afghanistan', value: 'afghanistan' },
  { label: 'Aland Islands', value: 'aland-islands' },
  { label: 'Albania', value: 'albania' },
  { label: 'Algeria', value: 'algeria' },
  { label: 'American Samoa', value: 'american-samoa' },
  { label: 'Andorra', value: 'andorra' },
  { label: 'Angola', value: 'angola' },
  { label: 'Anguilla', value: 'anguilla' },
  { label: 'Antarctica', value: 'antarctica' },
  { label: 'Argentina', value: 'argentina' },
  { label: 'Armenia', value: 'armenia' },
  { label: 'Aruba', value: 'aruba' },
  { label: 'Australia', value: 'australia' },
  { label: 'Austria', value: 'austria' },
  { label: 'Azerbaijan', value: 'azerbaijan' }
]

const styles = theme => {
  return {
    root: {

    }
  }
}

class SearchForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: null,
      period: null,
      placeholder: ''
    }
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({
        ...this.state,
        placeholder: '' + Math.floor(Math.random() * 1000)
      })
    }, 1000)
  }

  handleDataChange = data => {
    this.setState({
      ...this.state,
      data
    })
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        {JSON.stringify(this.state)}
        <Autocomplete
          suggestions={suggestions}
          onChange={this.handleDataChange}
          placeholder={this.state.placeholder}
          />
      </div>
    )
  }
}

export default withStyles(styles)(SearchForm)
