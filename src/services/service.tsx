import { gql } from "@apollo/client";

export const GET_POST_CONTENT = gql`query
getPostById($id: ID!){
  getAllPost(id: $id){
    title
    subtitle
    slug
    content
    tags
    metaRobots
    thumbnail
    status
  }
}
`;
