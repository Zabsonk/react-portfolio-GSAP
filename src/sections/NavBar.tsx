import type {ReactElement} from "react";
import {navLinks} from "../constants";

const NavBar = (): ReactElement => {

    return (
        <nav>
            {navLinks.map(link =>(
                <li key={link.text}>
                    <a href={link.link} className="nav-link">
                        <span>{link.text}</span>
                        <span className={"underline"}></span>
                    </a>
                </li>
            ))}
        </nav>
    )
}
export default NavBar;