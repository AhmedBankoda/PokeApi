import React from "react";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider, Hydrate } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "../../styles.css";


function MyApp({ Component, pageProps }: AppProps) {
    const [queryClient] = React.useState(() => new QueryClient());
    return (
        // Provide the client to your App
        <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps?.dehydratedState ?? {}}>
                <Component {...pageProps} />
                <ReactQueryDevtools initialIsOpen={false} />
            </Hydrate>
        </QueryClientProvider>
    );
}

export default MyApp;
