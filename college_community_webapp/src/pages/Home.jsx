import { Link } from "react-router-dom";

function Home() {
  return (

    <div className="min-h-screen relative bg-[#fdf4ec] text-black overflow-hidden">

      {/* BACKGROUND PATTERN */}
<div
  className="absolute inset-0 pointer-events-none"
  style={{
    backgroundImage: "url('/pattern.png')",
    backgroundSize: "auto",
    backgroundRepeat: "repeat",
    opacity: 0.35
  }}
/>

      {/* CONTENT WRAPPER */}
      <div className="relative z-10">

        {/* NAVBAR */}
        <nav className="flex justify-between items-center p-6 border-b border-[#ead7c9] bg-[#fff7ef]">

          <h1 className="text-xl font-semibold">
            College Community
          </h1>

          <div className="space-x-4">

            <Link
              to="/login"
              className="px-4 py-2 rounded-lg border border-black hover:bg-black hover:text-white transition"
            >
              Log In
            </Link>

            <Link
              to="/register"
              className="px-4 py-2 rounded-lg bg-black text-white hover:opacity-80 transition"
            >
              Sign Up
            </Link>

          </div>
        </nav>

        {/* HERO */}
        <section className="flex flex-col items-center justify-center text-center mt-32 px-6">

          <h1 className="text-5xl font-bold mb-6">
            Welcome to the College Community
          </h1>

          <p className="text-gray-700 max-w-xl mb-8">
            A place where students connect, share ideas, discover events,
            and stay updated with campus life.
          </p>

          <div className="space-x-4">

            <Link
              to="/register"
              className="px-6 py-3 rounded-lg bg-black text-white"
            >
              Get Started
            </Link>

            <Link
              to="/login"
              className="px-6 py-3 border border-black rounded-lg hover:bg-black hover:text-white transition"
            >
              Log In
            </Link>

          </div>

        </section>

        {/* FEATURES */}
        <section className="grid md:grid-cols-3 gap-8 p-12 mt-20">

          <div className="bg-[#fff7ef] p-6 rounded-xl border border-[#ead7c9] shadow-sm">

            <h3 className="text-lg font-semibold mb-2">
              Community Feed
            </h3>

            <p className="text-gray-700">
              Share posts, ideas and interact with students.
            </p>

          </div>

          <div className="bg-[#fff7ef] p-6 rounded-xl border border-[#ead7c9] shadow-sm">

            <h3 className="text-lg font-semibold mb-2">
              Campus Events
            </h3>

            <p className="text-gray-700">
              Discover upcoming events and register easily.
            </p>

          </div>

          <div className="bg-[#fff7ef] p-6 rounded-xl border border-[#ead7c9] shadow-sm">

            <h3 className="text-lg font-semibold mb-2">
              Clubs & Communities
            </h3>

            <p className="text-gray-700">
              Join clubs and collaborate with like-minded students.
            </p>

          </div>

        </section>

      </div>

    </div>

  );
}

export default Home;