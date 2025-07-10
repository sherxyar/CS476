import bcrypt from "bcryptjs";

// Function to hash password
export async function hashPassword(password: string) {
    return await bcrypt.hash(password, 12);
}

// Function to compare user's input password with stored hash password
export async function comparePasswords(input_passwd: string, hashed_passwd: string) {
    return  await bcrypt.compare(input_passwd, hashed_passwd);
}