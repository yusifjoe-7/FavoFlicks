 export default function SkeletonCard() {
  return (
    <div className="flex flex-col items-center mx-5 mb-12 animate-pulse">
          {/* الصورة */}
          <div className="sm:w-35 w-22 aspect-2/3 rounded-xl bg-card-alt z-30" />
          {/* المعلومات */}
          <div className="sm:w-40 w-28 sm:aspect-3/4 h-50 bg-card border-2 border-t-0 border-accent -mt-25 rounded-2xl">
            <div className="flex flex-col items-center gap-2 pt-30 px-3">
              <div className="w-[80%] h-2.5 bg-card-alt rounded-full" />
              <div className="w-[55%] h-2.5 bg-card-alt rounded-full" />
            </div>
          </div>
        </div>
  )
}