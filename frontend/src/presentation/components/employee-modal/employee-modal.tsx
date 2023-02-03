import { BaseSyntheticEvent, SyntheticEvent, useEffect, useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { EmployeeModel } from "../../pages/home-page";
import Button from "./button/button";
import { Content, Title, LabelError, Text, Overlay, Row } from "./employee-modal-styles";
import Input from "./input/input";



interface ModalProps {
  isOpen: boolean;
  employee: null | undefined | EmployeeModel
  callback: () => void;
}


export function EmployeeModal ({ isOpen, employee, callback }: ModalProps) {
  const [error, setError] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [NIS, setNIS] = useState<string>("");

  useEffect(() => {
    if (employee) {
      setFirstName(employee.firstName);
      setLastName(employee.lastName);
      setEmail(employee.email);
      setNIS(employee.NISNumber.toString());
    }
  }, [employee]);

  function cleanup (): any {
    setFirstName("")
    setLastName("")
    setEmail("")
    setNIS("")
  }

  function createEmployee (): void {
    fetch(`http://localhost:3000/api/employee`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "accept": "application/json"
      },
      body: JSON.stringify({
        "firstName": firstName,
        "lastName": lastName,
        "email": email,
        "NISNumber": NIS
      })
    }).then((response: Response) => {
      if (response.status == 200) {
        cleanup()
        callback()
      } else {
        response.json().then((body: any) => {
          setError(body.name)
        }
        )
      }
    }).catch(() => {
      console.log()
    })
  }
  function editEmployee (id: string): void {
    fetch(`http://localhost:3000/api/employee`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        "accept": "application/json"
      },
      body: JSON.stringify({
        "id": id,
        "firstName": firstName,
        "lastName": lastName,
        "email": email,
        "NISNumber": NIS
      })
    }).then((response: Response) => {
      if (response.status == 200) {
        cleanup()
        callback()
      } else {
        response.json().then((body: any) => {
          setError(body.name)
        }
        )
      }
    }).catch(() => {
      console.log()
    })
  }

  function handleClickSubmit (): void {
    if (!employee) {
      createEmployee()
    } else {
      editEmployee(employee.id)
    }
  }

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <Overlay>
        <Content>
          <Row>
            <Title>📋 Enter the data: </Title>
            <IoIosCloseCircleOutline onClick={callback} />
          </Row>
          <Input
            type="name"
            placeholder="First name"
            value={firstName}
            onChange={(e: BaseSyntheticEvent) => [setFirstName(e.target.value), setError("")]}
          />
          <Input
            type="name"
            placeholder="Surname"
            value={lastName}
            onChange={(e: BaseSyntheticEvent) => [setLastName(e.target.value), setError("")]}
          />
          <Input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e: BaseSyntheticEvent) => [setEmail(e.target.value), setError("")]}
          />
          <Input
            type="number"
            placeholder="NIS number"
            value={NIS}
            onChange={(e: BaseSyntheticEvent) => [setNIS(e.target.value), setError("")]}
          />
          <LabelError>{error}</LabelError>
          <Button Text={"Submit"} onClick={handleClickSubmit} />
        </Content>
      </Overlay>
    </>
  )
}
