import { SettlementDTO } from './types/table'

export interface RequestSettlementModalProps {
  modalData: SettlementDTO | undefined
  requestModal: boolean
  closeRequestModalHandler: () => void
  className?: string
}

export type CheckListType = {
  paid: boolean
  noCancel: boolean
  responsibility: boolean
  consent: boolean
}

export type InputDataType = {
  totalPrice: number
  perPrice: number
  accountNumber: string
  memberCount: number
  bankName: string
  accountHolder: string
}

export interface CheckboxItemProps {
  checked: boolean
  onChange: () => void
  label: string
  className?: string
}

export interface InputFieldProps {
  label: string
  onChange: (value: string) => void
  placeholder: string
}
