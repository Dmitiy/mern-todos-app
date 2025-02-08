export const handleError = (res, error = 'Something goes wrong...') => {
  res.status(500);
  res.json({ error });
};
