import React from 'react';
import axios from 'axios';
import List from './List';
import Nav from './Nav';
import './Nav.css';


class Designers extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            posts: [],
            error: false
        }
    }
   
    componentDidMount() {
        axios.get('https://5a422991e1542700129be910.mockapi.io/imagecard/users')
            .then( response => {
                const posts = response.data;
                const updatedPosts = posts.map(post =>{
                    return{
                        ...post, 
                        author: 'Max'
                    }
                }) 
                this.setState({ posts: updatedPosts });
                //console.log(response);

            }).catch(err => {
                console.log(err);
                if(err){
                    this.setState({
                        error: true
                    })
                }
            });
    }
    render(){
        const posts = this.state.posts.map(post => {
            return <List 
            img={post.imageUrl}
            name={post.name}
            follow={post.followers}
            post = { post }
             />
        });
        return(
            <div className="bg-grey">
                <Nav />
                <section>
                    {/*designer card will be stored here*/}
                    <div className="well mte-22">
                        <p className="text-center">
                            <strong>Hiring Designers? </strong> 
                            Scout gives you unlimited access to the best talent.
                         Find, save, and message designers. &nbsp;
                         <button className="btn btn-success">Learn More</button>
                        </p>
                    </div>
                    { this.state.error ? 'NO NETWORK' : posts }
                    
                    <hr/>
                </section>
            </div>
        );
    }
}

export default Designers;
