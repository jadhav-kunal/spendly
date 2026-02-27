import { expenseService } from '../services/expenseService.js';
import { uuidSchema } from '../validations/expenseSchema.js';

// Hardcoded for now — replaced with real auth in a future iteration
const DEFAULT_USER_ID = process.env.DEFAULT_USER_ID;

export const expenseController = {
  async getAll(req, res, next) {
    try {
      const expenses = await expenseService.getAll(DEFAULT_USER_ID);
      res.json({ data: expenses });
    } catch (err) {
      next(err);
    }
  },

  async create(req, res, next) {
    try {
      const expense = await expenseService.create(DEFAULT_USER_ID, req.body);
      res.status(201).json({ data: expense, message: 'Expense created' });
    } catch (err) {
      next(err);
    }
  },

  async update(req, res, next) {
    try {
      const { id } = req.params;
      uuidSchema.parse(id);

      const expense = await expenseService.update(id, DEFAULT_USER_ID, req.body);
      if (!expense) return res.status(404).json({ message: 'Expense not found' });

      res.json({ data: expense, message: 'Expense updated' });
    } catch (err) {
      next(err);
    }
  },

  async remove(req, res, next) {
    try {
      const { id } = req.params;
      uuidSchema.parse(id);

      const expense = await expenseService.remove(id, DEFAULT_USER_ID);
      if (!expense) return res.status(404).json({ message: 'Expense not found' });

      res.status(200).json({ message: 'Expense deleted' });
    } catch (err) {
      next(err);
    }
  },
};