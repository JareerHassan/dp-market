'use server';

/**
 * @fileOverview This file defines the AI Shopping Assistant flow.
 *
 * It allows buyers to receive personalized product recommendations and instant support.
 * - aiShoppingAssistant - The function to call to start the shopping assistant.
 * - AiShoppingAssistantInput - The input type for the aiShoppingAssistant function.
 * - AiShoppingAssistantOutput - The output type for the aiShoppingAssistant function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiShoppingAssistantInputSchema = z.object({
  query: z.string().describe('The user query or request for the shopping assistant.'),
});
export type AiShoppingAssistantInput = z.infer<typeof AiShoppingAssistantInputSchema>;

const AiShoppingAssistantOutputSchema = z.object({
  response: z.string().describe('The response from the AI shopping assistant, including product recommendations and support.'),
});
export type AiShoppingAssistantOutput = z.infer<typeof AiShoppingAssistantOutputSchema>;

export async function aiShoppingAssistant(input: AiShoppingAssistantInput): Promise<AiShoppingAssistantOutput> {
  return aiShoppingAssistantFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiShoppingAssistantPrompt',
  input: {schema: AiShoppingAssistantInputSchema},
  output: {schema: AiShoppingAssistantOutputSchema},
  prompt: `You are an AI shopping assistant for an AI digital products marketplace called Neural Nexus.
  Your goal is to help buyers find the AI tools and digital products that best meet their needs.
  Respond to the user query with personalized product recommendations and instant support. 
  Include the Product Name, Short description, Price, Category, and a Link to the product page in your response if available.

  User Query: {{{query}}}`,
});

const aiShoppingAssistantFlow = ai.defineFlow(
  {
    name: 'aiShoppingAssistantFlow',
    inputSchema: AiShoppingAssistantInputSchema,
    outputSchema: AiShoppingAssistantOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
