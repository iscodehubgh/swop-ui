export interface Credentials {
  username: string
  password: string
}

export interface Registration {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
}

export interface DecodedToken {
  exp: number
  email: string
  firstname: string
  lastname: string
}

export interface LoginResponse {
  token: string
}