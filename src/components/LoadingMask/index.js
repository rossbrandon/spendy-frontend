import React from 'react'
import { useLocation } from 'react-router-dom'
import { Col, Container, Row, Spinner } from 'reactstrap'

import './loading-mask.scss'

const LoadingMask = () => {
    const { pathname } = useLocation()
    const isSlow = pathname === '/search'

    return (
        <Container id="loading-mask">
            <Row className="h-100 w-100">
                <Col xl="12" className="m-auto">
                    <div className="row justify-content-center align-items-center text-center pl-4">
                        <Spinner type="grow" className="mr-2" color="success" />
                        <Spinner type="grow" className="mr-2" color="info" />
                        <Spinner type="grow" className="mr-2" color="warning" />
                    </div>
                    {isSlow && (
                        <div className="row mt-4 justify-content-center align-items-center">
                            <p className="text-center">
                                This page loads a lot of data... Bear with us
                            </p>
                        </div>
                    )}
                </Col>
            </Row>
        </Container>
    )
}

export default LoadingMask
