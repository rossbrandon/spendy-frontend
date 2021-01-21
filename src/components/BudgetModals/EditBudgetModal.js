import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {
    Button,
    FormGroup,
    Input,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
} from 'reactstrap'
import { AvForm, AvInput } from 'availity-reactstrap-validation'
import { useAuth0 } from '@auth0/auth0-react'
import { config } from '../../config'
import { showToast } from 'utils'
import { useTranslation } from 'react-i18next'

const getQuery = variables => {
    return {
        query: `
            mutation updateBudget(
                $id: String!
                $name: String!
                $amount: Float!
                $showInMenu: Boolean!
                $startDate: DateTime!
                $endDate: DateTime
            ) {
                updateBudget(
                    id: $id
                    name: $name
                    amount: $amount
                    showInMenu: $showInMenu
                    startDate: $startDate
                    endDate: $endDate
                ) {
                    _id
                    name
                    amount
                    showInMenu
                }
            }
        `,
        variables,
    }
}

const getFormattedDate = date => {
    return new Date(date.getTime()).toISOString().substr(0, 10)
}

const EditBudgetModal = props => {
    const { isOpen, toggle, budget } = props
    const { t } = useTranslation()
    const [showInMenu, setShowInMenu] = useState(false)
    const { getAccessTokenSilently } = useAuth0()

    const toggleState = budget?.showInMenu ? budget.showInMenu : false

    useEffect(() => {
        setShowInMenu(toggleState)
    }, [toggleState])

    const updateBudget = async variables => {
        const token = await getAccessTokenSilently()
        const query = getQuery(variables)
        const response = await fetch(config.backend.url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(query),
        })
        const result = await response.json()
        if (result.errors) {
            showToast('error', result.errors[0].message)
        } else {
            showToast('success', t('Budget updated!'))
        }
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
                    <AvForm
                        className="needs-validation"
                        onSubmit={e => {
                            e.preventDefault()
                            updateBudget({
                                id: budget._id,
                                name: budgetName.value,
                                amount: parseFloat(amount.value),
                                showInMenu: showInMenu,
                                startDate: startDate.value,
                                endDate: null,
                            })
                            toggle()
                        }}
                    >
                        <ModalHeader toggle={toggle}>
                            {t('Edit Budget')}
                        </ModalHeader>
                        <ModalBody>
                            <FormGroup>
                                <Label for="budgetName">{t('Name')}</Label>
                                <AvInput
                                    name="budgetName"
                                    type="text"
                                    className="form-control"
                                    id="budgetName"
                                    placeholder={t('What is the budget for?')}
                                    errorMessage="Enter Budget Name"
                                    validate={{ required: { value: true } }}
                                    value={budget.name}
                                    required
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="amount">{t('Amount')}</Label>
                                <AvInput
                                    name="amount"
                                    type="text"
                                    className="form-control"
                                    id="amount"
                                    placeholder={t(
                                        'How much should be bugeted?',
                                    )}
                                    errorMessage="Enter Budget Amount"
                                    validate={{ required: { value: true } }}
                                    value={budget.amount}
                                    required
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="startDate">{t('Start Date')}</Label>
                                <Input
                                    type="date"
                                    className="form-control"
                                    id="startDate"
                                    value={getFormattedDate(
                                        new Date(budget.startDate),
                                    )}
                                    required
                                />
                            </FormGroup>
                            <FormGroup>
                                <div
                                    className="custom-control custom-switch"
                                    dir="ltr"
                                >
                                    <input
                                        type="checkbox"
                                        className="custom-control-input mt-2"
                                        id="showInMenu"
                                        name="showInMenu"
                                        checked={showInMenu}
                                        onChange={e => {
                                            setShowInMenu(!showInMenu)
                                        }}
                                    />
                                    <label
                                        className="custom-control-label"
                                        htmlFor="showInMenu"
                                    >
                                        {t('Show in Top Menu?')}
                                    </label>
                                </div>
                            </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                            <Button type="submit" color="success">
                                {t('Save')}
                            </Button>
                            <Button
                                type="button"
                                color="secondary"
                                onClick={toggle}
                            >
                                {t('Cancel')}
                            </Button>
                        </ModalFooter>
                    </AvForm>
                </div>
            )}
        </Modal>
    )
}

EditBudgetModal.propTypes = {
    toggle: PropTypes.func,
    isOpen: PropTypes.bool,
}

export default EditBudgetModal
