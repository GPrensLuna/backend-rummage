const secretKey: string | undefined = process.env['JWT_SECRET_KEY']

if (secretKey === undefined || secretKey.trim() === '') {
  throw new Error('JWT_SECRET_KEY is not defined')
}

export const jwtConstants = {
  secret: secretKey,
}
