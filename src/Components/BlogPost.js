
import React, { Component } from 'react';
import { Header } from "./Header";
import { useLocation, Link, useParams} from "react-router-dom";
import {getBlogEntry} from "../Firebase/firebaseFunctions";
import { convertUnixTimestampToLongDate } from "../Functions/ParsingFunctions";
function BlogPostFunction(){
    // wrapper function so users can go directly to a blog post from a link 
    let location = useLocation();
    let params = useParams();

    return(<BlogPost router = {{location, params}}/>)
}
class BlogPost extends React.Component
{
    constructor(props) {
        // b/c it extends react.component, need to get parent elements  
        super(props);
    

        // initial state - get correct state either from location (from link) or from the state that's passed in at the blog level
        this.state = {
          title: "You found a non existent page!",
          date: "",
          text: "",
          color: "purple",
          subsections: [],
        };
      }
    getPostInfo = async() => {
        try
        {
            const location  = this.props.router.location;
            

            // location && location.state to make sure that we're not at a null location basically
            if(location && location.state){
                // if we get to this point from the set of blog posts at the Blog level - then can use the passed in "location"
                // in order to  get the correct state for the blog post 

                this.setState({
                    title : location.state.title,
                    date : location.state.date,
                    text : location.state.text,
                    color : location.state.color,
                    subsections :location.state.subsections,

                })
               
            } else 
            {
                
                // link from the url 
                let link = this.props.router.params.postId;
                // getting the title from the link
                var title = link.split('_').join(' ');
                // this calls into a database iirc 
                var postInfo = await getBlogEntry(title);

                var date = convertUnixTimestampToLongDate(postInfo.date.seconds);

                //TODO: get color 
                // setting the state from the getBlogEntry call
                this.setState({
                    title : postInfo.title,
                    date : date,
                    text : postInfo.text,
                    subsections:postInfo.paragraphs

                })
        
            }
        }
        catch(e){
            // if an error- return nothing (probably not best practice)
            return null;
        }
    }
   
    componentDidMount(){
        // if the component basically gets added to the DOM tree, then try to get post info
        this.getPostInfo();
    }
    render(){
        // styles for each post
        var titleStyle = `mx-6 flex-grow text-4xl text-center text-${this.state.color}-400 font-TrapBold`;
        var dateStyle = `mx-6 text-xl text-${this.state.color}-200 font-TrapBold`;
        var textStyle = `mx-12 text-xl text-${this.state.color}-200 font-TrapRegular`;
        var clickStyle = `mx-12 text-xl text-${this.state.color}-400 font-TrapBold hover:underline`;
        var subsectionGraphics = GenerateSubsections(this.state.subsections,this.state.color);
        
        return(
            // this is here b/c you need to return only one item - can use <> and </>
            <>
            
            <div  className="selection:bg-gray-700 bg-fixed bg-gray-800 min-w-screen-xl min-h-screen min-height-screen">
            <Header/>
            <Link to="/blog" className = {clickStyle} > go back </Link>
                <div className = "m-6 flex grid grid-columns-1 place-items-center">
                    <h1 className={titleStyle} > {this.state.title} </h1>
                    <h2 className={dateStyle}> {this.state.date} </h2>
                    <div>
                        
                    {subsectionGraphics}
                </div>
                </div>
                
    
    
            </div>
            </>
        );

    }



}
function GenerateSubsections(subsections, color)
{
    // these functions basically handle how I deal with paragraphs and subsections 
    // the pattern here (and with paragraphs) is just have a function that gets everything into a list, and then have another component that actually handles styling
    
    var graphics = []
    if (!subsections){
        return graphics;
    }
    var i = 0
    
    subsections.forEach(element => {
        console.log("subtitle:")
        console.log(element.subtitle);
        console.log("paragraphs:")
        console.log(element.paragraphs)

        graphics.push(<GenerateSubsection paragraphs={element.paragraphs?? false} color={color} subtitle={element.subtitle} text={element.text} index={i} />)
    });
    return graphics;
}
function GenerateSubsection({color, subtitle,text, index, image, paragraphs})
{
    // getting style
    var subTitleStyle = `mx-6 flex-grow text-2xl text-${color}-400 font-TrapBold`;
    var dateStyle = `mx-6 text-xl text-${color}-200 font-TrapBold`;
    var textStyle = `indent-6 leading-relaxed mx-12 text-xl text-${color}-100 font-TrapRegular`;
    var clickStyle = `hover:underline mx-5 text-xl text-${color}-400 font-TrapBold mb-20`;
    console.log("in in in");
    console.log(subtitle);
    console.log(paragraphs)
    var paragraphGraphics = []
    console.log("paragraphhhsss")
    console.log(paragraphs);
    if(paragraphs){
        console.log("paragraphs is true");
        paragraphGraphics = GenerateParagraphs(paragraphs, color);
    }
    
   console.log("paragraph graphics, paragraph is true");
   console.log(paragraphGraphics);
    return(
        <div key={index} className=" m-6 flex grid grid-columns-1 place-items-left selection:bg-gray-700 bg-fixed bg-gray-800 max-w-screen-xl m-4">
                <h1 className={subTitleStyle}> {subtitle}</h1>

                <p className={textStyle}> {text} </p>
                {paragraphGraphics}
                <div className="bg-gray-800" style={{ marginBottom: '20px' }}></div>
        </div>
    );
}
function GenerateParagraphs(paragraphs, color){
    var graphics = []
    console.log("paragraphs in GenerateParagraphs");
    console.log(paragraphs)
    if(paragraphs){

        paragraphs.forEach(element => {
            console.log(element);
            graphics.push(<GenerateParagraph paragraph={element} color={color}/>)
        });
    }
   return graphics;
}
function GenerateParagraph({paragraph,color,index}){
    var paragraphStyle = ` indent-6 leading-relaxed mx-12 text-xl text-${color}-100 font-TrapRegular`;
    return(
    <>
        <p className={paragraphStyle}> {paragraph} </p>
        <br/>
    </>)

}
export default BlogPostFunction;