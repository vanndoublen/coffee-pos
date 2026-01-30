"use client";

import { CreateMenuItemForm } from "./create-menu-item-form";
import { MenuItemHeader } from "./menu-item-header"
import { MenuItemList } from "./menu-item-list"

export const MenuItemView = () => {
    return (
        <div className="h-full grid grid-cols-3 rounded-md overflow-hidden bg-secondary border  shadow-md">

            <div className="col-span-2 min-h-0 overflow-y-auto border-r">
                <MenuItemHeader />
                <MenuItemList isOrderView={false} />
            </div>

            <div className="col-span-1 min-h-0 overflow-y-auto p-2">
                <CreateMenuItemForm />
            </div>

        </div>
    )
}