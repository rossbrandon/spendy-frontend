import React from 'react'
import PropTypes from 'prop-types'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { useAuth0 } from '@auth0/auth0-react'
import { config } from '../../config'

const getQuery = variables => {
    return {
        query: `
            mutation deleteBudget($id: String!) {
                deleteBudget(id: $id) {
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

const DeleteBudgetModal = props => {
    const { isOpen, toggle, budget } = props
    const { getAccessTokenSilently } = useAuth0()

    const deleteBudget = async variables => {
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
                                id: budget._id,
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
