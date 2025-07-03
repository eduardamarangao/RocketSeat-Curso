import { z } from 'zod'

const envSchema = z.object({
    PORT: z.coerce.number().default(3333), //se não tiver a variável de ambiente PORT, o valor padrão será 3333
})

export const env = envSchema.parse(process.env)