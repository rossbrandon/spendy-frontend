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

const getFormattedDate = date => {
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10)
}

const CreateExpenseModal = props => {
    const { isOpen, toggle, budgets, currentBudget } = props

    const createExpense = () => {
        console.log('Creating new expense')
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
                <ModalHeader toggle={toggle}>Create Expense</ModalHeader>
                <ModalBody>
                    <AvForm className="needs-validation">
                        <FormGroup>
                            <Label for="date-input">Date</Label>
                            <Input
                                type="date"
                                className="form-control"
                                id="date-input"
                                defaultValue={getFormattedDate(new Date())}
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="budget-select">Budget</Label>
                            <select
                                className="form-control"
                                id="budget-select"
                                defaultValue={currentBudget._id}
                                required
                            >
                                {options}
                            </select>
                        </FormGroup>
                        <FormGroup>
                            <Label for="place-input">Place</Label>
                            <AvInput
                                name="place"
                                type="text"
                                className="form-control"
                                id="place-input"
                                placeholder="Where was the expense?"
                                errorMessage="Enter Expense Place"
                                validate={{ required: { value: true } }}
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="price-input">Price</Label>
                            <AvInput
                                name="price"
                                type="text"
                                className="form-control"
                                id="price-input"
                                placeholder="How much was it?"
                                errorMessage="Enter Expense Price"
                                validate={{ required: { value: true } }}
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="reason-input">Reason</Label>
                            <AvInput
                                name="reason"
                                type="textarea"
                                className="form-control"
                                id="reason-input"
                                placeholder="(Optional) Enter a reason or description?"
                            />
                        </FormGroup>
                    </AvForm>
                </ModalBody>
                <ModalFooter>
                    <Button
                        type="button"
                        color="success"
                        onClick={createExpense}
                    >
                        Create
                    </Button>
                    <Button type="button" color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </div>
        </Modal>
    )
}

CreateExpenseModal.propTypes = {
    toggle: PropTypes.func,
    isOpen: PropTypes.bool,
}

export default CreateExpenseModal
