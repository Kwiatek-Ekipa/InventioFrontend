import { definePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';

export const ThemePreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{teal.50}',
      100: '{teal.100}',
      200: '{teal.200}',
      300: '{teal.300}',
      400: '{teal.400}',
      500: '{teal.500}',
      600: '{teal.600}',
      700: '{teal.700}',
      800: '{teal.800}',
      900: '{teal.900}',
      950: '{teal.950}',
    },

    colorScheme: {
      light: {
        color: '{teal.400}',
        inverseColor: '{teal.50}',
        hoverColor: '{teal.500}',
        activeColor: '{teal.600}',
      },
    },
  },
});
