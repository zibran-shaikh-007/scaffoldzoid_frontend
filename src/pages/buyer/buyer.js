import React, { useEffect } from "react";
import { NavLink } from "react-router-dom"
import { connect } from "react-redux"
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye} from '@fortawesome/free-solid-svg-icons'
import {
    Row,
    Col,
    Card,
    CardBody

} from 'reactstrap'
import { allSeller } from "../../redux/product/actions"
import BuyerNavbar from "./buyerNav"






const Buyer = ({ history, allSellerAction, allSellerData}) => {

    
    const SellerData = ()=>{
        allSellerAction(history)
    }


    useEffect(() => {
        SellerData()
       }, [])

    const data = {
        columns: [
            {
                dataField: 'id',
                text: 'No.'
            },
            {
                dataField: "Profile",
                text: "Profile"
            },
            {
                dataField: "name",
                text: "Username"
            },
            {
                dataField: "email",
                text: "Email"
            },
            {
                dataField: "description",
                text: "Description"
            },
            {
                dataField: "ViewProfile",
                text: "Action"
            },


        ],
        rows: allSellerData.map((seller,index)=>(
            {

                id: index + 1,
                Profile:<img width="100" height="100" className="rounded-circle" src={seller.picture} alt="seller profile picture"/>,
                name: seller.username,
                email: seller.email,
                description:seller.description,
                ViewProfile: <NavLink to={`buyer/seller-profile/${seller.id}`}><FontAwesomeIcon icon={faEye} ></FontAwesomeIcon></NavLink>


            }

        )),
    }



    const options = {
        // pageStartIndex: 0,
        hideSizePerPage: false,
        hidePageListOnlyOnePage: false,
        sizePerPageList:
            [{
                text: '5th', value: 5
            }, {
                text: '10th', value: 10
            }, {
                text: 'All', value: data.rows.length
            }]

    };


    return (
        <>
        <BuyerNavbar/>
           
           {allSellerData && allSellerData.length > 0?
            <Row>

                <Col lg={9} className='mt-5 mx-auto'>
                    <Card>
                        <CardBody>


                            <h4 className="card-title mb-4">All Sellers</h4>

                            <BootstrapTable
                                keyField='id'
                                data={data.rows}
                                columns={data.columns}
                                pagination={paginationFactory(options)}

                            />
                        </CardBody>
                    </Card>
                </Col>

            </Row>
            :""}
           
        </>
    );
}


const mapStateToProps = ({ sellerProduct }) => {
    const {  allSellerData, loading } = sellerProduct;
    console.log("allSellerData", allSellerData)

    return { allSellerData, loading };


};


export default connect(mapStateToProps, { allSellerAction: allSeller })(Buyer)

