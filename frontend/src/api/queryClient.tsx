import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000,
        onError: (err) => {
          // TODO: Default handling of errors
          console.error(err);
          return err;
        },
      },
    },
  });