// Define available themes
export type ThemeName = 'default' | 'dark' | 'melonMania' | 'futuristic' | 'neonPurple';

// Color palette definition
export interface ColorPalette {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: {
    primary: string;
    secondary: string;
  };
  melon: {
    ripe: string;
    unripe: string;
    flesh: string;
    seeds: string;
  };
  ui: {
    panel: string;
    button: {
      background: string;
      hover: string;
      active: string;
      text: string;
      disabled: string;
      glow: string;
    };
    border: string;
  };
}

// Define spacing and sizing constants
export interface Spacing {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

// Define typography
export interface Typography {
  fontFamily: {
    heading: string;
    body: string;
  };
  fontSize: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
  };
  fontWeight: {
    normal: number;
    medium: number;
    bold: number;
  };
}

// Complete theme definition
export interface Theme {
  name: ThemeName;
  colors: ColorPalette;
  spacing: Spacing;
  typography: Typography;
  borderRadius: Spacing;
  shadows: {
    sm: string;
    md: string;
    lg: string;
    glow: string;
  };
  transitions: {
    fast: string;
    medium: string;
    slow: string;
  };
}

// Default theme (keep as is for reference)
const defaultTheme: Theme = {
  name: 'default',
  colors: {
    primary: '#ff6b6b',  // Watermelon red
    secondary: '#51cf66', // Fresh green
    accent: '#fcc419',    // Sunny yellow
    background: '#f8f9fa',
    surface: '#ffffff',
    text: {
      primary: '#212529',
      secondary: '#495057',
    },
    melon: {
      ripe: '#ff6b6b',
      unripe: '#8ce99a',
      flesh: '#ffdeeb',
      seeds: '#495057',
    },
    ui: {
      panel: '#ffffff',
      button: {
        background: '#ff6b6b',
        hover: '#fa5252',
        active: '#e03131',
        text: '#ffffff',
        disabled: '#ced4da',
        glow: 'rgba(255, 107, 107, 0.5)',
      },
      border: '#dee2e6',
    },
  },
  spacing: {
    xs: '0.25rem',  // 4px
    sm: '0.5rem',   // 8px
    md: '1rem',     // 16px
    lg: '1.5rem',   // 24px
    xl: '2rem',     // 32px
  },
  typography: {
    fontFamily: {
      heading: '"Poppins", -apple-system, BlinkMacSystemFont, sans-serif',
      body: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
    },
    fontSize: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      md: '1rem',       // 16px
      lg: '1.25rem',    // 20px
      xl: '1.5rem',     // 24px
      xxl: '2rem',      // 32px
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      bold: 700,
    },
  },
  borderRadius: {
    xs: '0.125rem',  // 2px
    sm: '0.25rem',   // 4px
    md: '0.5rem',    // 8px
    lg: '1rem',      // 16px
    xl: '2rem',      // 32px
  },
  shadows: {
    sm: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    md: '0 3px 6px rgba(0,0,0,0.15), 0 2px 4px rgba(0,0,0,0.12)',
    lg: '0 10px 20px rgba(0,0,0,0.15), 0 3px 6px rgba(0,0,0,0.10)',
    glow: '0 0 10px rgba(255, 107, 107, 0.7)',
  },
  transitions: {
    fast: '0.15s ease',
    medium: '0.3s ease',
    slow: '0.5s ease',
  },
};

// Add new Neon Purple theme based on your requirements
const neonPurpleTheme: Theme = {
  ...defaultTheme,
  name: 'neonPurple',
  colors: {
    primary: '#7928CA',      // Main purple
    secondary: '#FF0080',    // Neon pink
    accent: '#00d4ff',       // Cyan accent
    background: '#1A002A',   // Very dark purple background
    surface: '#2C0A47',      // Slightly lighter purple surface
    text: {
      primary: '#ffffff',
      secondary: '#c4b5fd',  // Light purple for secondary text
    },
    melon: {
      ripe: '#FF0080',       // Neon pink melon
      unripe: '#00d4ff',     // Cyan melon when unripe
      flesh: '#ffcdf9',      // Light pink flesh
      seeds: '#1A002A',      // Dark seeds
    },
    ui: {
      panel: '#2C0A47',      // Panel background
      button: {
        background: '#381c5b', // Slightly lighter than background
        hover: '#4B2A77',      // Even lighter on hover
        active: '#5C3696',     // Pressed state
        text: '#ffffff',
        disabled: '#3e2963',
        glow: 'rgba(162, 89, 255, 0.6)', // Purple glow
      },
      border: '#a259ff',     // Neon purple border
    },
  },
  shadows: {
    sm: '0 1px 3px rgba(162, 89, 255, 0.2), 0 1px 2px rgba(162, 89, 255, 0.14)',
    md: '0 3px 6px rgba(162, 89, 255, 0.25), 0 2px 4px rgba(162, 89, 255, 0.18)',
    lg: '0 10px 20px rgba(162, 89, 255, 0.25), 0 3px 6px rgba(162, 89, 255, 0.18)',
    glow: '0 0 15px rgba(162, 89, 255, 0.7)',
  },
  borderRadius: {
    xs: '0.375rem',  // 6px
    sm: '0.5rem',    // 8px
    md: '0.75rem',   // 12px
    lg: '1.25rem',   // 20px
    xl: '2.5rem',    // 40px
  },
};

// Collection of all available themes
export const themes = {
  default: defaultTheme,
  dark: darkTheme,
  melonMania: melonManiaTheme,
  futuristic: futuristicTheme,
  neonPurple: neonPurpleTheme,
};

// Helper to get a theme by name
export const getTheme = (name: ThemeName): Theme => {
  return themes[name] || themes.default;
};

// Export the neonPurple theme as the default
export default neonPurpleTheme;