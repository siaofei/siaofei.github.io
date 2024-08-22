import { latte } from '@catppuccin/vscode'
import { pluginCollapsibleSections } from '@expressive-code/plugin-collapsible-sections'
import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers'
import { defineEcConfig } from 'astro-expressive-code'

export default defineEcConfig({
  // You can set configuration options here
  plugins: [pluginLineNumbers(), pluginCollapsibleSections()],
  defaultProps: {
    showLineNumbers: true,
    overridesByLang: {
      'ansi, bash, bat, batch, cmd, console, powershell, ps, ps1, psd1, psm1, sh, shell, shellscript, shellsession, zsh':
        {
          showLineNumbers: false,
        },
    },
  },
  themes: [latte],
  styleOverrides: {
    // You can also override styles
    codeFontFamily: 'var(--ec-code-font-family)',
    codeFontSize: 'var(--ec-code-font-size)',
    codeLineHeight: 'var(--ec-code-line-height)',
    uiFontFamily: 'var(--ec-ui-font-family)',
    uiFontSize: 'var(--ec-ui-font-size)',
    uiLineHeight: 'var(--ec-ui-line-height)',
  },
})
