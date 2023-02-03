import EmployeeContent from "../components/employee-content/employee-content"
import useFetch, { Method } from "../hooks/useFetch"

export interface EmployeeModel {
  id: string
  firstName: string
  lastName: string
  email: string
  NISNumber: number
}


const HomePage: React.FC = (props: any) => {
  const { value, loading, error, setNeedRefresh } = useFetch('/api/employee/', Method.GET, null)
  if (error) {
    return <></>
  }
  if (loading) {
    return <></>
  }
  if (value) {
    return (
      <>
        <EmployeeContent refreshEmployees={setNeedRefresh} employees={value} />
      </>
    )
  } else {
    return <></>
  }
}

export default HomePage
