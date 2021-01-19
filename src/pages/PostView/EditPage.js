import React from 'react'
import { Link, navigate } from 'gatsby'
import SEO from '../../components/seo';
import Layout from '../../components/layout';

export default class EditPage extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            result: [],
            ID: '',
            title:'',
            subtitle:'',
            content:'',
        }
    }
    
    async componentDidMount(){
        const id = this.props.location.state.postID;
        console.log("dsadasd", this.props.location.state.postID)
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

    handleSubmit = () =>{
        navigate("/")
    }

    render(){
        console.log("dsadasd", this.state.ID)
        return(
            <Layout>
                <div class="bg-grey-lighter min-h-screen flex flex-col">
                    <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                        <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                            <h1 class="mb-8 text-3xl text-center">EDIT POST</h1>
                            <input 
                                type="text"
                                class="block border border-grey-light w-full p-3 rounded mb-4"
                                name="title"
                                placeholder="Add Title" 
                                // onChange={this.handleChange}
                            />

                            <input 
                                type="text"
                                class="block border border-grey-light w-full p-3 rounded mb-4"
                                name="subtitle"
                                placeholder="Subtitle" 
                                // onChange={this.handleChange}
                            />

                            <textarea 
                                type="text"
                                class="block border border-grey-light w-full p-3 rounded mb-4"
                                name="password"
                                placeholder="Content" 
                                // onChange={(e) => this.addingContent(e.target.value)}
                            />
                            <button
                                type="submit"
                                onClick={() => this.handleSubmit()}
                                class="w-full bg-purple-600 text-center py-3 rounded bg-green text-white hover:bg-green-dark focus:outline-none my-1"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </Layout>
        )
    }

}
