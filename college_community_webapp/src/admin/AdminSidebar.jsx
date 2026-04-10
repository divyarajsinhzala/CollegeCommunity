import { Link } from "react-router-dom"

function AdminSidebar({ isOpen }) {

return (

<aside
className={`fixed top-0 left-0 h-full w-64 bg-[#fff7ef] border-r border-[#ead7c9]
shadow-lg rounded-r-3xl pt-24 px-6
transition-transform duration-300 z-40
${isOpen ? "translate-x-0" : "-translate-x-full"}`}
>

<nav className="flex flex-col gap-5 text-[15px] font-medium">

<Link to="/admin">Dashboard</Link>

<Link to="/admin/users">Users</Link>

<Link to="/admin/events">Events</Link>

<Link to="/admin/posts">Community Posts</Link>

<Link to="/admin/announcements">Announcements</Link>

</nav>

</aside>

)

}

export default AdminSidebar
