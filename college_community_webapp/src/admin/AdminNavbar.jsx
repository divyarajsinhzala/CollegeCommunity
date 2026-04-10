function AdminNavbar({ toggleSidebar }) {

return(

<header
className="fixed top-0 left-0 w-full h-16
bg-[#fff7ef] border-b border-[#ead7c9]
flex items-center px-6
z-50"
>

<button
onClick={toggleSidebar}
className="text-2xl mr-4"
>
☰
</button>

<h1 className="text-lg font-semibold">
College Community Admin
</h1>

</header>

)

}

export default AdminNavbar