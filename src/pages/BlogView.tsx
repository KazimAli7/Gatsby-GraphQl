import { useQuery } from '@apollo/client';
import { Link, navigate } from 'gatsby';
import React from 'react';
import SEO from '../components/seo';
import { GET_POST_CONTENT } from '../services/service';
import './BlogView.css'
const BlogView = ({ data }) => {
    const JsonView = value => {
        const jsonValue = JSON.parse(value)
        if(jsonValue){
            // console.log('data view here',  jsonValue[0].content)
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
            return <div>dasdas</div>
        }
    }

    const apiCall = async() => {
        const result = await useQuery(GET_POST_CONTENT, {
            variables: '60008351b9f70d6b03baebfe'
        })
        console.log('result check here', result)
    }

    return(
        <div>
        <SEO title="All Post" />
            {
                data ?
                <div>
                    <div className="mainHeader"> All Posts </div>
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
                                                        // onClick={() => navigate('/ApiCall', {state: item._id})}
                                                        // onClick={() => apiCall()} 
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
                                                JsonView(item.content)
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
