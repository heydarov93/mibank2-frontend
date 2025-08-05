import '@mui/material/styles/createTypography';
import { CSSProperties } from 'react';

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
    secondaryText?: {
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
    secondaryText?: {
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

  interface TypographyVariants {
    secondaryText: CSSProperties;
  }

  interface TypographyVariantsOptions {
    secondaryText?: CSSProperties;
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
    userCardStack: {
      card1: string;
      card2: string;
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
    userCardStack: {
      card1: string;
      card2: string;
    };
  }
}

declare module '@mui/material/Button' {
  interface ButtonOwnProps {
    boxShadow?: true;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    secondaryText: true;
  }
}
