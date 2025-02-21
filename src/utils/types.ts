
// Reason why you may want to use a type and not the dto is because
// the client might send additoinal properties you would need
// on the server but not the database

// example: building registration form, 2 passwords, one to create the
// password and the other to confirm the password
export type CreateUserParams = {
  username: string
  password: string
}

export type UpdateUserParams = {
  username: string
  password: string
}