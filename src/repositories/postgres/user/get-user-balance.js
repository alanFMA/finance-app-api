import { Decimal } from '@prisma/client/runtime/library.js';
import { prisma } from '../../../database/prisma-client.js';

export class PostgresGetUserBalanceRepository {
    async execute(userId) {
        const {
            _sum: { amount: totalExpenses },
        } = await prisma.transactions.aggregate({
            where: {
                user_id: userId,
                type: 'EXPENSE',
            },
            _sum: {
                amount: true,
            },
        });

        const {
            _sum: { amount: totalEarnings },
        } = await prisma.transactions.aggregate({
            where: {
                user_id: userId,
                type: 'EARNING',
            },
            _sum: {
                amount: true,
            },
        });

        const {
            _sum: { amount: totalInvestments },
        } = await prisma.transactions.aggregate({
            where: {
                user_id: userId,
                type: 'INVESTMENT',
            },
            _sum: {
                amount: true,
            },
        });

        const _totalEarnings = totalEarnings || new Decimal(0);
        const _totalExpenses = totalExpenses || new Decimal(0);
        const _totalInvestments = totalInvestments || new Decimal(0);

        const balance = Decimal(
            _totalEarnings - _totalExpenses - _totalInvestments,
        );

        return {
            earnings: _totalEarnings,
            expenses: _totalExpenses,
            investments: _totalInvestments,
            balance,
        };
    }
}
