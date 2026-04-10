function Button({children}){

  return(

    <button className="bg-white text-black px-5 py-2 rounded-lg hover:opacity-80 transition">

      {children}

    </button>

  )

}

export default Button