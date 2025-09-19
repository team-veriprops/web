import { format } from 'date-fns-tz';
import { Measurement, Money, Property } from '@components/property/models';
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { redirect } from 'next/navigation';

/**
 * Combines multiple class name values into a single string,
 * and intelligently merges Tailwind CSS classes to avoid conflicts.
 * It’s especially useful when:
     1. You want to conditionally join class names
     2. You're using tailwind-variants or clsx
     3. You want to merge conflicting Tailwind utilities properly
 *
 * @example
 * cn('bg-white', 'text-black', conditional && 'opacity-50')
 * // → "bg-white text-black opacity-50" (if conditional is truthy)
 *
 * @example
 * cn('p-2', 'p-4') // → "p-4" (twMerge resolves the conflict)
 *
 * @param {...ClassValue[]} inputs - A list of class values, which can be strings, objects, arrays, or conditionals.
 * @returns {string} - A single, space-separated, conflict-resolved string of class names.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// export const isActivePath = (path: string, pathname: string) => {
//   return pathname.startsWith(path)
// };

export function isActivePath(key: string, pathname: string, other_links: string[]): boolean {
  // 1. Check direct match (pathname starts with key)
  if (pathname.startsWith(key)) {
    return true;
  }

  // 2. Check other_links match
  const keyLast = key.substring(key.lastIndexOf('/')); // e.g. "/lands"
  return other_links.some((link) => {
    const linkLast = link.substring(link.lastIndexOf('/')); // e.g. "/lands"
    // console.log("pathname: ", pathname, ", key: ", key, ", link: ", link, ", linkLast: ", linkLast, ", keyLast: ", keyLast )
    return pathname.startsWith(link) && linkLast === keyLast;
  });
}

export const formatPrice = (price: Money) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: price.getCurrency(),
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price.getValue());
};

export const formatMeasurement = (measurement: Measurement) => {
  return measurement.value + " " + measurement.unit;
}

export const handlePropertyViewDetails = (property: Property) => {
    redirect(`/properties/${property.type.toLowerCase()}s/${property.slug}`);
};
