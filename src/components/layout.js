import React from "react"
import { Link } from "gatsby"
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client"

const Layout = ({ title, children }) => {
  // const rootPath = `${__PATH_PREFIX__}/`
  // const isRootPath = location.pathname === rootPath
  let header

  // if (isRootPath) {
  //   header = (
  //     <h1 className="main-heading">
  //       <Link to="/">{title}</Link>
  //     </h1>
  //   )
  // } else {
    header = (
      <Link className="header-link-home" to="/">
        {title}
      </Link>
    )
  // }
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri:'http://18.222.170.161:4000/'
  })
  return (
    <ApolloProvider client={client}>
      <div className="global-wrapper">
      <header className="global-header">{header}</header>
      <main>{children}</main>
      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
      </footer>
    </div>
    </ApolloProvider>
  )
}

export default Layout
