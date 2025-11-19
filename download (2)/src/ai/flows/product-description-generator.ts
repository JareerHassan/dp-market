'use server';

/**
 * @fileOverview An AI agent for generating compelling product descriptions.
 *
 * - generateProductDescription - A function that generates a product description based on a short description and keywords.
 * - ProductDescriptionInput - The input type for the generateProductDescription function.
 * - ProductDescriptionOutput - The return type for the generateProductDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProductDescriptionInputSchema = z.object({
  shortDescription: z
    .string()
    .describe('A short, concise description of the product.'),
  keywords: z
    .string()
    .describe('A comma-separated list of keywords related to the product.'),
});
export type ProductDescriptionInput = z.infer<typeof ProductDescriptionInputSchema>;

const ProductDescriptionOutputSchema = z.object({
  productDescription: z
    .string()
    .describe('A compelling and detailed product description.'),
});
export type ProductDescriptionOutput = z.infer<typeof ProductDescriptionOutputSchema>;

export async function generateProductDescription(
  input: ProductDescriptionInput
): Promise<ProductDescriptionOutput> {
  return productDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'productDescriptionPrompt',
  input: {schema: ProductDescriptionInputSchema},
  output: {schema: ProductDescriptionOutputSchema},
  prompt: `You are an expert copywriter specializing in writing product descriptions that attract buyers.

  Based on the following short description and keywords, generate a compelling and detailed product description.

  Short Description: {{{shortDescription}}}
  Keywords: {{{keywords}}}
  `,
});

const productDescriptionFlow = ai.defineFlow(
  {
    name: 'productDescriptionFlow',
    inputSchema: ProductDescriptionInputSchema,
    outputSchema: ProductDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
