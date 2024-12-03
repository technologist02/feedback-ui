import { NavLink } from "react-router-dom"
//import logo from "../"; // Путь к вашему изображению
import logo from "../gpa-logo.png"

export const Header = () => {
    return (
        <div>
            <nav className="navbar">
                <img src={logo} style={{"maxHeight" : 60}} alt="logo"/>
            </nav>
        </div>
    )
}