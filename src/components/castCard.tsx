import type { cast } from "../types/types"

export default function CastCard({ data }: { data: cast }) {

    const bg = "https://image.tmdb.org/t/p/w500" + data.profile_path;
    const b = { backgroundImage: `url(${bg})` }

  return (
   <div className="flex flex-col items-center gap-2 mx-2 w-20 shrink-0">
      
      <div
        className="w-16 h-20 rounded-xl bg-cover bg-center bg-no-repeat shrink-0"
        style={{
          backgroundImage: data.profile_path
            ? `url(https://image.tmdb.org/t/p/w185${data.profile_path})`
            : "none",
          backgroundColor: "var(--color-muted)",
        }}
      />

      <p className="text-text text-xs text-center font-medium leading-tight line-clamp-2 w-full">
        {data.name}
      </p>

      <p className="text-muted text-xs text-center leading-tight line-clamp-2 w-full">
        {data.character}
      </p>

    </div>

  )
}
