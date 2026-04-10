import { Menu } from "lucide-react"

function Navbar({toggleSidebar}){

return(

<nav className="fixed top-0 left-0 right-0 bg-white border-b border-[#f0ded2] z-40 flex justify-between items-center px-8 py-4">

<div className="flex items-center gap-4">

<button onClick={toggleSidebar}>
<Menu size={24}/>
</button>

<div className="flex items-center gap-3">

<div className="bg-black text-white px-3 py-1 rounded-md font-bold">
CC
</div>

<h1 className="text-xl font-semibold">
College Community
</h1>

</div>

</div>

<div className="text-sm">
Student Portal
</div>

</nav>

)

}

export default Navbar