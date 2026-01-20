import "./Navbar.css";

function Navbar(){
    return (
        <div className = "container">
            <div className = "Title">
                <h1>Agencia de viajes</h1>
            </div>
            <div className = "Menu">
                <ul>
                    <li> Contacto</li>
                    <li>Reservas</li>
                </ul>
            </div>
        </div>
    );
}

export default Navbar;
