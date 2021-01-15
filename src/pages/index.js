import React from "react"
import { graphql } from "gatsby"

// import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Home from './home';
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
const BlogIndex = ({ data, location }) => {
  const siteTitle = 'Great Gatsby' || `Title`
  const posts = data.allMarkdownRemark.nodes
  console.log('checking the data props here', data)
  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <SEO title="Great Gatsby" />
        {/* <Bio /> */}
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri:'http://18.222.170.161:4000/'
  })

  return (
    <Layout>
      <ApolloProvider client={client}>
        <Home />
      </ApolloProvider>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
        }
      }
    }
  }
`
