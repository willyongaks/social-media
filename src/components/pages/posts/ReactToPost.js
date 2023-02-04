import React, { useState} from 'react';
import { Base_Post_Url } from '../../../constants/url/BaseUrl';
import { token } from '../../../constants/url/BaseUrl';



const url = Base_Post_Url + "posts";

 




function ReactToPost({id, symbol, reactions}) {
    const [isReact, setIsReact ] = useState(false);
    const [postId, setPostId] = useState(null);
    const [count, setCount] = useState(reactions);

    const encodedSymbol = encodeURIComponent(symbol);

    async function onSubmit(){
        
        try{
            const response = await fetch(`${url}/${id}/react/${encodedSymbol}`,{
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if(response.ok){
                const results = await response.json();
                if(results.id){
                    setPostId(results.id);
                    setIsReact(true);
                    setCount(results.count);
                }
                
            

            }else{
                console.log('Error', response.statusText)
            }
            
            

        }catch(error){
            console.log(error)
        }
    }



  return (
    <>  
        {postId && <p className="post-id">Post ID: {postId}</p>}
        <button onClick={onSubmit} type="button" className="btn btn-primary m-2">
            {isReact ? symbol : symbol} <span className="badge bg-secondary">{count}</span>
        </button>
    </>
  )
}

export default ReactToPost