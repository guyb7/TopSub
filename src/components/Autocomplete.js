import React from 'react'
import { withStyles } from 'material-ui/styles'

import TextField from 'material-ui/TextField'
import Paper from 'material-ui/Paper'
import { MenuItem } from 'material-ui/Menu'
import Downshift from 'downshift'

const renderSuggestion = params => {
  const { suggestion, index, itemProps, highlightedIndex, selectedItem } = params
  const isHighlighted = highlightedIndex === index
  const isSelected = selectedItem === suggestion.label
  return (
    <MenuItem
      {...itemProps}
      key={suggestion.label}
      selected={isHighlighted}
      component='div'
      style={{
        fontWeight: isSelected ? 500 : 400
      }}
    >
      {suggestion.label}
    </MenuItem>
  )
}

function getSuggestions(suggestions, inputValue) {
  let count = 0
  return suggestions.filter(suggestion => {
    const keep =
      (!inputValue || suggestion.label.toLowerCase().includes(inputValue.toLowerCase())) &&
      count < 5
    if (keep) {
      count += 1
    }
    return keep
  })
}

const styles = theme => {
  return {
    container: {
      flexGrow: 1,
      height: 200,
      width: 200
    }
  }
}

class Autocomplete extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      suggestions: props.suggestions
    }
  }

  render() {
    const { classes } = this.props
    return (
      <Downshift
        onChange={this.props.onChange}
        itemToString={i => i === null ? '' : i.label}
        >
        {({
          getInputProps,
          getItemProps,
          isOpen,
          inputValue,
          selectedItem,
          highlightedIndex,
          clearSelection
        }) => (
          <div className={classes.container}>
            <TextField
              {
                ...getInputProps({
                  placeholder: this.props.placeholder,
                  onChange: e => {
                    if (e.target.value === '') {
                      clearSelection()
                    }
                  }
                })
              }
              classes={classes.input}
              />
            {
              isOpen &&
              <Paper square>
                {
                  getSuggestions(this.state.suggestions, inputValue).map((suggestion, index) =>
                    renderSuggestion({
                      suggestion,
                      index,
                      itemProps: getItemProps({ item: suggestion }),
                      highlightedIndex,
                      selectedItem
                    })
                  )
                }
              </Paper>
            }
          </div>
        )}
      </Downshift>
    )
  }
}

export default withStyles(styles)(Autocomplete)

