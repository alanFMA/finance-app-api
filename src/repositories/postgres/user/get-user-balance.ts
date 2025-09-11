import { Decimal } from '@prisma/client/runtime/library.js';
import { prisma } from '../../../database/prisma-client.js';

export class PostgresGetUserBalanceRepository {
    async execute(userId: string) {
        const totalsByType = await prisma.transactions.groupBy({
            by: ['type'],
            where: {
                user_id: userId,
            },
            _sum: {
                amount: true,
            },
        });

        const totals = {
            EARNING: new Decimal(0),
            EXPENSE: new Decimal(0),
            INVESTMENT: new Decimal(0),
        };

        for (const group of totalsByType) {
            if (group._sum.amount) {
                totals[group.type] = group._sum.amount;
            }
        }

        const balance = totals.EARNING.sub(totals.EXPENSE).sub(
            totals.INVESTMENT
        );

        return {
            earnings: totals.EARNING,
            expenses: totals.EXPENSE,
            investments: totals.INVESTMENT,
            balance,
        };
    }
}
