import { z } from 'zod'

export const depositSchema = z.object({
  depositAmount: z
    .string({
      required_error: 'This field is required',
    })
    .regex(/^\d+(\.\d{1,18})?$/, 'Enter a valid number (up to 18 optional decimal places)')
    .refine((val) => !isNaN(Number(val)), {
      message: 'Must be a valid number',
    }),
})

export const withdrawSchema = z.object({
  withdrawShares: z
    .string({
      required_error: 'This field is required',
    })
    .regex(/^\d+(\.\d{1,18})?$/, 'Enter a valid number (up to 18 optional decimal places)')
    .refine((val) => !isNaN(Number(val)), {
      message: 'Must be a valid number',
    }),
})

export type DepositFormData = z.infer<typeof depositSchema>
export type WithdrawFormData = z.infer<typeof withdrawSchema>
