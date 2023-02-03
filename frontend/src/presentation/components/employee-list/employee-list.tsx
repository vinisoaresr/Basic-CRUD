import { BaseSyntheticEvent, SyntheticEvent } from "react";
import { IoIosCreate, IoIosMedkit, IoIosRemoveCircle } from "react-icons/io";

import { EmployeeModel } from "../../pages/home-page";
import {
  AddEmployeeButton,
  Container,
  Divider,
  Row,
  Text,
  Wrapper,
  WrapperIcon,
  WrapperRow
} from "./employee-list-styles";

type Props = {
  employees: EmployeeModel[]
  callback: Function
  openCreateModal: Function
  openEditModal: Function
}


const EmployeeList: React.FC<Props> = ({ employees, callback, openCreateModal, openEditModal }: Props) => {
  const handleCLickDeleteEmployee = (event: BaseSyntheticEvent, id: string) => {
    fetch(`http://localhost:3000/api/employee/${id}`, {
      method: "DELETE"
    }).then(callback())
  }
  return (
    <Container>
      <Wrapper>
        {employees.map((employee, index) => {
          return (
            <WrapperRow key={employee.id}>
              <Row>
                <Text> {index} </Text>
                <Text>{employee.firstName + ' ' + employee.lastName}</Text>
                <Text>{employee.email}</Text>
                <Text>{employee.NISNumber}</Text>
                <WrapperIcon>
                  <IoIosCreate onClick={(event) => {
                    openEditModal(employee)
                  }} />
                  <IoIosRemoveCircle onClick={(event) => handleCLickDeleteEmployee(event, employee.id)} />
                </WrapperIcon>
              </Row>
              <Divider />
            </WrapperRow>
          );
        })}
        <AddEmployeeButton onClick={event => openCreateModal(true)}>
          <Text>
            Add New Employee
          </Text>
        </AddEmployeeButton>
      </Wrapper>
    </Container>
  );
}

export default EmployeeList;
