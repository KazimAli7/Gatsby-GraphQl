// import { useQuery } from '@apollo/client';
import { Link, navigate } from 'gatsby';
import React from 'react';
import SEO from '../components/seo';
import './BlogView.css'

const BlogView = ({ data }) => {
    const JsonView = value => {
        const jsonValue = JSON.parse(value)
        if(jsonValue){
            return(
                <p className="description">
                    {
                        jsonValue[0].content ?
                        jsonValue[0].content.map((item, index) => (
                            <>
                                {item.text}
                            </>
                        ))
                        :
                        null
                    }
                </p>
            )
        } else {
            return <div>
                Nothing found
            </div>
        }
    }

    return(
        <div>
        <SEO title="All Post" />
            {
                data ?
                <div>
                    <div className="flex justify-between">
                        <div className="mainHeader"> All Posts </div>
                        <Link to="/PostView/AddPost">
                            <button className="bg-purple-600 h-8 rounded w-32 text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50">
                                Add Post
                            </button>
                        </Link>
                    </div>
                    <article 
                        className="post-list-item"
                            itemScope
                            itemType="http://schema.org/Article"
                    >
                        {
                            data.result.map((item) => {
                                return(
                                    <div className="blog-post-preview" key={item._id}>
                                            <Link to="/ApiCall" state={{ postID: item._id}}>
                                                <header>
                                                    <div
                                                        className="headerView"
                                                    >
                                                        <span itemProp="headline">
                                                            {item.title ? item.title : ''}
                                                        </span>
                                                    </div>
                                                </header>
                                            </Link>
                                        <section>
                                            {
                                                item.content ?
                                                JsonView(item.content)
                                                :
                                                null
                                            }
                                            </section>
                                    </div>
                                )
                            })
                        }
                    </article>
                </div>
                :
                <div>
                    Data is being loaded
                </div>
            }
        </div>
    )
}

export default BlogView;
