import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal } from "react"
import EmployeeList from "../components/employee-list/employee-list"
import useFetch, { Method } from "../hooks/useFetch"

export interface EmployeeModel {
  id: string
  firstName: string
  lastName: string
  email: string
  NISNumber: number
}


interface fetchData {
  value: EmployeeModel[]
  loading: boolean
  error: boolean
}



const HomePage: React.FC = () => {
  const { value, loading, error }: fetchData = useFetch('/api/employee/', Method.GET, null)

  if (error) {
    return <></>
  }
  if (loading) {
    return <></>
  }
  if (value) {
    return (
      <>
        <EmployeeList employees={value} />
      </>
    )
  }
  return <></>
}

export default HomePage
