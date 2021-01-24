import AreaChart from 'components/AreaChart'
import BarChart from 'components/BarChart'
import Layout from 'components/Layout'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Card, CardBody, CardTitle, Col, Container, Row } from 'reactstrap'

const Trends = () => {
    const { t } = useTranslation()

    return (
        <Layout>
            <div className="page-content">
                <Container fluid>
                    <h4>{t('Trends')}</h4>
                    <Row className="align-items-center">
                        <Col xl="12">
                            <Card>
                                <CardBody>
                                    <CardTitle className="mb-4">
                                        {t('Spend History (Previous Year)')}
                                    </CardTitle>
                                    <AreaChart />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Row className="align-items-center">
                        <Col xl="12">
                            <Card>
                                <CardBody>
                                    <CardTitle className="mb-4">
                                        {t('Top Places')}
                                    </CardTitle>
                                    <BarChart />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </Layout>
    )
}

export default Trends
