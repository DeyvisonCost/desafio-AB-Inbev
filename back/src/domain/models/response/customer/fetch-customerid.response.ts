import { Either } from "@/core/either"

export type FetchCustomerIdUseCaseResponse = Either<Error, {
    id: string
    name: string
    email: string
    cpf: string 
    phone: string
    zipCode: string
    street: string
    number: string
    complement: string
    city: string
  }>

