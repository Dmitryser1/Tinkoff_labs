import { FunctionComponent } from "react";
import { NavLink } from "react-router-dom";

interface HeaderProps {
    
}

const Header: FunctionComponent<HeaderProps> = () => {
    return ( 
        <>
            <div className="fixed top-0 w-full h-16 bg-[#a1d9fa] z-10 flex items-center justify-between p-4">
                <NavLink to='/' className="w-14 h-14 flex items-center">
                    <img src='/img/favicon.ico' className="" />
                    <p className=" text-4xl font-bold text-[#301014]">ФИЛЬМОТЕКА</p>
                </NavLink>
                <div className="flex flex-col items-end">
                    <p className="text-[#301014]">
                        Александра Коломытцева 6408
                    </p>
                    <a className=" text-sm hover:text-[#567fcc]" href="https://github.com/anaxelo/web">
                        https://github.com/anaxelo/web
                    </a>
                </div>
            </div>
        </>
    );
}
 
export default Header;