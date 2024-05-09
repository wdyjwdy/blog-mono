import { DocsThemeConfig } from 'nextra-theme-docs'

const config: DocsThemeConfig = {
  head: (
    <>
      <link rel='icon' href='/site/logo.png'/>
    </>
  ),
  logo: (
    <>
      <img src='/site/logo.png' width={40} height={40} alt='logo'/>
      <span style={{fontWeight: 800, paddingLeft: '10px'}}>Code Umbrella</span>
    </>
  ),
  useNextSeoProps() {
    return {
      titleTemplate: '%s'
    }
  },
  primaryHue: 340,
  primarySaturation: 70,
  search: {
    placeholder: 'Search'
  },
  sidebar: {
    defaultMenuCollapseLevel: 1,
  },
  toc: {
    title: null
  },
  editLink: {
    component: null
  },
  feedback: {
    content: null
  },
  navigation: false,
  footer: {
    component: <></>
  },
  darkMode: false,
}

export default config
