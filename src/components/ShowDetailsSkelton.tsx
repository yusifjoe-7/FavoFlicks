const ShowDetailsSkelton = () => {
  return (
    <div className="w-full bg-bg flex flex-col items-center">
      {/* Backdrop */}
      <div className="w-full h-60 bg-neutral-800 animate-pulse sticky" />
 
      <div className="w-[90%]">
        <div className="flex justify-between">
          {/* Poster */}
          <div className="sm:w-35 w-25 sm:h-52 h-37 rounded-xl bg-neutral-800 animate-pulse relative bottom-13 z-30" />
 
          {/* Info */}
          <div className="lg:mr-30 sm:mr-15 ms:mr-5 mr-1 mt-5 sm:mb-0 mb-3 flex flex-col items-center gap-2">
            <div className="sm:w-56 w-36 sm:h-8 h-5 bg-neutral-800 animate-pulse rounded-md" />
 
            <div className="flex gap-3 sm:m-3 m-1 sm:flex-row flex-col">
              <div className="w-20 h-7 bg-neutral-800 animate-pulse rounded-2xl" />
              <div className="w-18 h-7 bg-neutral-800 animate-pulse rounded-2xl" />
              <div className="w-16 h-7 bg-neutral-800 animate-pulse rounded-2xl" />
            </div>
 
            <div className="w-32 h-4 bg-neutral-800 animate-pulse rounded-md" />
            <div className="w-36 h-4 bg-neutral-800 animate-pulse rounded-md" />
            <div className="hidden sm:block w-28 h-9 bg-neutral-800 animate-pulse rounded-xl" />
          </div>
        </div>
 
        {/* Overview */}
        <div className="space-y-2 mt-1">
          <div className="w-full h-3 bg-neutral-800 animate-pulse rounded-md" />
          <div className="w-[92%] h-3 bg-neutral-800 animate-pulse rounded-md" />
          <div className="w-[80%] h-3 bg-neutral-800 animate-pulse rounded-md" />
        </div>
 
        {/* Rating */}
        <div className="w-20 h-4 bg-neutral-800 animate-pulse rounded-md mt-3" />
 
        {/* Fav mobile */}
        <div className="block sm:hidden w-28 h-9 bg-neutral-800 animate-pulse rounded-xl mt-2" />
 
        {/* Cast */}
        <div className="flex gap-3 mt-4 overflow-hidden">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-2 flex-shrink-0">
              <div className="w-20 h-20 bg-neutral-800 animate-pulse rounded-full" />
              <div className="w-16 h-3 bg-neutral-800 animate-pulse rounded-md" />
              <div className="w-12 h-3 bg-neutral-800 animate-pulse rounded-md" />
            </div>
          ))}
        </div>
 
        {/* Similar movies */}
        <div className="flex gap-3 mt-10 overflow-hidden">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-2 flex-shrink-0">
              <div className="w-32 h-48 bg-neutral-800 animate-pulse rounded-xl" />
              <div className="w-24 h-3 bg-neutral-800 animate-pulse rounded-md" />
              <div className="w-16 h-3 bg-neutral-800 animate-pulse rounded-md" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
 
export default ShowDetailsSkelton;