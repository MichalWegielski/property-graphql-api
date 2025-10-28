import { z } from "zod";

export const createPropertyInput = z.object({
  city: z.string().trim().min(1),
  street: z.string().trim().min(1),
  state: z.string().regex(/^[A-Z]{2}$/),
  zipCode: z.string().regex(/^\d{5}$/),
});

export const propertyFilterInput = z
  .object({
    city: z.string().trim().min(1).optional(),
    state: z
      .string()
      .regex(/^[A-Z]{2}$/)
      .optional(),
    zipCode: z
      .string()
      .regex(/^\d{5}$/)
      .optional(),
  })
  .optional();
