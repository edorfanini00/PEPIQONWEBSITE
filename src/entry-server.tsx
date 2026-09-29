import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { AppRoutes } from './App'
import { renderSeoHead } from './lib/seo'
export { pageSeo, legalAliases } from './data/site'
export { homeFaqs } from './data/home-faqs'
export { getPageSeo } from './lib/seo'

export function renderPage(pathname: string) {
  return {
    head: renderSeoHead(pathname),
    body: renderToString(<StrictMode><StaticRouter location={pathname}><AppRoutes /></StaticRouter></StrictMode>),
  }
}
