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
            <ViewBudgetModal
                isOpen={viewModal}
                toggle={toggleViewModal}
                budget={modalInfo}
            />
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
            />
            <DeleteBudgetModal
                isOpen={deleteModal}
                toggle={toggleDeleteModal}
                budget={modalInfo}
            />
        </React.Fragment>
    )
}

BudgetModals.propTypes = {
    budgets: PropTypes.object,
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

export default BudgetModals
