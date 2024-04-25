export interface LoginResponse {
    kind: string,
    localId: string,
    displayName: string,
    idToken: string,
    registered: boolean,
    refreshToken: string,
    expiresIn: string
}
export interface RegisterResponse {
    kind: string,
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string
    localId: string,
}