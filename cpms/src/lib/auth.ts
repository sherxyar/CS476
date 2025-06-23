import bcrypt from "bcryptjs";

// Function to hash password
export async function hashPassword(password: string) {
    // asynchronously generate a salt i.e random data to use in password hashing
    const salt = await bcrypt.genSalt();
    // asynchronously generate a hash for the given password
    return bcrypt.hash(password, salt); // return hashed password
}

// Function to compare user's input password with stored hash password
export async function comparePasswords(input_passwd: string, hashed_passwd: string) {
    // asynchronously test a password against a hash
    return bcrypt.compare(input_passwd, hashed_passwd); // return boolean
}

// Function to check password complexity
export function complexPasswordCheck(password: string) {
    /*
    Password criteria:
    1. Atleast one upper case letter
    2. Atleast one lower case letter
    3. Atleast one digit
    4. Atleast one special character
    5. Minimum 8 character length
    */
    const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return regex.test(password);
 }