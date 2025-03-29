import React, { ReactNode } from 'react'
import AllFilters from './components/AllFilters'
import { CodeSnippetProvider } from './components/CodeSnippetContext'
import Header from './components/Header'
const CodeSnippet = React.lazy(() => import('./components/CodeSnippet'))

export default function App(): ReactNode {
  return (
    <CodeSnippetProvider>
      <Header />
      <AllFilters />
      <CodeSnippet />
    </CodeSnippetProvider>
  )
}
