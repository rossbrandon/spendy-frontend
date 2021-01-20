import React from 'react'
import PropTypes from 'prop-types'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { useAuth0 } from '@auth0/auth0-react'
import { config } from '../../config'
import { showToast } from 'utils'

const getQuery = variables => {
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

const DeleteExpenseModal = props => {
    const { isOpen, toggle, expense } = props
    const { getAccessTokenSilently } = useAuth0()

    const deleteExpense = async variables => {
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
            showToast('success', 'Expense deleted!')
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
            <div className="modal-content">
                <ModalHeader toggle={toggle}>Delete Expense</ModalHeader>
                <ModalBody>
                    <p className="mb-2">Do you want to delete this expense?</p>
                </ModalBody>
                <ModalFooter>
                    <Button
                        type="button"
                        color="danger"
                        onClick={() => {
                            deleteExpense({
                                id: expense._id,
                            })
                            toggle()
                        }}
                    >
                        Delete
                    </Button>
                    <Button type="button" color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </div>
        </Modal>
    )
}

DeleteExpenseModal.propTypes = {
    toggle: PropTypes.func,
    isOpen: PropTypes.bool,
    expense: PropTypes.object,
}

export default DeleteExpenseModal
