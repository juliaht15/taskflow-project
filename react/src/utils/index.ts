export const formatDate = (dateString: string): string => {
  return new Intl.DateTimeFormat('es-ES', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(dateString));
};

export const generateId = (): number => Date.now();