"use client";
import { useSearch } from "@/hooks/useSearch";
import { useSales, useSalesParams } from "../sale.hook";
import { EntitySearch } from "@/components/entity";
import { SalePagination } from "./sale-pagination";
import { SaleSearch } from "./sale-search";

export const SaleView = () => {
    const [params, setParams] = useSalesParams();

    const { data } = useSales(params);
    return (
        <div className="h-full grid grid-cols-3 rounded-md overflow-hidden bg-background border  shadow-md">
            <div className="col-span-2 flex flex-col items-center justify-center w-full">
                {data?.content.map((item) => (
                    <div key={item.id} className="w-full border-t shadow-2xs">
                        <span>{item.id}     </span>
                        <span>{item.receiptNo}</span>
                    </div>
                ))}

                <SalePagination />
            </div>

            <div className="col-span-1 min-h-0 overflow-y-auto p-2">
                <div
                    className="h-full flex flex-col bg-muted border-t shadow-md border-white/5 relative rounded-xl p-2"
                >
                    <div className="flex-1 overflow-y-auto space-y-3 px-4 pb-4">
                        <SaleSearch />
                    </div>
                </div>
            </div>
        </div>
    )
}