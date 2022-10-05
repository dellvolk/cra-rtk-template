export interface LoginRequest {
    password: string
    email: string
}

export interface LoginResponse {
    refresh: string
    access: string
}
