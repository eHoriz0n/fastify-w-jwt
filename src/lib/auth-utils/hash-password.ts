import bcrypt from "bcrypt";

const saltRounds = 10;

export async function hashPassword(password: string) {
  try {
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
  } catch (error) {
    throw new Error("Error hashing password");
  }
}

export async function comparePasswords(
  candidatePassword: string,
  hashedPassword: string,
) {
  try {
    const match = await bcrypt.compare(candidatePassword, hashedPassword);
    return match;
  } catch (error) {
    throw new Error("Error comparing passwords");
  }
}
