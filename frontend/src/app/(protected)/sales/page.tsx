import { SaleView } from "@/features/sales/components/sale-view";
import { saleApi } from "@/features/sales/sale.api";
import { salesParamsLoader } from "@/features/sales/sale.params";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { SearchParams } from "nuqs/server";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface Props {
    searchParams: Promise<SearchParams>;
}

export const Page = async ({ searchParams }: Props) => {
    const params = await salesParamsLoader(searchParams);

    const queryClient = new QueryClient();

    void queryClient.prefetchQuery({
        queryKey: ["sales", params],
        queryFn: () => saleApi.findAll(params)
    })

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <ErrorBoundary fallback={<p>Error</p>}>
                <Suspense fallback={<p>Loading</p>}>
                    <SaleView />
                </Suspense>
            </ErrorBoundary>
        </HydrationBoundary>
    );
}

export default Page;