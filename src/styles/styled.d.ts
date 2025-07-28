import 'styled-components';
import { Theme } from './theme';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: Theme['colors'];
    shadows: Theme['shadows'];
    transitions: Theme['transitions'];
    spacing: Theme['spacing'];
    borderRadius: Theme['borderRadius'];
    fontSizes: Theme['fontSizes'];
    fontWeights: Theme['fontWeights'];
    breakpoints: Theme['breakpoints'];
  }
} 