import React from 'react'
import { Col, Container, Row } from 'reactstrap'

const Footer = () => {
    return (
        <React.Fragment>
            <footer className="footer">
                <Container fluid={true}>
                    <Row>
                        <Col md={6}>
                            {new Date().getFullYear()} © Spendy, Inc.
                        </Col>
                    </Row>
                </Container>
            </footer>
        </React.Fragment>
    )
}

export default Footer
