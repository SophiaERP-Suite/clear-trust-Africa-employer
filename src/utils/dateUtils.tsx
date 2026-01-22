import {
  formatDistanceToNow,
  format,
  differenceInDays,
  parseISO,
} from 'date-fns';

export const formatMessageTime = (dateString: string): string => {
  try {
    const date = parseISO(dateString);

    if (isNaN(date.getTime())) {
      return 'Invalid date';
    }

    const daysDiff = Math.abs(differenceInDays(new Date(), date));

    if (daysDiff < 7) {
      return formatDistanceToNow(date, { addSuffix: true });
    }

    const currentYear = new Date().getFullYear();

    return format(
      date,
      date.getFullYear() === currentYear ? 'MMM d' : 'MMM d, yyyy'
    );
  } catch (error) {
    console.error('Date formatting error:', error, dateString);
    return 'Unknown';
  }
};
