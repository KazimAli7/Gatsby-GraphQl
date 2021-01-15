import React from 'react';
import { gql, useQuery } from '@apollo/client';
import BlogView from './BlogView'
import SEO from '../components/seo';

const GET_GREETING = gql`query
    getAllPost($page: Int){
      getAllPost(page: $page){
        info {
          count
        }
        result {
          _id
          title
          subtitle
          content
          slug
        }
    }
    }
`;

// const GET_GREETING = gql`query
//     getAllPost($page: page){
//         result {
//             title
//         }
//     }
// `;
function Hello() {
  const { loading, error, data } = useQuery(GET_GREETING, {
    variables: { page: 1 },
  });
  if (loading) return <div>
    <SEO title="Great Gatsby" />
        {/* <Bio /> */}
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
  </div>;
  if(data.getAllPost !== undefined){
    return(
      <div>
        <BlogView data={data.getAllPost} />
      </div>
    )
  } else {
    return <div>
    <SEO title="Great Gatsby" />
        {/* <Bio /> */}
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
  </div>;
  }
}

export default Hello;
