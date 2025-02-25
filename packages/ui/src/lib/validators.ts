const emailPattern =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateEmail(email: string) {
    return emailPattern.test(email)
}