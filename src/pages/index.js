import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import BlogView from "./BlogView";

class BlogIndex extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      result : []
    }
  }

  async componentDidMount(){
    const page = 1;
    var query = `query getAllPost($page: Int){
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
    }`;
    fetch('http://18.222.170.161:4000/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query,
            variables: { page },
        })
    })
    .then(r => r.json())
    .then(data => {
        const postID = data.data
        this.setState({
            result: postID
        })
    });
  }

  render(){
    if(this.state.result && this.state.result){
      return(
        <Layout>
          <BlogView data={this.state.result.getAllPost} />
        </Layout>
      )
    } else {
      return <div>
      <SEO title="Great Gatsby" />
          <p>
            No blog posts found. Add markdown posts to "content/blog" (or the
            directory you specified for the "gatsby-source-filesystem" plugin in
            gatsby-config.js).
          </p>
    </div>;
    }
  }
}

export default BlogIndex
