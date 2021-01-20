import React from 'react'
import PropTypes from 'prop-types'
import ViewExpenseModal from 'components/ExpenseModals/ViewExpenseModal'
import CreateExpenseModal from 'components/ExpenseModals/CreateExpenseModal'
import EditExpenseModal from 'components/ExpenseModals/EditExpenseModal'
import DeleteExpenseModal from 'components/ExpenseModals/DeleteExpenseModal'

const ExpenseModals = props => {
    const {
        budgets,
        currentBudget,
        expense,
        modalInfo,
        viewModal,
        toggleViewModal,
        createModal,
        toggleCreateModal,
        editModal,
        toggleEditModal,
        deleteModal,
        toggleDeleteModal,
    } = props

    return (
        <React.Fragment>
            <ViewExpenseModal
                isOpen={viewModal}
                toggle={toggleViewModal}
                currentBudget={currentBudget}
                expense={modalInfo}
            />
            <CreateExpenseModal
                isOpen={createModal}
                toggle={toggleCreateModal}
                budgets={budgets}
                currentBudget={currentBudget}
            />
            <EditExpenseModal
                isOpen={editModal}
                toggle={toggleEditModal}
                budgets={budgets}
                currentBudget={currentBudget}
                expense={modalInfo}
            />
            <DeleteExpenseModal
                isOpen={deleteModal}
                toggle={toggleDeleteModal}
                expense={modalInfo}
            />
        </React.Fragment>
    )
}

ExpenseModals.propTypes = {
    budgets: PropTypes.object,
    currentBudget: PropTypes.object,
    expense: PropTypes.object,
    modalInfo: PropTypes.object,
    viewModal: PropTypes.bool,
    toggleViewModal: PropTypes.func,
    createModal: PropTypes.bool,
    toggleCreateModal: PropTypes.func,
    editModal: PropTypes.bool,
    toggleEditModal: PropTypes.func,
    deleteModal: PropTypes.bool,
    toggleDeleteModal: PropTypes.func,
}

export default ExpenseModals
