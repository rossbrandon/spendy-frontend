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
import { useTranslation } from 'react-i18next'
import { useLocale } from 'hooks'

const ViewExpenseModal = props => {
    const { isOpen, toggle, currentBudget, expense } = props
    const { t } = useTranslation()
    const { currency, localeString } = useLocale()

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
                    <ModalHeader toggle={toggle}>
                        {t('Expense Details')}
                    </ModalHeader>
                    <ModalBody>
                        <p className="mb-2">
                            {t('Date')}:{' '}
                            <span className="text-primary">
                                {getFormattedDate(new Date(expense.date))}
                            </span>
                        </p>
                        <p className="mb-2">
                            {t('Budget')}:{' '}
                            <Badge
                                className={'font-size-12 badge-soft-success'}
                                color="success"
                                pill
                            >
                                {currentBudget.name}
                            </Badge>
                        </p>
                        <p className="mb-2">
                            {t('Place')}:{' '}
                            <span className="text-primary">
                                {expense.place}
                            </span>
                        </p>
                        <p className="mb-2">
                            {t('Price')}:{' '}
                            <span className="text-primary">
                                {expense.price.toLocaleString(localeString, {
                                    style: 'currency',
                                    currency,
                                })}
                            </span>
                        </p>
                        <p className="mb-4">
                            {t('Reason')}:{' '}
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
                            {t('Close')}
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
