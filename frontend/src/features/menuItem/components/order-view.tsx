"use client";

import { CheckoutPanel } from "@/features/menuItem/components/checkout-panel";
import { OrderHeader } from "@/features/menuItem/components/order-header";
import { MenuItemList } from "@/features/menuItem/components/menu-item-list";
import { useCart } from "../hooks/useCart";

export const OrderView = () => {
    const {
        cartItems,
        addItem,
        removeItem,
        subtotal,
        tax,
        total
    } = useCart();


    return (
        <div className="h-full grid grid-cols-3 rounded-md overflow-hidden bg-secondary border  shadow-md">

            <div className="col-span-2 min-h-0 overflow-y-auto border-r">
                <OrderHeader />
                <MenuItemList addItem={addItem} removeItem={removeItem} />
            </div>

            <div className="col-span-1 min-h-0 overflow-y-auto p-2">
                <CheckoutPanel
                    cartItems={cartItems}
                    addItem={addItem}
                    removeItem={removeItem}
                    subtotal={subtotal}
                    tax={tax}
                    total={total}
                />
            </div>

        </div>
    )
}