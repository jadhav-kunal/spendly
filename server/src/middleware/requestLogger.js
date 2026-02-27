export function requestLogger(req, res, next) {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    const color =
      res.statusCode >= 500 ? '\x1b[31m' :
      res.statusCode >= 400 ? '\x1b[33m' :
      res.statusCode >= 200 ? '\x1b[32m' : '\x1b[0m';
    console.warn(
      `${color}${req.method}\x1b[0m ${req.url} ${res.statusCode} ${duration}ms`
    );
  });
  next();
}