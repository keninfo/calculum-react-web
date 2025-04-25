import { z } from 'zod'

export const velvetTxSchema = z.object({
  amount: z
    .string({
      required_error: 'This field is required',
    })
    .regex(/^\d+(\.\d{1,18})?$/, 'Enter a valid number (up to 18 optional decimal places)')
    .refine((val) => !isNaN(Number(val)), {
      message: 'Must be a valid number',
    }),
})

export type VelvetTxType = z.infer<typeof velvetTxSchema>
