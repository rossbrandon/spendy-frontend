import { useMonthSwitcher } from 'hooks'
import React, { useState } from 'react'
import Calendar from 'react-calendar'
import { useTranslation } from 'react-i18next'
import {
    Button,
    Col,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Row,
} from 'reactstrap'
import { getFirstDayOfMonth, getLastDayOfMonth } from 'utils'

import 'react-calendar/dist/Calendar.css'
import './monthSwitcher.scss'

const MonthSwitcher = () => {
    const { t } = useTranslation()
    const [isOpen, setIsOpen] = useState(false)
    const { startDate, endDate, setStartDate, setEndDate } = useMonthSwitcher()

    const getFormattedDate = date => {
        const utcDate = new Date(
            date.getTime() + date.getTimezoneOffset() * 60000,
        )
        let year = utcDate.getFullYear()
        let month = utcDate.toLocaleString('default', { month: 'long' })
        return `${t(month)} ${year}`
    }

    const updateDates = date => {
        setStartDate(getFirstDayOfMonth(date))
        setEndDate(getLastDayOfMonth(date))
    }

    const toggle = () => {
        setIsOpen(!isOpen)
    }

    return (
        <Col>
            <Row className="mb-4 text-center">
                <Col xs="1">
                    <i
                        id="month-previous"
                        className="bx bx-left-arrow-alt h1 mt-4 text-left"
                        onClick={() => {
                            const date = new Date(startDate)
                            date.setDate(1)
                            updateDates(date)
                        }}
                    ></i>
                </Col>
                <Col xs="10">
                    <h2 className="mb-4">
                        {getFormattedDate(new Date(startDate))}
                    </h2>
                    <Button type="button" color="info" onClick={toggle}>
                        {t('Change Month')}
                    </Button>
                    <Modal
                        isOpen={isOpen}
                        role="dialog"
                        autoFocus={true}
                        centered={true}
                        className="exampleModal"
                        tabIndex="-1"
                        toggle={toggle}
                    >
                        <div className="modal-content">
                            <ModalHeader toggle={toggle}>
                                {t('Change Month')}
                            </ModalHeader>
                            <ModalBody className="text-center">
                                <div className="mb-2">
                                    <Button
                                        type="button"
                                        color="info"
                                        onClick={() => {
                                            updateDates(new Date())
                                            toggle()
                                        }}
                                    >
                                        {t('Go to Current Month')}
                                    </Button>
                                </div>
                                <hr />
                                <p className="mb-2">
                                    {t(
                                        'Select month to display budgets and expenses',
                                    )}
                                </p>
                                <Calendar
                                    className="m-auto"
                                    value={new Date(endDate)}
                                    onChangeYearUpdate={false}
                                    onChange={selectedMonth => {
                                        updateDates(selectedMonth)
                                        toggle()
                                    }}
                                    maxDetail="year"
                                    minDetail="month"
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    type="button"
                                    color="success"
                                    onClick={toggle}
                                >
                                    {t('Apply')}
                                </Button>
                            </ModalFooter>
                        </div>
                    </Modal>
                </Col>
                <Col xs="1">
                    <i
                        id="month-next"
                        className="bx bx-right-arrow-alt h1 mt-4"
                        onClick={() => {
                            const date = getLastDayOfMonth(new Date(endDate))
                            date.setMonth(date.getMonth() + 1, 1)
                            updateDates(date)
                        }}
                    ></i>
                </Col>
            </Row>
        </Col>
    )
}

export default MonthSwitcher
