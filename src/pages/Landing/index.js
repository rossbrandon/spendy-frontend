import { useAuth0 } from '@auth0/auth0-react'
import LanguageDropdown from 'components/LanguageDropdown'
import { LocaleProvider } from 'context'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Card, CardBody, CardFooter,Col, Container, Row } from 'reactstrap'

const Landing = () => {
    const { t } = useTranslation()
    const { loginWithRedirect, isAuthenticated } = useAuth0()

    const loginAction = () => {
        return !isAuthenticated ? loginWithRedirect() : true
    }

    return (
        <LocaleProvider>
            <div className="text-right mr-4">
                <LanguageDropdown />
            </div>
            <div className="page-content pt-0">
                <Container fluid>
                    <Row>
                        <Col xl="12">
                            <Row className="mb-6 text-center">
                                <h1 className="display-3 m-auto">
                                    {t('Welcome to Spendy')}
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
                                                        <i className="bx bx-dollar h1 mb-0 text-success"></i>
                                                    </div>
                                                </div>
                                                <div className="p-2 mt-4">
                                                    <h4>
                                                        {t(
                                                            'Spendy is a super simple budget and expense tracker.',
                                                        )}
                                                    </h4>
                                                    <p className="text-muted">
                                                        {t(
                                                            'Track expenses in your own custom budget categories and get your spending under control!',
                                                        )}
                                                    </p>
                                                    <div className="mt-4">
                                                        <Link
                                                            to="/dashboard"
                                                            className="btn btn-success"
                                                            onClick={
                                                                loginAction
                                                            }
                                                        >
                                                            {t(
                                                                "Let's Get Started!",
                                                            )}
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </CardBody>
                                    <CardFooter>
                                        <div className="mt-4 mb-4 text-center">
                                            <p>
                                                {t('Already have an account?')}
                                            </p>
                                            <Link
                                                to="/dashboard"
                                                className="btn btn-primary"
                                                onClick={loginAction}
                                            >
                                                {t('Login')}
                                            </Link>
                                        </div>
                                    </CardFooter>
                                </Card>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
        </LocaleProvider>
    )
}

export default Landing
