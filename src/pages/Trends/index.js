import Layout from 'components/Layout'
import SpendHistoryChart from 'components/SpendHistoryChart'
import TopPlacesChart from 'components/TopPlacesChart'
import TopTagsChart from 'components/TopTagsChart'
import {
    AggregatePlacesProvider,
    AggregateSumProvider,
    AggregateTagsProvider,
} from 'context'
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
                                    <AggregateSumProvider>
                                        <SpendHistoryChart />
                                    </AggregateSumProvider>
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
                                    <AggregatePlacesProvider>
                                        <TopPlacesChart />
                                    </AggregatePlacesProvider>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Row className="align-items-center">
                        <Col xl="12">
                            <Card>
                                <CardBody>
                                    <CardTitle className="mb-4">
                                        {t('Top Tags')}
                                    </CardTitle>
                                    <AggregateTagsProvider>
                                        <TopTagsChart />
                                    </AggregateTagsProvider>
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
