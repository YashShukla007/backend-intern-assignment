import { z } from "zod";

export const createQuoteSchema = z.object({
  customer: z.string().min(1, "Customer is required"),

  project: z.string().min(1, "Project is required"),

  estimatedValue: z
    .number()
    .positive("Estimated value must be greater than zero"),
});

export const updateStatusSchema = z.object({
  status: z.enum([
    "NEW",
    "IN_REVIEW",
    "NEEDS_INFO",
    "COMPLETED",
  ]),
});