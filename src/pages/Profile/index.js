import React from 'react'
import {
    Container,
    Row,
    Col,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Badge,
} from 'reactstrap'
import { useAuth0 } from '@auth0/auth0-react'
import Layout from '../../components/Layout/Layout'

const Profile = () => {
    const { user } = useAuth0()

    return (
        <Layout>
            <div className="page-content">
                <Container fluid>
                    <Row>
                        <Col xl="12">
                            <Row className="mb-6 text-center">
                                <h1 className="m-auto">My Profile</h1>
                            </Row>
                            <div className="mb-5"></div>
                            <Row>
                                <Card className="m-auto">
                                    <CardHeader>
                                        <div className="avatar-md mx-auto">
                                            <div className="avatar-title rounded-circle bg-light">
                                                <img
                                                    src={user.picture}
                                                    alt="My Avatar"
                                                    id="user-avatar"
                                                />
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardBody>
                                        <div className="p-2">
                                            <div className="text-center">
                                                <p className="p-2 mb-2">
                                                    Name:{' '}
                                                    <span className="text-primary">
                                                        {user.name}
                                                    </span>
                                                </p>
                                                <p className="p-2 mb-2">
                                                    Email:{' '}
                                                    <span className="text-primary">
                                                        {user.email}
                                                    </span>
                                                </p>
                                                <p className="p-2 mb-2">
                                                    Nickname:{' '}
                                                    <span className="text-primary">
                                                        {user.nickname}
                                                    </span>
                                                </p>
                                                <p className="p-2 mb-2">
                                                    Is Email Verified?{' '}
                                                    {user.email_verified ? (
                                                        <Badge
                                                            className={
                                                                'font-size-12 badge-soft-success'
                                                            }
                                                            color="success"
                                                            pill
                                                        >
                                                            Yes
                                                        </Badge>
                                                    ) : (
                                                        <Badge
                                                            className={
                                                                'font-size-12 badge-soft-danger'
                                                            }
                                                            color="success"
                                                            pill
                                                        >
                                                            No
                                                        </Badge>
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    </CardBody>
                                    <CardFooter>
                                        <div className="p-2 text-center">
                                            Profile loaded from Auth0
                                        </div>
                                    </CardFooter>
                                </Card>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
        </Layout>
    )
}

export default Profile
