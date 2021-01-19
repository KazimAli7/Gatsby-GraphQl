import { navigate } from 'gatsby'
import React from 'react'
import Layout from '../../components/layout'

export default class AddPost extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            title:'',
            subtitle:'',
            slug:`post-${Math.random()}`,
            content:[
                {
                    attrs:{
                        ychange:null
                    },
                    content:[
                        {
                            type:'text',
                            text:'',
                        }
                    ],
                    type:"paragraph"
                }
            ],
        }
    }

    handleChange = (event) =>{
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    handleSubmit = async () =>{
        const content = JSON.stringify(this.state.content)
        console.log("Dsadasd", JSON.stringify(this.state.slug))
        const query = JSON.stringify({
            query: `
            mutation{
                addPost(
                    title: "${this.state.title}"
                    subtitle: "${this.state.subtitle}"
                    slug: "post-1601142332121"
                    content: ""
                    tags: []
                    metaRobots: null
                    thumbnail: null
                    status: "live"
                  ){
                    title: title
                    subtitle: subtitle
                    slug: slug
                    content: content
                    tags: tags
                    metaRobots: metaRobots
                    thumbnail: thumbnail
                    status:status
                  }
            }
            `
          });
        
          const response = await fetch('http://18.222.170.161:4000/', {
            headers: {'content-type': 'application/json'},
            method: 'POST',
            body: query,
          });
          if(response){
            navigate("/")
          }
    }

    addingContent = (value) =>{
        const array = [];
        array.push({
            type:'text',
            text:value
        })
        this.state.content[0].content[0].text = value
        this.setState({
            content: this.state.content
        })
    }

    render(){
        return(
            <Layout>
                <div class="bg-grey-lighter min-h-screen flex flex-col">
                    <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                        <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                            <h1 class="mb-8 text-3xl text-center">ADD POST</h1>
                            <input 
                                type="text"
                                class="block border border-grey-light w-full p-3 rounded mb-4"
                                name="title"
                                placeholder="Add Title" 
                                onChange={this.handleChange}
                            />

                            <input 
                                type="text"
                                class="block border border-grey-light w-full p-3 rounded mb-4"
                                name="subtitle"
                                placeholder="Subtitle" 
                                onChange={this.handleChange}
                            />

                            <textarea 
                                type="text"
                                class="block border border-grey-light w-full p-3 rounded mb-4"
                                name="password"
                                placeholder="Content" 
                                onChange={(e) => this.addingContent(e.target.value)}
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
