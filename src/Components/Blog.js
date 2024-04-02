import React, { useState, useRef} from "react";
import { Header } from "./Header";
import {useNavigate} from "react-router-dom";
import {getBlogEntries} from "../Firebase/firebaseFunctions";
import { convertUnixTimestampToLongDate } from "../Functions/ParsingFunctions";

async function generateGraphics(){
    // generating react components for each blog post entry



    var posts = await getBlogEntries(); // awaiting database retrieval 

    var graphics = [];


    var i = 0;
    posts.forEach(element => {
        graphics.push(<GenerateGraphic title={element.title?? "false"} date={element.date ?? "false"} text={element.text ?? "false"} subsections={element.paragraphs} index={i}/>);
        i++; // using the index to change colors for each post 
    });
   
    console.log(graphics);

    return graphics;
}

function GenerateGraphic({title, date, text, index, subsections}){
    // styles and dates:

    var formatedDate = convertUnixTimestampToLongDate(date.seconds);
    // colors:
    var colors = ["purple","indigo","green"];
    var color = colors[index];

    var titleStyle = `mx-6 flex-grow text-3xl text-${color}-400 font-TrapBold`;
    var dateStyle = `mx-6 text-xl text-${color}-200 font-TrapBold`;
    var textStyle = `mx-12 text-xl text-${color}-200 font-TrapRegular`;
    var clickStyle = `hover:underline mx-5 text-xl text-${color}-400 font-TrapBold`;

    let navigate = useNavigate();
    // making link 
    var link = title.split(' ').join('_');
    
    
    // setting up active/inactive states 
    const [active, setActive] = useState(false);
    // function that handles if a blog item is clicked 
    const handleClick = () => {
        
        
        // setting active and navigating with correct state - passing state from the original post to the longer viewer
        setActive(!active);
        // navigating to the correct link and passing in the relevant state 
        navigate
        ( `/blog/${link}`, 
        {state:
            {
                title:title,
                date:formatedDate, 
                text:text,
                color:color,
                subsections:subsections
            }
        }
        );
        
    }


 
    // returning an individual blog post 
    return(
        <div key={index} className="selection:bg-gray-700 bg-fixed bg-gray-800 max-w-screen-xl">

           <div className = "m-6 flex flex-row items-end">
                
                <h1 tabIndex="0" className={titleStyle} > {title} </h1>
                <h2 className={dateStyle}> {formatedDate} </h2>
                
            </div>
            <div>

                <p  className={textStyle}> {text.toString().slice(0, 300) } <a  tabIndex="0" className={clickStyle} onKeyDown={handleClick} onClick={handleClick}> ... click to read more </a>  </p>
                
            </div>
        </div>
    );
}

class Blog extends React.Component{
    state = 
    {
        // before loading the posts - empty posts 
        Posts: []
    }
     // function to render the posts  
     renderBlog = async() => {
        try{
            
            var graphics = await generateGraphics();
            
            const graphicItems = (
                <div >
                    {/* TODO: new header*/}
                    <Header/> 
                    {graphics}
                </div>)
            this.setState({
                Posts: graphicItems
            })
            console.log(graphics);
            
        }
        catch (e) {
            return null;
        }
 
    }
    // if the component initiated properly, then try to retrieve the blog entries and set their graphics to "post"
    componentDidMount(){
        this.renderBlog();
    }
    render(){

        return(
            // div is here to make sure that the entire background is the correct color - tailwind can be annoying with this
            <div className="bg-gray-800  min-h-screen min-height-screen ">
                
                {this.state.Posts}
            </div>
        );
    }

}
export default Blog;
