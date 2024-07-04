import '@mui/material/styles/createTypography';

declare module '@mui/material/styles/createTypography' {
  interface Typography {
    smallLogo?: {
      fontSize: string;
      lineHeight: string;
      fontFamily: string;
    };
    mediumLogo?: {
      fontSize: string;
      lineHeight: string;
      fontFamily: string;
    };
  }

  interface TypographyOptions {
    smallLogo?: {
      fontSize: string;
      lineHeight: string;
      fontFamily: string;
    };
    mediumLogo?: {
      fontSize: string;
      lineHeight: string;
      fontFamily: string;
    };
  }
}

declare module '@mui/material/styles' {
  interface Theme {
    animations?: {
      shake?: Keyframes;
    };
  }

  interface ThemeOptions {
    animations?: {
      shake?: Keyframes;
    };
  }
}
