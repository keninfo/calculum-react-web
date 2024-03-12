import { type Theme, createTheme } from '@mui/material/styles'

import palette from './colors'
import darkPalette from './colors-dark'
import { base } from './spacings'

declare module '@mui/material/styles' {
  interface Palette {
    border: Palette['primary']
    logo: Palette['primary']
    static: Palette['primary']
  }
  interface PaletteOptions {
    border: PaletteOptions['primary']
    logo: PaletteOptions['primary']
    static: PaletteOptions['primary']
  }

  interface TypeBackground {
    main: string
    light: string
    disabled: string
  }

  interface TypeText {
    light: string
  }

  // Custom color properties
  interface PaletteColor {
    background?: string
    hover?: string
    light: string
  }
  interface SimplePaletteColorOptions {
    background?: string
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsSizeOverrides {
    stretched: true
  }
}

export const theme = createTheme()

const initTheme = (darkMode: boolean): Theme => {
  const colors = darkMode ? darkPalette : palette

  return createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      ...colors,
    },
    spacing: base,
    typography: {
      fontFamily: 'Agency FB',
      h1: {
        fontSize: '32px',
        lineHeight: '36px',
        fontWeight: 700,
      },
      h2: {
        fontSize: '27px',
        lineHeight: '34px',
        fontWeight: 700,
      },
      h3: {
        fontSize: '24px',
        lineHeight: '30px',
      },
      h4: {
        fontSize: '20px',
        lineHeight: '26px',
      },
      h5: {
        fontSize: '16px',
        fontWeight: 700,
      },
      body1: {
        fontSize: '16px',
        lineHeight: '22px',
      },
      body2: {
        fontSize: '14px',
        lineHeight: '20px',
      },
      caption: {
        fontSize: '12px',
        lineHeight: '16px',
        letterSpacing: '0.4px',
      },
      overline: {
        fontSize: '11px',
        lineHeight: '14px',
        textTransform: 'uppercase',
        letterSpacing: '1px',
      },
    },
    components: {
      MuiButton: {
        variants: [
          {
            props: { size: 'stretched' },
            style: {
              padding: '12px 48px',
            },
          },
          {
            props: { variant: 'contained', color: 'primary' },
            style: ({ theme }) => ({
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              '&:hover': {
                backgroundColor: theme.palette.primary.light,
              },
            }),
          },
          {
            props: { variant: 'contained', color: 'secondary' },
            style: ({ theme }) => ({
              backgroundColor: theme.palette.secondary.main,
              color: theme.palette.text.primary,
              '&:hover': {
                backgroundColor: theme.palette.secondary.background,
              },
            }),
          },
          {
            props: { variant: 'contained', color: 'success' },
            style: ({ theme }) => ({
              backgroundColor: theme.palette.success.light,
              '&:hover': {
                backgroundColor: theme.palette.success.background,
              },
            }),
          },
          {
            props: { variant: 'outlined' },
            style: ({ theme }) => ({
              '&:hover': {
                border: '1px solid',
                backgroundColor: theme.palette.background.light,
              },
            }),
          },
        ],
        styleOverrides: {
          sizeSmall: {
            fontSize: '14px',
            padding: '8px 24px',
          },
          sizeMedium: {
            fontSize: '16px',
            padding: '12px 24px',
          },
          root: ({ theme }) => ({
            borderRadius: theme.spacing(3),
            fontWeight: 500,
            lineHeight: 1.25,
            borderColor: theme.palette.primary.main,
            textTransform: 'none',
            '&:hover': {
              boxShadow: 'none',
            },
            '&:disabled': {
              color: theme.palette.text.primary,
              backgroundColor: theme.palette.background.disabled,
            },
          }),
          outlined: {
            border: '1px solid transparent',
          },
          contained: {
            backgroundColor: theme.palette.background.light,
          },
          sizeLarge: { fontSize: '16px' },
        },
      },
      MuiPaper: {
        defaultProps: {
          elevation: 0,
        },
        styleOverrides: {
          outlined: ({ theme }) => ({
            borderWidth: 2,
            borderColor: theme.palette.border.light,
          }),
          root: {
            borderRadius: '8px !important',
            backgroundImage: 'none',
          },
        },
      },
    },
  })
}

export default initTheme
