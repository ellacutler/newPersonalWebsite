
import { Header } from "./Header";
export function Home(){
// bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-300 via-fuchsia-600 to-orange-600
    return(
        <div className="bg-gray-800">

        <Header/>
        <div className=" selection:bg-gray-700 grid gap-4 bg-fixed min-h-screen min-height-screen bg-gray-800 max-w-screen-xl">
        
           <div className = " m-8"> 
           <h1 className=" my-4 text-3xl text-red-200 font-TrapBold"> Hi! I'm Ella :-) </h1>
           <h1 className=" my-4 text-3xl text-purple-200 font-TrapBold"> I'm a junior at <a target="_blank" className="text-purple-400 hover:underline" href="https://www.northwestern.edu">Northwestern University</a> studying Computer Science with a Design Certificate.</h1>
           <h1 className=" my-4 text-3xl text-blue-200 font-TrapBold"> At school, I participate in <a target="_blank" className="text-blue-400 hover:underline" href="https://dtr.northwestern.edu/projects/recxU2iSY4G2bHdCj">DTR</a>, 
           a research lab focusing on HCI. I work on metacognition + early CS education. I also peer mentor for <a target="_blank" className="text-blue-400 hover:underline" href="https://www.mccormick.northwestern.edu/computer-science/academics/courses/descriptions/330-1.html">CS-330</a>, an HCI class at Northwestern.</h1>
           <h1 className=" my-4 text-3xl text-green-200 font-TrapBold"> My sophomore summer, I interned at <a target="_blank" className="text-green-400 hover:underline" href="https://www.se.com/us/en/" >Schneider Electric</a> with the <a target="_blank" className="text-green-400 hover:underline" href="https://myarcfm.schneider-electric.com/myarcfm/s/designer-hfc">DHFC</a> team. </h1>
            <h1> </h1>
            </div>
        </div>
        </div >

    );
}

