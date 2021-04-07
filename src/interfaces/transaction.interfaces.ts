export interface Transactions {
  id: string
  title: string
  operationAmount: number
  debtorNumber: number
  creatorPhone: number
  type: number
  totalPaid: number
  paymentHistory: object[]
}
