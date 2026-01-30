"use client";

import { CheckoutPanel } from "@/features/menuItem/components/checkout-panel";
import { MenuItemHeader } from "@/features/menuItem/components/menu-item-header";
import { MenuItemList } from "@/features/menuItem/components/menu-item-list";

export const OrderView = () => {
    return (
        <div className="h-full grid grid-cols-3 rounded-md overflow-hidden bg-secondary border  shadow-md">

            <div className="col-span-2 min-h-0 overflow-y-auto border-r">
                <MenuItemHeader />
                <MenuItemList isOrderView={true} />
            </div>

            <div className="col-span-1 min-h-0 overflow-y-auto p-2">
                <CheckoutPanel />
            </div>

        </div>
    )
}