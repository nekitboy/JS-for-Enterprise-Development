import React from "react"
import "./header.css"
import logo from "assets/logo.png"
import Link from "react-router-dom/es/Link";
import Button from '@material-ui/core/Button';

const Header = () => (
    <header>
        <div className="container">
            <Link to={'/'}>
                <img src={logo} alt=""/>
                <span className="title">Мероприятия для всех</span>
            </Link>
            <Button className={'about'} component={Link} to={"/about"}>О нас</Button>
            <div className="location">
                <span className="city">Казань</span>
                <span className="location-ic" />
            </div>
        </div>

    </header>
)

export default Header