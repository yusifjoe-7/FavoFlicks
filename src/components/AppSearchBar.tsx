
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AppSearchBar() {

     const [inputValue, setInputValue] = useState<string|null >(null);
      const navigate = useNavigate();
      const handleClick = ()=>{
        if (inputValue?.trim()=== "" || inputValue === undefined || inputValue === null) {
          alert("Please enter a search query.");
          return;
        }
        navigate(`/search?query=${encodeURIComponent(inputValue)}`);
        setInputValue('');
      }

  return (
    <div className="max-w-md mx-auto w-[85%] sm:hidden block">
  <label className="sr-only">Search</label>
  <div className="relative">
    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
      <svg className="w-4 h-4 text-body" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
      </svg>
    </div>
    <input
      type="search"
      id="search"
      className="rounded-full block w-full p-3 ps-9 bg-neutral-secondary-medium border border-default-medium text-heading text-sm shadow-xs placeholder:text-body"
      value={inputValue ?? ''}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          handleClick();
        }
      }}
      placeholder="Search"
    />
    <button
      onClick={() => handleClick()}
      type="button"
      className="absolute end-1.5 bottom-1.5 text-white bg-accent hover:bg-brand-strong box-border shadow-xs font-medium leading-5 rounded-full text-xs px-3 py-1.5 border border-white"
    >
      Search
    </button>
  </div>
</div>
  )
}

export default AppSearchBar
