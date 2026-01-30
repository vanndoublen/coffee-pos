import { MenuItemHeader } from "./menu-item-header"

export const MenuItemView = () => {
    return (
        <div className="h-full grid grid-cols-3 rounded-md overflow-hidden bg-secondary border  shadow-md">

            <div className="col-span-2 min-h-0 overflow-y-auto border-r">
                <MenuItemHeader />
            </div>

            <div className="col-span-1 min-h-0 overflow-y-auto p-2">
                
            </div>

        </div>
    )
}