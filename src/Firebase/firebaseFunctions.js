import { collection, getDocs } from "firebase/firestore"; 
import {db} from "../Firebase/firebaseConfig";
export async function getBlogEntries(){

    try
    {    
         const postsCollection = collection(db, "blog");

         const querySnapshot = await getDocs(postsCollection);
         
         const postsData = querySnapshot.docs.map((doc) => doc.data());
         
         return postsData;
    }
     catch (e)
    {
         console.error(e.toString());
         throw e;
    }
 
 }
export async function getBlogEntry(title){
    var posts = await getBlogEntries();
    console.log(posts);
    var post = posts.find((entry) => entry.title === title);
    if(post){
        console.log("congrats")
        return post
    }
    else{
        console.log("L:")
    }
    

}