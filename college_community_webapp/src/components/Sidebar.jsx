import { Link } from "react-router-dom"

function Sidebar({isOpen}){

return(

<aside
className={`fixed top-0 left-0 h-full w-64 bg-[#fff7ef] border-r border-[#ead7c9]
shadow-lg rounded-r-3xl pt-24 px-6
transition-transform duration-300
${isOpen?"translate-x-0":"-translate-x-full"}`}
>

<nav className="flex flex-col gap-6 text-[15px]">

<Link to="/dashboard">Dashboard</Link>
<Link to="/community">Community</Link>
<Link to="/events">Events</Link>
<Link to="/clubs">Clubs</Link>
<Link to="/announcements">Announcements</Link>
<Link to="/profile">Profile</Link>

</nav>

</aside>

)

}

export default Sidebar