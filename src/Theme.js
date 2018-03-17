import { createMuiTheme } from 'material-ui/styles'

const Theme = createMuiTheme({
  palette: {
    primary: {
      main: '#243757'
      // light
      // dark
      // contrastText
    },
    secondary: {
      main: '#665E52'
    },

    custom: {
      bluePurple: '#243757',
      blueSea: '#3A5F6F',
      brownLight: '#DAD5B7',
      brown: '#C2B79B',
      brownDark: '#665E52',
      red: '#e53935',
      green: '#4caf50'
    }
  },
  spacing: {
    half: 4,
    unit: 8,
    double: 16,
    triple: 24,
    quad: 32,
    big: 64,
    huge: 128
  },
  typography: {

  },
  utils: {
    container: {
      maxWidth: 960,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  }
})

export default Theme
