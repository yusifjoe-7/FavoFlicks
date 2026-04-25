import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import NavSearch from "./navSearch";

import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

export default function Nav() {
    const [opened, setOpened] = useState<boolean>(false);
    const [visible, setVisible] = useState<boolean>(true);

    const lastScrollRef = useRef(0); // ✅ مش بيعمل re-render

useEffect(() => {
    const handleScroll = () => {
        const currentScroll = window.scrollY;

        if (currentScroll < 10) {
            setVisible(true);
        } else if (currentScroll > lastScrollRef.current) {
            setVisible(false);
            setOpened(false);
        } else {
            setVisible(true);
        }

        lastScrollRef.current = currentScroll; // ✅ بيتحدث من غير re-render
    };

    window.addEventListener("scroll", handleScroll, { passive: true }); // ✅ passive لأداء أفضل
    return () => window.removeEventListener("scroll", handleScroll);
}, []); // ✅ بيتعمل مرة واحدة بس

    return (
        <nav className={`bg-bg sticky top-0 z-40 transition-transform duration-300 border-b border-bg ${visible ? "translate-y-0" : "-translate-y-full"}`}>
            <div className="bg-bg flex justify-between items-center py-3 px-7 sm:px-10 md:px-15">
                <Link to={"/"}>
  <div className="flex items-center gap-2 group cursor-pointer">
    {/* Star icon */}
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon
        points="9,1 11,6.5 17,6.5 12.5,10 14,16 9,12.5 4,16 5.5,10 1,6.5 7,6.5"
        fill="#6366F1"
      />
    </svg>
    {/* Text */}
    <h3 className="sm:text-lg text-base font-serif tracking-tight leading-none">
      <span className="text-muted">Favo</span>
      <span className="text-accent font-bold">Flicks</span>
    </h3>
  </div>
</Link>

                <div className="flex gap-5">
                    <div className="md:flex items-center gap-5 hidden">
                        <Link to={"/"} className="hover:text-accent transition">Home</Link>
                        <Link to={"/discover"} className="hover:text-accent transition">Discover</Link>
                        <Link to={"/favorites"} className="hover:text-accent transition">Favorites</Link>
                    </div>
                    <NavSearch />
                </div>
                <div className="flex md:hidden">
                    {opened
                        ? <CloseIcon onClick={() => setOpened(false)} />
                        : <MenuIcon onClick={() => setOpened(true)} />
                    }
                </div>
            </div>

            {opened &&
                <div className="flex flex-col items-center gap-5 md:hidden pb-4 fixed w-full bg-bg">
                    <Link to={"/"} onClick={() => setOpened(false)} className="hover:text-accent transition">Home</Link>
                    <Link to={"/discover"} onClick={() => setOpened(false)} className="hover:text-accent transition">Discover</Link>
                    <Link to={"/search"} onClick={() => setOpened(false)} className="hover:text-accent transition">Search</Link>
                    <Link to={"/favorites"} onClick={() => setOpened(false)} className="hover:text-accent transition">Favorites</Link>

                </div>
            }
        </nav>
    );
}