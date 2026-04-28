import CloseIcon from '@mui/icons-material/Close';
import { usePhoto } from '../hooks/PhotoViewContext';


function PhotoView() {
  const { value, close } = usePhoto();
  const { cover, size, aspect } = value;
  console.log(cover);


  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-500">
        <CloseIcon className="absolute top-10 right-10 text-white cursor-pointer z-550" onClick={close} />
      <div className={`rounded-xl bg-cover bg-contain bg-auto z-530 bg-gray-500 ${size} ${aspect}`}
      style={{
        backgroundImage: `url(${cover})`}}
      ></div>
    </div>
  )
}

export default PhotoView
