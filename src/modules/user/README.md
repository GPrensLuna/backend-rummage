//const TIME_OUT = 2000

// private readonly userData: ReqUserCreateDto[] = []

// const userExists = this.userData.some(
//   (user) => user.email === reqUserCreate.email,
// )
// if (userExists) {
//   this.logger.error('User already exists')
//   return {
//     email: reqUserCreate.email,
//     message: 'User already exists',
//   }
// }

// return await new Promise((resolve) => {
//   setTimeout(() => {
//     this.userData.push(reqUserCreate)
//     resolve({
//       email: reqUserCreate.email,
//       message: 'User created',
//     })
//   }, TIME_OUT)
// })
