import type { ClassValue } from 'clsx';
import { clsx } from 'clsx';
import dayjs from 'dayjs';
import { toast } from 'react-hot-toast';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const formatDate = (date: Date, format: string) => {
  return dayjs(date).format(format);
};

export const copyToClipboard = (text: string, whatCopied: string) => {
  navigator.clipboard.writeText(text);
  toast.success(`${whatCopied} copied to the clipboard.`);
};

export const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
});
