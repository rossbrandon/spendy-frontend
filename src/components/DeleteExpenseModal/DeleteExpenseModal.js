import React from 'react'
import PropTypes from 'prop-types'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { gql, useMutation } from '@apollo/client'

const DELETE_MUTATION = gql`
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
`

const DeleteExpenseModal = props => {
    const { isOpen, toggle, expense } = props

    const [deleteExpense, { data }] = useMutation(DELETE_MUTATION)

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
                                variables: {
                                    id: expense._id,
                                },
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