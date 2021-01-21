import React from 'react'
import PropTypes from 'prop-types'
import ViewBudgetModal from 'components/BudgetModals/ViewBudgetModal'
import CreateBudgetModal from 'components/BudgetModals/CreateBudgetModal'
import EditBudgetModal from 'components/BudgetModals/EditBudgetModal'
import DeleteBudgetModal from 'components/BudgetModals/DeleteBudgetModal'

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
    viewModal: PropTypes.bool,
    toggleViewModal: PropTypes.func,
    editModal: PropTypes.bool,
    toggleEditModal: PropTypes.func,
    showConfirmation: PropTypes.bool,
    setShowConfirmation: PropTypes.func,
}

export default BudgetModals
