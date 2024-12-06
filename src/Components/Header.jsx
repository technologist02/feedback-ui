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