export function errorHandler(err, req, res, next) {
  console.error(`[Error] ${req.method} ${req.url}`, err.message);

  // Zod validation error
  if (err.name === 'ZodError') {
    const errors = {};
    err.errors.forEach((e) => {
      const field = e.path.join('.');
      errors[field] = e.message;
    });
    return res.status(400).json({
      message: 'Validation failed',
      errors,
    });
  }

  // Prisma not found
  if (err.code === 'P2025') {
    return res.status(404).json({ message: 'Resource not found' });
  }

  // Prisma unique constraint
  if (err.code === 'P2002') {
    return res.status(409).json({ message: 'Resource already exists' });
  }

  // Generic
  return res.status(err.status ?? 500).json({
    message: err.message ?? 'Internal server error',
  });
}