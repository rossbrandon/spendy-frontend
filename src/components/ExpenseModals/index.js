import CreateExpenseModal from 'components/ExpenseModals/CreateExpenseModal'
import EditExpenseModal from 'components/ExpenseModals/EditExpenseModal'
import PropTypes from 'prop-types'
import React from 'react'

const ExpenseModals = props => {
    const {
        budgets,
        currentBudget,
        modalInfo,
        createModal,
        toggleCreateModal,
        editModal,
        toggleEditModal,
        showConfirmation,
        setShowConfirmation,
    } = props

    return (
        <React.Fragment>
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
                showConfirmation={showConfirmation}
                setShowConfirmation={setShowConfirmation}
            />
        </React.Fragment>
    )
}

ExpenseModals.propTypes = {
    budgets: PropTypes.array,
    currentBudget: PropTypes.object,
    modalInfo: PropTypes.object,
    createModal: PropTypes.bool,
    toggleCreateModal: PropTypes.func,
    editModal: PropTypes.bool,
    toggleEditModal: PropTypes.func,
    showConfirmation: PropTypes.bool,
    setShowConfirmation: PropTypes.func,
}

export default ExpenseModals
