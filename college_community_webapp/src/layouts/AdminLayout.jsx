import { useState } from "react";
import AdminSidebar from "../admin/AdminSidebar";
import AdminNavbar from "../admin/AdminNavbar";

function AdminLayout({ children }) {

const [isOpen,setIsOpen] = useState(false)

return(

<div className="flex">

<AdminSidebar isOpen={isOpen}/>

<div className={`flex-1 transition-all duration-300 ${isOpen ? "ml-64" : "ml-0"}`}>

<AdminNavbar toggleSidebar={()=>setIsOpen(!isOpen)}/>

<main className="pt-24 px-8">

{children}

</main>

</div>

</div>

)

}

export default AdminLayout