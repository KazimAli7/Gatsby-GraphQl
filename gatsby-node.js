const fetch = require('node-fetch')
const path = require(`path`)
exports.createPages = async ({ actions:{ createPage }}) => {
  const page = 1;
    var query = `query getAllPost($page: Int){
      getAllPost(page: $page){
        info {
          count
        }
        result {
          _id
          slug
        }
    }
    }`;
  const data = await fetch('http://18.222.170.161:4000/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query,
            variables: { page },
        })
    }).then(r => r.json())
    .then(data => {
        return data.data.getAllPost.result
    })
  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  if (data.length > 0) {
    data.forEach((post, index) => {
      console.log('dasadsa', post)
      const previousPostId = index === 0 ? null : data[index - 1]._id
      const nextPostId = index === data.length - 1 ? null : data[index + 1]._id

      createPage({
        path: post.slug,
        component: blogPost,
        context: {
          id: post._id,
          previousPostId,
          nextPostId,
        },
      })
    })
  }
}
