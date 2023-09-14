import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export function Home() {
    
    return(
        <div className="text-center mt-5">
            <p>Selecione a opcao desejada</p>
             
            <Link to="/salas">
                <Button type="submit">Salas</Button>
            </Link>
            
            <Link to="/leitos">
                <Button type="submit">Leitos</Button>
            </Link>

            <Link to="/reservas">
                <Button type="submit">Reservas</Button>
            </Link>
            
        </div>
    );
    
}