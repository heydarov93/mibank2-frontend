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
  type LogoSize = 'sm' | 'md' | 'lg' | 'xl';

  interface LogoSizeConfig {
    iconSize: string;
    fontSize: string;
  }

  type LogoSizes = Record<LogoSize, LogoSizeConfig>;
  interface Theme {
    animations?: {
      shake?: Keyframes;
    };
    logo: LogoSizes;
  }

  interface ThemeOptions {
    animations?: {
      shake?: Keyframes;
    };
    logo?: Partial<LogoSizes>;
  }
}

declare module '@mui/material/styles' {
  interface Palette {
    border: {
      lightBlue: string;
    };
    bg: {
      lightBlue: string;
    };
    shadow: {
      shadowLight: string;
      shadowCoolLight: string;
      shadowMedium: string;
    };
    disabled: {
      blue: string;
    };
  }

  interface PaletteOptions {
    border: {
      lightBlue: string;
    };
    bg: {
      lightBlue: string;
    };
    shadow: {
      shadowLight: string;
      shadowCoolLight: string;
      shadowMedium: string;
    };
    disabled: {
      blue: string;
    };
  }
}

declare module '@mui/material/Button' {
  interface ButtonOwnProps {
    boxShadow?: true;
  }
}
