import { IoIosRemoveCircle } from "react-icons/io";

import { EmployeeModel } from "../../pages";
import {
  Container,
  Title,
  Row,
  WrapperName,
  Name,
  Score,
  TextOrder,
  WrapperRow
} from "./employee-list-styles";

type Props = {
  employees: EmployeeModel[]
}

const EmployeeList: React.FC<Props> = ({ employees }: Props) => {
  return (
    <Container>
      <Title>Funcionários</Title>
      <WrapperRow>
        {employees.map((employee, index) => {
          return (
            <Row key={index}>
              <TextOrder> {index} </TextOrder>
              <Name>{employee.firstName + ' ' + employee.lastName}</Name>
              <IoIosRemoveCircle />
            </Row>
          );
        })}
      </WrapperRow>
    </Container>
  );
}

export default EmployeeList;
