import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#7c43bd',
      main: '#4a148c',
      dark: '#12005e',
      contrastText: '#ffffff'
    },
    secondary: {
      light: '#fff350',
      main: '#ffc107',
      dark: '#c79100',
      contrastText: '#000'
    },
    type: 'light'
  },
  typography: {
    useNextVariants: true
  }
});

export default theme;
