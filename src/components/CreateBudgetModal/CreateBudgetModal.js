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
import { useAuth0 } from '@auth0/auth0-react'
import { config } from '../../config'

const getQuery = variables => {
    return {
        query: `
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
        `,
        variables,
    }
}

const getFormattedDate = date => {
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10)
}

const CreateBudgetModal = props => {
    const { isOpen, toggle } = props
    const [showInMenu, setShowInMenu] = useState(false)
    const { getAccessTokenSilently } = useAuth0()

    const createBudget = async variables => {
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
        await response.json()
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
            <div className="modal-content">
                <AvForm
                    className="needs-validation"
                    onSubmit={e => {
                        e.preventDefault()
                        createBudget({
                            name: budgetName.value,
                            amount: parseInt(amount.value),
                            showInMenu: showInMenu,
                            startDate: startDate.value,
                            endDate: null,
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
