import { useEffect, useState } from "react"
import { EmployeeModel } from "../../pages/home-page";
import EmployeeList from "../employee-list/employee-list";
import { EmployeeModal } from "../employee-modal/employee-modal";
import { Container, Title } from "./employee-content-styles";

type propsType = {
  refreshEmployees: Function
  employees: EmployeeModel[]
}

const EmployeeContent = ({ refreshEmployees, employees }: propsType) => {
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeModel | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    function handleKeyDown (event: KeyboardEvent) {
      if (event.key === 'Escape') {
        handleCloseCreateModal();
        handleCloseEditModal();
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleCloseCreateModal, handleCloseEditModal]);

  function handleOpenCreateModal () {
    setIsCreateModalOpen(true);
  }
  function handleOpenEditModal (employee: EmployeeModel) {
    setSelectedEmployee(employee)
    setIsEditModalOpen(true);
  }
  function handleCloseCreateModal () {
    setIsCreateModalOpen(false);
    refreshEmployees(true);
  }
  function handleCloseEditModal () {
    setIsEditModalOpen(false);
    refreshEmployees(true);
  }

  return (
    <>
      <EmployeeModal isOpen={isCreateModalOpen} employee={null} callback={handleCloseCreateModal} />
      <EmployeeModal isOpen={isEditModalOpen} employee={selectedEmployee} callback={handleCloseEditModal} />
      <Container>
        <Title>Employees List</Title>
        <EmployeeList
          employees={employees}
          callback={refreshEmployees}
          openCreateModal={handleOpenCreateModal}
          openEditModal={handleOpenEditModal}
        />
      </Container>
    </>
  )
}


export default EmployeeContent
