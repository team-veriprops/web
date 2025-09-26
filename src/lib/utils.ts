import { format } from 'date-fns-tz';
import { Measurement, Money, Property, QueryPropertyDto } from '@components/website/property/models';
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
  console.log("formatPrice(price: Money): ", price)

  if (!(price instanceof Money)) {
    price = Money.from(price)

  console.log("formatPrice(price: Money), After instance convertion: ", price)
  }

    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: price.getCurrency(),
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price.getValue());
};

export const formatMeasurement = (measurement: Measurement) => {
  console.log("formatMeasurement(measurement: Measurement): ", measurement)

  return measurement.value + " " + measurement.unit;
}

export const formatDate = (dateStr: string) => {
  console.log("formatDate(dateStr: string): ", dateStr)

    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

export const handlePropertyViewDetails = (property: Property) => {
    redirect(`/properties/${property.type.toLowerCase()}s/${property.slug}`);
};

export const onLogoutRedirect = () => {redirect("/")}

export const getSearchQuery = (searchKey: string, searchParams: any) => {
  
    // Gets search query from browser

    const params = new URLSearchParams(searchParams);
    const query = params.get(searchKey!)?.toLowerCase() ?? "";

    return query
}

export function toQueryParams(payload: Object): string {
  console.log("toQueryParams(payload: Object): ", payload)

  const params = new URLSearchParams();

  Object.entries(payload).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      params.append(key, String(value));
    }
  });

  return params.toString();
}

export function getFirstPropertyPhoto(property: QueryPropertyDto): string {
  return property.images?.[0]?.url ?? "/placeholder.jpg"
}
