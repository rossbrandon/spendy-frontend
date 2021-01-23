/* eslint-disable no-undef */
import { useAuth0 } from '@auth0/auth0-react'
import { AvForm, AvInput } from 'availity-reactstrap-validation'
import { config } from 'config'
import PropTypes from 'prop-types'
import React from 'react'
import { useTranslation } from 'react-i18next'
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
import { showToast } from 'utils'

const getSaveQuery = variables => {
    return {
        query: `
            mutation updateExpense(
                $id: String!
                $reason: String!
                $date: DateTime!
                $price: Float!
                $place: String!
                $recurUntil: DateTime
                $recurring: Boolean!
                $budget: String!
            ) {
                updateExpense(
                    id: $id
                    date: $date
                    price: $price
                    place: $place
                    reason: $reason
                    recurUntil: $recurUntil
                    recurring: $recurring
                    budget: $budget
                ) {
                    _id
                    date
                    place
                    price
                    reason
                    budget(populate: true) {
                        _id
                        name
                        amount
                    }
                }
            }
        `,
        variables,
    }
}

const getDeleteQuery = variables => {
    return {
        query: `
            mutation deleteExpense($id: String!) {
                deleteExpense(id: $id) {
                    _id
                    date
                    place
                    price
                    reason
                    budget(populate: true) {
                        _id
                        name
                        amount
                    }
                }
            }
        `,
        variables,
    }
}

const getFormattedDate = date => {
    return new Date(date.getTime()).toISOString().substr(0, 10)
}

const EditExpenseModal = props => {
    const {
        isOpen,
        toggle,
        budgets,
        currentBudget,
        expense,
        showConfirmation,
        setShowConfirmation,
    } = props
    const { t } = useTranslation()
    const { getAccessTokenSilently } = useAuth0()

    const updateExpense = async variables => {
        const token = await getAccessTokenSilently()
        const query = getSaveQuery(variables)
        const response = await fetch(config.backend.url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(query),
        })
        const result = await response.json()
        if (result.errors) {
            showToast('error', result.errors[0].message)
        } else {
            showToast('success', t('Expense updated!'))
        }
    }

    const deleteExpense = async variables => {
        const token = await getAccessTokenSilently()
        const query = getDeleteQuery(variables)
        const response = await fetch(config.backend.url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(query),
        })
        const result = await response.json()
        if (result.errors) {
            showToast('error', result.errors[0].message)
        } else {
            showToast('success', t('Expense deleted!'))
        }
    }

    const options = budgets.map(budget => (
        <option key={budget._id} value={budget._id}>
            {budget.name}
        </option>
    ))

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
                    <AvForm
                        className="needs-validation"
                        onSubmit={e => {
                            e.preventDefault()
                            updateExpense({
                                id: expense._id,
                                date: date.value,
                                budget: budget.value,
                                place: place.value,
                                price: parseFloat(price.value),
                                reason: reason.value,
                                recurUntil: null,
                                recurring: false,
                            })
                            toggle()
                        }}
                    >
                        <ModalHeader toggle={toggle}>
                            {t('Edit Expense')}
                        </ModalHeader>
                        <ModalBody>
                            <FormGroup>
                                <Label for="date">{t('Date')}</Label>
                                <Input
                                    type="date"
                                    className="form-control"
                                    id="date"
                                    defaultValue={getFormattedDate(
                                        new Date(expense.date),
                                    )}
                                    required
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="budget">{t('Budget')}</Label>
                                <select
                                    className="form-control"
                                    id="budget"
                                    defaultValue={currentBudget._id}
                                    required
                                >
                                    {options}
                                </select>
                            </FormGroup>
                            <FormGroup>
                                <Label for="place">{t('Place')}</Label>
                                <AvInput
                                    name="place"
                                    type="text"
                                    className="form-control"
                                    id="place"
                                    placeholder={t('Where was the expense?')}
                                    value={expense.place}
                                    errorMessage="Enter Expense Place"
                                    validate={{ required: { value: true } }}
                                    required
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="price">{t('Price')}</Label>
                                <AvInput
                                    name="price"
                                    type="text"
                                    className="form-control"
                                    id="price"
                                    placeholder={t('How much was it?')}
                                    value={expense.price}
                                    errorMessage="Enter Expense Price"
                                    validate={{ required: { value: true } }}
                                    required
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="reason">{t('Reason')}</Label>
                                <AvInput
                                    name="reason"
                                    type="textarea"
                                    className="form-control"
                                    id="reason"
                                    placeholder={t(
                                        '(Optional) Enter a reason or description',
                                    )}
                                    value={expense.reason}
                                />
                            </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                            {showConfirmation ? (
                                <React.Fragment>
                                    <p className="mb-2 mr-5">
                                        {t(
                                            'Do you want to delete this expense?',
                                        )}
                                    </p>
                                    <Button
                                        type="button"
                                        color="danger"
                                        onClick={() => {
                                            deleteExpense({
                                                id: expense._id,
                                            })
                                            setShowConfirmation(false)
                                            toggle()
                                        }}
                                    >
                                        {t('Delete')}
                                    </Button>
                                    <Button
                                        type="button"
                                        color="secondary"
                                        onClick={() => {
                                            setShowConfirmation(false)
                                        }}
                                    >
                                        {t('Cancel')}
                                    </Button>
                                </React.Fragment>
                            ) : (
                                <React.Fragment>
                                    <Button type="submit" color="success">
                                        {t('Save')}
                                    </Button>
                                    <Button
                                        type="button"
                                        color="danger"
                                        onClick={() => {
                                            setShowConfirmation(true)
                                        }}
                                    >
                                        {t('Delete')}
                                    </Button>
                                    <Button
                                        type="button"
                                        color="secondary"
                                        onClick={toggle}
                                    >
                                        {t('Close')}
                                    </Button>
                                </React.Fragment>
                            )}
                        </ModalFooter>
                    </AvForm>
                </div>
            )}
        </Modal>
    )
}

EditExpenseModal.propTypes = {
    isOpen: PropTypes.bool,
    toggle: PropTypes.func,
    budgets: PropTypes.array,
    currentBudget: PropTypes.object,
    expense: PropTypes.object,
    showConfirmation: PropTypes.bool,
    setShowConfirmation: PropTypes.func,
}

export default EditExpenseModal
