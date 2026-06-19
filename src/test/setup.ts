import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

export const mockRouterPush = vi.fn();
export const mockRouterReplace = vi.fn();

vi.mock("next/navigation", () => ({
  usePathname: () => window.location.pathname || "/",
  useParams: () => ({}),
  useRouter: () => ({
    push: mockRouterPush,
    replace: mockRouterReplace,
  }),
}));
