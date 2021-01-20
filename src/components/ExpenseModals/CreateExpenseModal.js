import React from 'react'
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

const getQuery = variables => {
    return {
        query: `
            mutation createExpense(
                $reason: String!
                $date: DateTime!
                $price: Float!
                $place: String!
                $recurUntil: DateTime
                $recurring: Boolean!
                $budget: String!
            ) {
                createExpense(
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

const getFormattedDate = date => {
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10)
}

const CreateExpenseModal = props => {
    const { isOpen, toggle, budgets, currentBudget } = props
    const { getAccessTokenSilently } = useAuth0()

    const createExpense = async variables => {
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
            showToast('success', 'Expense created!')
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
            <div className="modal-content">
                <AvForm
                    className="needs-validation"
                    onSubmit={e => {
                        e.preventDefault()
                        createExpense({
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
                    <ModalHeader toggle={toggle}>Create Expense</ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="date">Date</Label>
                            <Input
                                type="date"
                                className="form-control"
                                id="date"
                                defaultValue={getFormattedDate(new Date())}
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="budget">Budget</Label>
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
                            <Label for="place">Place</Label>
                            <AvInput
                                name="place"
                                type="text"
                                className="form-control"
                                id="place"
                                placeholder="Where was the expense?"
                                errorMessage="Enter Expense Place"
                                validate={{ required: { value: true } }}
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="price">Price</Label>
                            <AvInput
                                name="price"
                                type="text"
                                className="form-control"
                                id="price"
                                placeholder="How much was it?"
                                errorMessage="Enter Expense Price"
                                validate={{ required: { value: true } }}
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="reason">Reason</Label>
                            <AvInput
                                name="reason"
                                type="textarea"
                                className="form-control"
                                id="reason"
                                placeholder="(Optional) Enter a reason or description?"
                            />
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button type="submit" color="success">
                            Create
                        </Button>
                        <Button
                            type="button"
                            color="secondary"
                            onClick={toggle}
                        >
                            Cancel
                        </Button>
                    </ModalFooter>
                </AvForm>
            </div>
        </Modal>
    )
}

CreateExpenseModal.propTypes = {
    toggle: PropTypes.func,
    isOpen: PropTypes.bool,
}

export default CreateExpenseModal
