"use client";
export const Page = () => {
    return (
        <div className="h-full grid grid-cols-3 rounded-md overflow-hidden bg-background border  shadow-md">

            {/* Product list: 2/3 */}
            <div className="col-span-2 min-h-0 overflow-y-auto p-4 border-r">
                something
                <div className="h-[2000px]" />
            </div>

            {/* Checkout: 1/3 */}
            <div className="col-span-1 min-h-0 overflow-y-auto p-4">
                thing2
                <div className="h-[2000px]" />
            </div>

        </div>
    );
}

export default Page;