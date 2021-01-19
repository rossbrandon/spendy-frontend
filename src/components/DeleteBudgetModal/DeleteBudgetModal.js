import React from 'react'
import PropTypes from 'prop-types'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { gql, useMutation } from '@apollo/client'

const DELETE_MUTATION = gql`
    mutation deleteBudget($id: String!) {
        deleteBudget(id: $id) {
            _id
            name
            amount
            showInMenu
        }
    }
`

const DeleteBudgetModal = props => {
    const { isOpen, toggle, budget } = props

    const [deleteBudget, { data }] = useMutation(DELETE_MUTATION)

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
                <ModalHeader toggle={toggle}>Delete Budget</ModalHeader>
                <ModalBody>
                    <p className="mb-2">Do you want to delete this budget?</p>
                </ModalBody>
                <ModalFooter>
                    <Button
                        type="button"
                        color="danger"
                        onClick={() => {
                            deleteBudget({
                                variables: {
                                    id: budget._id,
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

DeleteBudgetModal.propTypes = {
    toggle: PropTypes.func,
    isOpen: PropTypes.bool,
    budget: PropTypes.object,
}

export default DeleteBudgetModal
