import { RouteWithTransition } from "@/components/transition/route-with-transition";
import type { RouteObject } from "react-router";

export const withTransition = (routes: RouteObject[]): RouteObject[] => {
  return routes.map(route => {
    // Process nested routes recursively
    const processedChildren = route.children 
      ? withTransition(route.children)
      : undefined;

    return {
      ...route,
      element: route.element ? (
        <RouteWithTransition key={route.path}>
          {route.element}
        </RouteWithTransition>
      ) : undefined,
      children: processedChildren
    };
  }) as RouteObject[];
};