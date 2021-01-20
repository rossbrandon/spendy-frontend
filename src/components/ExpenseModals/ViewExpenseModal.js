import React from 'react'
import PropTypes from 'prop-types'
import {
    Badge,
    Button,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
} from 'reactstrap'

const ViewExpenseModal = props => {
    const { isOpen, toggle, currentBudget, expense } = props

    const getFormattedDate = date => {
        const utcDate = new Date(
            date.getTime() + date.getTimezoneOffset() * 60000,
        )
        let year = utcDate.getFullYear()
        let month = (1 + utcDate.getMonth()).toString().padStart(2, '0')
        let day = utcDate.getDate().toString().padStart(2, '0')

        return `${month}/${day}/${year}`
    }

    return (
        <Modal
            isOpen={isOpen}
            role="dialog"
            autoFocus={true}
            centered={true}
            className="exampleModal"
            tabIndex="-1"
            toggle={toggle}
        >
            {expense && (
                <div className="modal-content">
                    <ModalHeader toggle={toggle}>Expense Details</ModalHeader>
                    <ModalBody>
                        <p className="mb-2">
                            Date:{' '}
                            <span className="text-primary">
                                {getFormattedDate(new Date(expense.date))}
                            </span>
                        </p>
                        <p className="mb-2">
                            Budget:{' '}
                            <Badge
                                className={'font-size-12 badge-soft-success'}
                                color="success"
                                pill
                            >
                                {currentBudget.name}
                            </Badge>
                        </p>
                        <p className="mb-2">
                            Place:{' '}
                            <span className="text-primary">
                                {expense.place}
                            </span>
                        </p>
                        <p className="mb-2">
                            Price:{' '}
                            <span className="text-primary">
                                {expense.price.toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                })}
                            </span>
                        </p>
                        <p className="mb-4">
                            Reason:{' '}
                            <span className="text-primary">
                                {expense.reason}
                            </span>
                        </p>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            type="button"
                            color="secondary"
                            onClick={toggle}
                        >
                            Close
                        </Button>
                    </ModalFooter>
                </div>
            )}
        </Modal>
    )
}

ViewExpenseModal.propTypes = {
    toggle: PropTypes.func,
    isOpen: PropTypes.bool,
    expense: PropTypes.object,
}

export default ViewExpenseModal
