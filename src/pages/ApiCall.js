import React from 'react'
import SEO from '../components/seo'
import Layout from "../components/layout"
import './BlogView.css'
import { Link } from 'gatsby'

export default class ApiCall extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            result: [],
            ID: ''
        }
    }
    
    async componentDidMount(){
        const id = this.props.location.state.postID;
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
        const result = await fetch('http://18.222.170.161:4000/', {
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
            return postID
        });
        this.setState({
            result: result,
            ID: id
        })
    }

    displayContent = (value) => {
        const jsonValue = JSON.parse(value)
        const result = jsonValue.filter((item, index) =>{
            if(item.content){
                return item
            }
        })
        console.log('dasdasd', result)
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
        console.log("dsadasd", this.state.ID)
        return(
            <Layout>
                <SEO title={this.state.result.title ? this.state.result.title : "All Post"} />
                <header>
                    <div className="headerView">
                        <span>
                            {this.state.result.title ? this.state.result.title : 'Post Title'}
                        </span>
                        <Link 
                            to="/PostView/EditPage" 
                            state={{
                                postID: this.state.ID
                            }}
                            >
                            <svg className="h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                        </Link>
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
