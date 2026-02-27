import { Router } from 'express';
import { expenseController } from '../controllers/expenseController.js';
import { validate } from '../middleware/validate.js';
import { createExpenseSchema, updateExpenseSchema } from '../validations/expenseSchema.js';

const router = Router();

router.get   ('/',    expenseController.getAll);
router.post  ('/',    validate(createExpenseSchema), expenseController.create);
router.put   ('/:id', validate(updateExpenseSchema), expenseController.update);
router.delete('/:id', expenseController.remove);

export default router;