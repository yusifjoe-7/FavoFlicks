import { Link } from "react-router-dom"

export default function NotFound() {
  return (
    <div className="relative min-h-screen bg-bg flex justify-center overflow-hidden">

      {/* Background flickering effect */}
      <div className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, var(--accent) 2px, var(--accent) 4px)",
          animation: "flicker 8s infinite"
        }}
      />

      <div className="relative z-10 flex flex-col items-center justify-center gap-6 slideFade w-full text-center px-4">

        {/* Glitchy 404 */}
        <div className="relative">
          <h1
            className="text-accent curseve select-none"
            style={{
              fontSize: "clamp(6rem, 20vw, 14rem)",
              lineHeight: 1,
              animation: "glitch 3s infinite",
              textShadow: "3px 0 var(--muted), -3px 0 var(--accent)"
            }}
          >
            404
          </h1>
        </div>

        {/* Creative text */}
        <p className="text-accent curseve text-2xl">
          Reel not found 🎬
        </p>
        <p className="text-muted text-sm max-w-sm">
          Seems like this page took a day off... or maybe it never existed.
          Either way, there's nothing to watch here.
        </p>

        {/* Back button */}
        <Link to={'/'}>
        <div className="mt-4 px-8 py-3 border border-accent text-accent curseve text-lg rounded-md 
                     hover:bg-accent hover:text-bg transition-all duration-300 hover:scale-105">
                        Back to Home →
                     </div>
        </Link>
      </div>

      

    </div>
  )
}