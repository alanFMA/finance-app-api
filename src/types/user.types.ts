import type { users, Prisma } from '../../src/generated/prisma/index.js';
import type { Decimal } from '@prisma/client/runtime/library.js';
import { CreateUserSchemaType } from '../schemas/user.js';

export type User = users;

export type CreateUserDTO = Prisma.usersCreateInput;

export type UpdateUserDTO = Prisma.usersUpdateInput;

export interface UpdateUserPayloadDTO {
    first_name?: string;
    last_name?: string;
    email?: string;
    password?: string;
}

export interface UserBalanceDTO {
    earnings: Decimal;
    expenses: Decimal;
    investments: Decimal;
    balance: Decimal;
}

export type CreateUserPayloadDTO = CreateUserSchemaType;
