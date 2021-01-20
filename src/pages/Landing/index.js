import React from 'react'
import { Container, Row, Col, Card, CardBody } from 'reactstrap'
import { useAuth0 } from '@auth0/auth0-react'
import { Link } from 'react-router-dom'

const Landing = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0()

    const loginAction = () => {
        return !isAuthenticated ? loginWithRedirect() : true
    }

    return (
        <React.Fragment>
            <div className="d-none d-sm-block text-right mt-4 mr-4">
                <Link
                    to="/dashboard"
                    className="text-dark"
                    onClick={loginAction}
                >
                    <i className="bx bx-log-in h2" />
                </Link>
            </div>
            <div className="page-content">
                <Container fluid>
                    <Row>
                        <Col xl="12">
                            <Row className="mb-6 text-center">
                                <h1 className="display-3 m-auto">
                                    Welcome to Spendy
                                </h1>
                            </Row>
                            <div className="mb-5"></div>
                            <Row>
                                <Card className="m-auto">
                                    <CardBody>
                                        <div className="p-2">
                                            <div className="text-center">
                                                <div className="avatar-md mx-auto">
                                                    <div className="avatar-title rounded-circle bg-light">
                                                        <i className="bx bx-dollar h1 mb-0 text-primary"></i>
                                                    </div>
                                                </div>
                                                <div className="p-2 mt-4">
                                                    <h4>
                                                        Spendy is a super simple
                                                        budget and expense
                                                        tracker.
                                                    </h4>
                                                    <p className="text-muted">
                                                        Track expenses in your
                                                        own custom budget
                                                        categories and get your
                                                        spending under control!
                                                    </p>
                                                    <div className="mt-4">
                                                        <Link
                                                            to="/dashboard"
                                                            className="btn btn-success"
                                                            onClick={
                                                                loginAction
                                                            }
                                                        >
                                                            Let's Get Started!
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    )
}

export default Landing
