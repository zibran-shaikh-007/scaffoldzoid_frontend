import React, { useEffect } from "react";
import {useParams} from "react-router-dom"
import { connect } from "react-redux"
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';

import {
    Row,
    Col,
    Card,
    CardBody

} from 'reactstrap'
import { allProducts } from "../../redux/product/actions"
import BuyerNavbar from "./buyerNav"






const SellerChart = ({ history, allProductsAction, allProduct }) => {


    const {user_id} = useParams()

    const getProductData = () => {
        allProductsAction(user_id, history)

    }


    useEffect(() => {
        getProductData()
    }, [])

    const data = {
        columns: [
            {
                dataField: 'id',
                text: 'No.'
            },
            {
                dataField: "name",
                text: "Type"
            },
            {
                dataField: "rate",
                text: "Rate (Rupees/kg)"
            },
           /*  {
                dataField: "edit",
                text: "Action"
            }, */


        ],
        rows: allProduct.map(product=>(
            {

                id: product.id,
                name: product.name,
                rate: product.rate,
               /*  edit: <NavLink to={`product/edit/${product.id}`}><FontAwesomeIcon icon={faEdit} ></FontAwesomeIcon></NavLink> */


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
           {allProduct && allProduct.length > 0?
            <Row>

                <Col lg={9} className='mt-5 mx-auto'>
                    <Card>
                        <CardBody>


                            <h4 className="card-title mb-4">All Products</h4>

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
    const { allProduct, loading } = sellerProduct;
   /*  console.log("data", allProduct) */

    return { allProduct, loading };


};


export default connect(mapStateToProps, { allProductsAction: allProducts })(SellerChart)

