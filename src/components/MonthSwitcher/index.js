import { useMonthSwitcher } from 'hooks'
import React, { useState } from 'react'
import Calendar from 'react-calendar'
import {
    Button,
    Col,
    Row,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
} from 'reactstrap'
import { getFirstDayOfMonth, getLastDayOfMonth } from 'utils'

import 'react-calendar/dist/Calendar.css'

const getFormattedDate = date => {
    const utcDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000)
    let year = utcDate.getFullYear()
    let month = utcDate.toLocaleString('default', { month: 'long' })
    return `${month} ${year}`
}

const MonthSwitcher = () => {
    const [isOpen, setIsOpen] = useState(false)
    const { startDate, endDate, setStartDate, setEndDate } = useMonthSwitcher()

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
                <Col xl="12">
                    <h2 className="mb-4">
                        {getFormattedDate(new Date(startDate))}
                    </h2>
                    <Button type="button" color="info" onClick={toggle}>
                        Change Month
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
                                Change Month
                            </ModalHeader>
                            <ModalBody>
                                <p className="mb-2">
                                    Select month to display budgets and expenses
                                </p>
                                <Calendar
                                    className="m-auto"
                                    value={new Date(endDate)}
                                    onChangeYearUpdate={false}
                                    onChange={function (selectedYear) {
                                        updateDates(selectedYear)
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
                                    Apply
                                </Button>
                            </ModalFooter>
                        </div>
                    </Modal>
                </Col>
            </Row>
        </Col>
    )
}

export default MonthSwitcher
