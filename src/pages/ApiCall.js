import React from 'react'
import SEO from '../components/seo'
import Layout from "../components/layout"
import './BlogView.css'

export default class ApiCall extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            result: [],
            ID: '5fff4f10b9f70d6b03baebf7'
        }
    }
    
    componentDidMount(){
        const id = this.props.location.state.postID;
        console.log('data returned:', this.props.location.state.postID)
        var query = `query getPostById($id: ID!) {
            getPostById(id: $id){
                title
                subtitle
                slug
                content
                tags
                metaRobots
                thumbnail
                status
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
                variables: { id },
            })
        })
        .then(r => r.json())
        .then(data => {
            const postID = data.data.getPostById
            this.setState({
                result: postID
            })
        });
    }

    displayContent = (value) => {
        const jsonValue = JSON.parse(value)
        const result = jsonValue.filter((item, index) =>{
            if(item.content){
                return item
            }
        })
        console.log('data view here',  result)
        return(
            <div>
                {
                    result.map((item, index) =>(
                        <ul>
                        {
                            item.content
                            ? 
                            item.content.map((i, ind) =>(
                                <li className="descriptionView">
                                    {i.text ? i.text : null}
                                </li>
                            ))
                            :
                            null
                        }
                        </ul>
                    ))
                }
            </div>
        )
    }

    render(){
        console.log("dasdsadsa", this.state.result.content)
        return(
            <Layout>
                <SEO title={this.state.result.title ? this.state.result.title : "All Post"} />
                <header>
                    <div className="headerView">
                        <span>
                            {this.state.result.title ? this.state.result.title : 'Post Title'}
                        </span>
                    </div>
                </header>
                <main>
                    {
                        this.state.result.content
                        ?
                        this.displayContent(this.state.result.content)
                        :
                        null
                    }
                </main>
            </Layout>
        )
    }

}
