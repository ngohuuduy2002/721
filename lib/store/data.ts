import { faker } from "@faker-js/faker";

export interface User {
  key: string;
  storeName: string;
  address: string;
}

export function createRandomUser(): User {
  return {
    key: faker.string.uuid(),
    storeName: faker.company.name(),
    address: faker.address.streetAddress(),
  };
}

export function generateUsers(count: number): User[] {
  return Array.from({ length: count }, () => createRandomUser());
}

export const USERS: User[] = generateUsers(5);