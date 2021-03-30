import React, { useState } from 'react';
import { connect } from "react-redux";
import {useHistory} from 'react-router-dom'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavbarText,
    Button
} from 'reactstrap';
import { logoutUser } from "../../redux/actions";
import {getCurrentUser, setCurrentUser} from "../../helpers/Utils"

const BuyerNavbar = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);
    const history = useHistory()


    const handleLogout = () => {
       /* logoutUserAction(history) */
       setCurrentUser();
       history.push('/')
    };

    return (
        <div>
            <Navbar color="light" light expand="md">
                <NavbarBrand href="/buyer">Scaffoldzoid</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                       {/*  <NavItem>
                            <NavLink href="/seller/profile">Add Profile</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/seller/product">Add Product</NavLink>
                        </NavItem> */}

                    </Nav>
                    <NavbarText className="mr-3">{getCurrentUser()? `Hello, ${getCurrentUser().username}`:""}</NavbarText>
                    <Button className="btn-danger" onClick={() => handleLogout()}>Logout</Button>
                </Collapse>
            </Navbar>
          {/*   <div>{props.children}</div>  */}
        </div>
    );
}




export default connect(null, { logoutUserAction: logoutUser })(BuyerNavbar);