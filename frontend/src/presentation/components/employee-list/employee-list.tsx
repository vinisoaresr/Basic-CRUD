import { BaseSyntheticEvent } from "react";
import { IoIosCreate, IoIosRemoveCircle } from "react-icons/io";
import { EmployeeModel } from "../../pages/home-page";
import {
  AddEmployeeButton,
  Container,
  Divider,
  Header,
  Row,
  Text,
  Title,
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
        <HeaderEmployeeList />
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
          <Title>
            Add New Employee
          </Title>
        </AddEmployeeButton>
      </Wrapper>
    </Container>
  );
}


const HeaderEmployeeList: React.FC = () => {
  return <Header>
    <Title>Order</Title>
    <Title>Name</Title>
    <Title>Email</Title>
    <Title>NIS number</Title>
  </Header>

}




export default EmployeeList;
