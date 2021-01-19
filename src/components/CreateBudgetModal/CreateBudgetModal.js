import React, { useState } from 'react'
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
import { gql, useMutation } from '@apollo/client'

const CREATE_MUTATION = gql`
    mutation createBudget(
        $name: String!
        $amount: Float!
        $showInMenu: Boolean!
        $startDate: DateTime!
        $endDate: DateTime
    ) {
        createBudget(
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
`

const getFormattedDate = date => {
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10)
}

const CreateBudgetModal = props => {
    const { isOpen, toggle } = props
    const [showInMenu, setShowInMenu] = useState(false)

    const [createBudget, { data }] = useMutation(CREATE_MUTATION)

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
                        createBudget({
                            variables: {
                                name: budgetName.value,
                                amount: parseInt(amount.value),
                                showInMenu: showInMenu,
                                startDate: startDate.value,
                                endDate: null,
                            },
                        })
                        toggle()
                    }}
                >
                    <ModalHeader toggle={toggle}>Create Budget</ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="budgetName">Name</Label>
                            <AvInput
                                name="budgetName"
                                type="text"
                                className="form-control"
                                id="budgetName"
                                placeholder="What is the budget for?"
                                errorMessage="Enter Budget Name"
                                validate={{ required: { value: true } }}
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="amount">Amount</Label>
                            <AvInput
                                name="amount"
                                type="text"
                                className="form-control"
                                id="amount"
                                placeholder="How much should be budgetted?"
                                errorMessage="Enter Budget Amount"
                                validate={{ required: { value: true } }}
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="startDate">Start Date</Label>
                            <Input
                                type="date"
                                className="form-control"
                                id="startDate"
                                defaultValue={getFormattedDate(new Date())}
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
                                    onChange={e => {
                                        setShowInMenu(!showInMenu)
                                    }}
                                />
                                <label
                                    className="custom-control-label"
                                    htmlFor="showInMenu"
                                >
                                    Show In Top Menu?
                                </label>
                            </div>
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

CreateBudgetModal.propTypes = {
    toggle: PropTypes.func,
    isOpen: PropTypes.bool,
}

export default CreateBudgetModal
