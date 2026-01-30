import { useMenuItems } from "../menu-item.hooks";
import { MenuItemCard } from "./menu-item-card";


export const MenuItemList = () => {
    // TODO: use suspense - fetch from server
    const {data: menuItems} = useMenuItems();
    return (
        <div className="grid p-4 grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {menuItems?.map((menuItem) => (
                <MenuItemCard key={menuItem.id} menuItem={menuItem} />
            ))}
        </div>
    )
}