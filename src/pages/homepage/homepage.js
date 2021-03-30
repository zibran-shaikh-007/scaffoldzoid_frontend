import React from 'react';
import {NavLink} from "react-router-dom"



const Homepage = () => {
    const background = {
        backgroundImage: `url(${"https://res.cloudinary.com/uploadfiles/image/upload/v1616946288/oranges-in-a-box_xp0fjs.jpg"})`,
        backgroundSize: 'cover',

        height: "100vh"

    };
    return (
        <>
            <div style={{ ...background }}>
                <h4 className="text-center display-4 pt-5" style={{ fontWeight: "500", color: "#fff" }}>Scaffoldzoid</h4>
                <div className="d-flex justify-content-center align-items-center h-75">

                    <NavLink className="btn btn-outline-light btn-lg mr-2" to="/register/seller">Wanna Sell Oranges?</NavLink>
                    <NavLink  className="btn btn-outline-light btn-lg ml-2" to="/register/buyer">Wanna Buy Oranges?</NavLink>

                </div>

            </div>
        </>
    )

}

export default Homepage;