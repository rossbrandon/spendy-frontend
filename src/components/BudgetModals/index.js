import CreateBudgetModal from 'components/BudgetModals/CreateBudgetModal'
import EditBudgetModal from 'components/BudgetModals/EditBudgetModal'
import PropTypes from 'prop-types'
import React from 'react'

const BudgetModals = props => {
    const {
        budgets,
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
            <CreateBudgetModal
                isOpen={createModal}
                toggle={toggleCreateModal}
                budgets={budgets}
            />
            <EditBudgetModal
                isOpen={editModal}
                toggle={toggleEditModal}
                budgets={budgets}
                budget={modalInfo}
                showConfirmation={showConfirmation}
                setShowConfirmation={setShowConfirmation}
            />
        </React.Fragment>
    )
}

BudgetModals.propTypes = {
    budgets: PropTypes.array,
    modalInfo: PropTypes.object,
    createModal: PropTypes.bool,
    toggleCreateModal: PropTypes.func,
    editModal: PropTypes.bool,
    toggleEditModal: PropTypes.func,
    showConfirmation: PropTypes.bool,
    setShowConfirmation: PropTypes.func,
}

export default BudgetModals
