import { useState } from "react"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"

function UserLayout({children}){

const [open,setOpen]=useState(false)

return(

<div>

<Navbar toggleSidebar={()=>setOpen(!open)}/>

<Sidebar isOpen={open}/>

<main
className={`pt-24 p-10 transition-all duration-300
${open?"ml-64":"ml-0"}`}
>

{children}

</main>

</div>

)

}

export default UserLayout