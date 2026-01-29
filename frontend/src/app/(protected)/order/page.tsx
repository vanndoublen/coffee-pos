"use client";

import { CheckoutPanel } from "@/features/product/components/checkout-panel";
import { OrderHeader } from "@/features/product/components/order-header";
import { ProductList } from "@/features/product/components/product-list";

export const Page = () => {
    return (
        <div className="h-full grid grid-cols-3 rounded-md overflow-hidden bg-secondary border  shadow-md">

            {/* Product list: 2/3 */}
            <div className="col-span-2 min-h-0 overflow-y-auto border-r">
                <OrderHeader />
                <ProductList />
            </div>

            {/* Checkout: 1/3 */}
            <div className="col-span-1 min-h-0 overflow-y-auto p-2">
                <CheckoutPanel />
            </div>

        </div>
    );
}

export default Page;