

import YouTube from "react-youtube";

export function VideoPlayer( {id}: {id: string} ) {
  return (
    <div className="sm:w-[60%] w-full aspect-video mx-auto my-10">
        <YouTube
      videoId={id}
      className="w-full h-full"
    iframeClassName="w-full h-full"
      opts={{
       
        
        playerVars: {
          autoplay: 0,
        },
      }}
    />
    </div>
  );
}