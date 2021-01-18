import * as React from 'react'
import { useQuery } from "@apollo/client";
import { GET_POST_CONTENT } from "../services/service";

const PostView = ({}) => {

    const { data, loading } = useQuery(GET_POST_CONTENT, {
        variables:{ id :'60008351b9f70d6b03baebfe'}
    })
    console.log('data checking here', data, loading);
    return(
        <div>
            sadasdas
        </div>
    )
}

export default PostView;
