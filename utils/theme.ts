import { BoxProps, extendTheme, ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const fonts = {
  body: "'Ubuntu', sans-serif",
};

const theme = extendTheme({ config, fonts });

export const postTheme: BoxProps = {
  width: { base: 'sm', md: 'md' },
  p: 3,
  borderRadius: 'md',
  gap: 3,
  boxShadow: 'md',
  overflow: 'hidden',
  transition: 'all 0.3s ease-in-out',
  minWidth: '100%',
  minHeight: '75px',
};

export const commentTheme: BoxProps = {
  width: { base: 'sm', md: 'md' },
  p: 3,
  borderRadius: 'md',
  gap: 3,
  boxShadow: 'md',
  overflow: 'hidden',
  transition: 'all 0.3s ease-in-out',
  minWidth: '100%',
  minHeight: '75px',
};

export default theme;
