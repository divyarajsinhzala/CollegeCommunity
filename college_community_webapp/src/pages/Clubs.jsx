import UserLayout from "../layouts/UserLayout"
import { useNavigate } from "react-router-dom"

const clubs = [
{ name:"AI Club"},
{ name:"Hackathon Team"},
{ name:"Football Club"}
]

function Clubs(){

const navigate = useNavigate()

return(

<UserLayout>

<h1 className="text-3xl font-bold mb-8">
Clubs
</h1>

<div className="grid grid-cols-3 gap-6">

{clubs.map((club,i)=>(

<div
key={i}
className="bg-white p-6 rounded-xl shadow"
>

<h2 className="text-lg font-semibold mb-4">
{club.name}
</h2>

<button
onClick={()=>navigate("/community")}
className="bg-black text-white px-4 py-2 rounded"
>

Open Chat

</button>

</div>

))}

</div>

</UserLayout>

)

}

export default Clubs