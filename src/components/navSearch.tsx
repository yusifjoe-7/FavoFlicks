import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NavSearch() {
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
    <div className="sm:w-64 w-27">
  <TextField
  value={inputValue}
  onChange={(e:React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
    placeholder="Search..."
    size="small"
    fullWidth
    variant="outlined"
    onKeyDown={(e) => {
    if (e.key === "Enter") {
      handleClick();
    }
  }}
    sx={{
      "& .MuiOutlinedInput-root": {
        borderRadius: "16px",
        background: "#404860",
        // صغّر الـ padding على شاشات صغيرة
        padding: { xs: "0px", sm: "2px" }
      },

      "& .MuiOutlinedInput-input": {
        color: "var(--color-text)",
        // صغّر الـ font size على موبايل
        fontSize: { xs: "0.75rem", sm: "0.875rem" },
        padding: { xs: "6px 2px", sm: "8px 2px" },
        "&::placeholder": {
          color: "var(--color-muted)",
          opacity: 1
        }
      },

      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "var(--color-accent)",
        borderWidth: "2px"
      }
    }}
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <SearchIcon className="text-text ml-3 cursor-pointer" sx={{ fontSize: { xs: 16, sm: 20 } }} onClick={()=>handleClick()}/>
        </InputAdornment>
      ),
    }}
  />
</div>
  );
}