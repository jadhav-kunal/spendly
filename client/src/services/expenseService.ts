import type { AxiosResponse } from 'axios';
import type { Expense, ExpenseFormData, ApiResponse } from '@/types/index.ts';
import api from './api.ts';

export const expenseService = {
  getAll: (): Promise<AxiosResponse<ApiResponse<Expense[]>>>       => api.get('/expenses'),
  create: (data: ExpenseFormData): Promise<AxiosResponse<ApiResponse<Expense>>> => api.post('/expenses', data),
  update: (id: string, data: Partial<ExpenseFormData>): Promise<AxiosResponse<ApiResponse<Expense>>> => api.put(`/expenses/${id}`, data),
  remove: (id: string): Promise<AxiosResponse<void>>               => api.delete(`/expenses/${id}`),
};