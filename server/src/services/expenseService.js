import prisma from '../lib/prisma.js';

export const expenseService = {
  async getAll(userId) {
    return prisma.expense.findMany({
      where:   { userId },
      orderBy: { expenseDate: 'desc' },
    });
  },

  async getById(id, userId) {
    return prisma.expense.findFirst({
      where: { id, userId },
    });
  },

  async create(userId, data) {
    return prisma.expense.create({
      data: {
        userId,
        title:       data.title,
        description: data.description ?? null,
        category:    data.category,
        amount:      data.amount,
        expenseDate: new Date(data.expense_date),
      },
    });
  },

  async update(id, userId, data) {
    const expense = await prisma.expense.findFirst({ where: { id, userId } });
    if (!expense) return null;

    return prisma.expense.update({
      where: { id },
      data: {
        ...(data.title        !== undefined && { title:       data.title }),
        ...(data.description  !== undefined && { description: data.description }),
        ...(data.category     !== undefined && { category:    data.category }),
        ...(data.amount       !== undefined && { amount:      data.amount }),
        ...(data.expense_date !== undefined && { expenseDate: new Date(data.expense_date) }),
      },
    });
  },

  async remove(id, userId) {
    const expense = await prisma.expense.findFirst({ where: { id, userId } });
    if (!expense) return null;

    return prisma.expense.delete({ where: { id } });
  },
};