import NextLink from "next/link";
import type { ComponentProps } from "react";

/**
 * next/link with prefetching off by default.
 *
 * Next prefetches the page behind every link that scrolls into view. A hub or
 * homepage shows dozens of article links, so one visit fired dozens of
 * requests to the origin — and any article not yet cached was rendered and
 * written to ISR just because its card was on screen. On the Hobby plan that
 * was a large share of ISR writes, ISR reads and Fast Origin Transfer.
 * Pass `prefetch` explicitly to opt a link back in.
 */
export default function Link({ prefetch = false, ...props }: ComponentProps<typeof NextLink>) {
  return <NextLink prefetch={prefetch} {...props} />;
}
