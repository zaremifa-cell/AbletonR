"use client";

import NextLink from "next/link";
import { useParams as useNextParams, usePathname, useRouter } from "next/navigation";
import { useEffect, type AnchorHTMLAttributes, type ReactNode } from "react";

type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className"> & {
  to: string;
  href?: never;
  className?: string;
  children: ReactNode;
};

export function Link({ to, children, ...props }: LinkProps) {
  return (
    <NextLink href={to} {...props}>
      {children}
    </NextLink>
  );
}

type NavLinkProps = Omit<LinkProps, "className"> & {
  className?: string | ((state: { isActive: boolean }) => string | undefined);
};

export function NavLink({ to, className, children, ...props }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === to || (to !== "/" && pathname.startsWith(`${to}/`));
  const resolvedClassName = typeof className === "function" ? className({ isActive }) : className;

  return (
    <NextLink
      href={to}
      aria-current={isActive ? "page" : undefined}
      className={resolvedClassName}
      {...props}
    >
      {children}
    </NextLink>
  );
}

export function useNavigate() {
  const router = useRouter();
  return (to: string) => router.push(to);
}

export function useLocation() {
  const pathname = usePathname();
  const normalizedSearch = typeof window === "undefined" ? "" : window.location.search;

  return {
    pathname,
    search: normalizedSearch,
    hash: typeof window === "undefined" ? "" : window.location.hash,
    key: `${pathname}${normalizedSearch}`,
  };
}

export function useParams<T extends Record<string, string | undefined> = Record<string, string | undefined>>() {
  return useNextParams() as T;
}

export function Navigate({ to, replace = false }: { to: string; replace?: boolean }) {
  const router = useRouter();

  useEffect(() => {
    if (replace) router.replace(to);
    else router.push(to);
  }, [replace, router, to]);

  return null;
}
