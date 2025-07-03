import { fastify } from 'fastify'
import { fastifyCors } from '@fastify/cors'
import {
  validatorCompiler,
  serializerCompiler, 
  type ZodTypeProvider,
  jsonSchemaTransform,
} from 'fastify-type-provider-zod'
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import { subscribeToEventRoutes } from './routes/subscribe-to-event-routes';
import { env } from './env'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(fastifyCors)

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'NLW connect',
      version: '0.1.0',
    },
  },
  transform: jsonSchemaTransform
}) 

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
},)

app.register(subscribeToEventRoutes)

app.listen({  port: env.PORT }).then(() => { 
    console.log('Servidor rodando na porta 3333')
    })