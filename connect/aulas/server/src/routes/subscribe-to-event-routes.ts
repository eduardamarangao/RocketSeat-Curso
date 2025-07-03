import type { FastifyInstance } from 'fastify';
import { z } from 'zod';

export async function subscribeToEventRoutes(app: FastifyInstance) {
  const subscriptionSchema = z.object({
    name: z.string(),
    email: z.string().email(),
  });

  type SubscriptionBody = z.infer<typeof subscriptionSchema>;

  app.post<{ Body: SubscriptionBody }>('/subscriptions', {
    schema: {
        summary: 'Subscribes someone to the event',
        tags: ['subscriptions'],
      body: subscriptionSchema,
      response: {
        201: subscriptionSchema,
      },
    },
  }, async (req, res) => {
    const { email, name } = req.body;

    // Criação da inscrição no banco de dados

    return res.status(201).send({
      name,
      email,
    });
  });
}