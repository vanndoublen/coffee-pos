import { EntityPagination } from "@/components/entity";
import { useSales, useSalesParams } from "../sale.hook"

export const SalePagination = () => {
    const [params, setParams] = useSalesParams();
    const { data: sales, isFetching } = useSales(params);

    if (!sales) {
        return;
    }

    return (
        <EntityPagination
            disabled={isFetching}
            page={sales.number}
            totalPages={sales.totalPages}
            onPageChange={(page) => setParams({...params, page})}
        />
    )
}