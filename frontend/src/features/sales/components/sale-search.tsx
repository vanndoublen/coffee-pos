import { EntitySearch } from "@/components/entity"
import { useSalesParams } from "../sale.hook";
import { useSearch } from "@/hooks/useSearch";

export const SaleSearch = () => {
    const [params, setParams] = useSalesParams();

    const { searchValue, onSearchChange } = useSearch({ params, setParams });

    return (
        <EntitySearch
            value={searchValue}
            onChange={onSearchChange}
            placeholder="Search receipt No"
        />
    )
}