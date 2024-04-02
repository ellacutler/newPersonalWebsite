
import { BrowserRouter, Routes, Route } from "react-router-dom";

import {Home} from "./Home.js"
import Blog from "./Blog.js"
import BlogPostFunction from "./BlogPost.js";

export default function App() {
  return (
    
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/blog" element={<Blog />}/>
      <Route path="/blog/:postId" element={<BlogPostFunction />} />

    </Routes>
    </BrowserRouter>
    
  //  <h1> hello </h1>
  );
}
