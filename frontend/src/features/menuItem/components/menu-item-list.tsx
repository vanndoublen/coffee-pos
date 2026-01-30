import { useMenuItems } from "../menu-item.hooks";
import { CartItem, MenuItemResponse } from "../menu-item.types";
import { Dispatch, SetStateAction, useEffect } from "react";
import { MenuItemCard } from "./menu-item-card";

interface ManuItemListProps {
    isOrderView: boolean;
}

export const MenuItemList = ({ isOrderView }: ManuItemListProps) => {
    // TODO: use suspense - fetch from server
    const { data: menuItems } = useMenuItems();

    return (
        <div className="grid p-4 grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {menuItems?.map((menuItem) => (
                <MenuItemCard
                    key={menuItem.id}
                    isOrderView={isOrderView}
                    menuItem={menuItem}
                />
            ))}
        </div>
    )
}