import { useLocale } from 'hooks'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'

const ViewBudgetModal = props => {
    const { isOpen, toggle, budget } = props
    const { t } = useTranslation()
    const { currency, localeString } = useLocale()
    const [showInMenu, setShowInMenu] = useState(false)

    const toggleState = budget?.showInMenu ? budget.showInMenu : false

    useEffect(() => {
        setShowInMenu(toggleState)
    }, [toggleState])

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
            {budget && (
                <div className="modal-content">
                    <ModalHeader toggle={toggle}>
                        {t('Budget Details')}
                    </ModalHeader>
                    <ModalBody>
                        <p className="mb-2">
                            {t('Name')}:{' '}
                            <span className="text-primary">{budget.name}</span>
                        </p>
                        <p className="mb-2">
                            {t('Amount')}:{' '}
                            <span className="text-primary">
                                {budget.amount.toLocaleString(localeString, {
                                    style: 'currency',
                                    currency,
                                })}
                            </span>
                        </p>
                        <div className="custom-control custom-switch" dir="ltr">
                            <input
                                type="checkbox"
                                className="custom-control-input mt-2"
                                disabled
                                id="showInMenu"
                                checked={showInMenu}
                            />
                            <label
                                className="custom-control-label"
                                htmlFor="showInMenu"
                            >
                                {t('Show in Top Menu?')}
                            </label>
                        </div>
                        <p className="mt-2 mb-2">
                            {t('Start Date')}:{' '}
                            <span className="text-primary">
                                {getFormattedDate(new Date(budget.startDate))}
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

ViewBudgetModal.propTypes = {
    toggle: PropTypes.func,
    isOpen: PropTypes.bool,
    budget: PropTypes.object,
}

export default ViewBudgetModal
