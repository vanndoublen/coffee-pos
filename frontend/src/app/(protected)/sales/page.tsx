"use client";

import { useSales } from "@/features/sales/sale.hook";

export const Page = () => {
    const { data } = useSales(); 
    return (
        <div className="h-full grid grid-cols-3 rounded-md overflow-hidden bg-background border  shadow-md">

            {JSON.stringify(data, null, 2)}

        </div>
    );
}

export default Page;