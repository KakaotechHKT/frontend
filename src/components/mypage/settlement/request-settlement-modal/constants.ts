import { CheckListType, InputDataType } from './types'

export const INITIAL_CHECK_LIST: CheckListType = {
  paid: false,
  noCancel: false,
  responsibility: false,
  consent: false,
}

export const INITIAL_INPUT_DATA: InputDataType = {
  totalPrice: 0,
  perPrice: 0,
  accountNumber: '',
  memberCount: 0,
  bankName: '',
  accountHolder: '',
}
