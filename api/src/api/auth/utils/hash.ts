import { compareSync, genSalt, hash } from "bcryptjs";

export const comparePassword = (password: string, hash: string) => {
  return compareSync(password, hash);
};

export const hashPassword = async (plainPassword: string) => {
  const salt = await genSalt();
  const passwordHashed = await hash(plainPassword, salt);

  return passwordHashed;
};
