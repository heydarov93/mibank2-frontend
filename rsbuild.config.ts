import { defineConfig, loadEnv, type RsbuildConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginSvgr } from '@rsbuild/plugin-svgr';

const { publicVars, rawPublicVars } = loadEnv({ prefixes: ['REACT_APP_'] });

const config: RsbuildConfig = {
  plugins: [pluginReact(), pluginSvgr({ mixedImport: true })],
  source: {
    define: {
      ...publicVars,
      'process.env': JSON.stringify(rawPublicVars),
    },
  },
  html: {
    template: './public/index.html',
  },
  output: {
    distPath: { root: 'build' },
    polyfill: 'usage',
  },
};

export default defineConfig(config);
