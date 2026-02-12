import { useMemo, useState } from "react";
import {
    CreditCard,
    Banknote,
    Trash2,
    ShoppingBag,
    ArrowRight,
    Minus,
    Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useCartStore } from "../stores/cartStore";

interface Props {
    setOpenDialog: (open: boolean) => void;
}

export const CheckoutPanel = ({ setOpenDialog }: Props) => {
    const items = useCartStore((s) => s.items);
    const addItem = useCartStore((s) => s.addItem);
    const removeItem = useCartStore((s) => s.removeItem);

    const cartItems = useMemo(
        () => Array.from(items.values()),
        [items]
    );

    const subtotal = useMemo(
        () =>
            cartItems.reduce(
                (acc, item) =>
                    acc + item.unitPriceSnapshot * item.qty,
                0
            ),
        [cartItems]
    );

    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    return (
        <div
            className="h-full flex flex-col bg-muted border-t shadow-md border-white/5 relative rounded-xl p-2"
        >

            <div className="flex-1 overflow-y-auto space-y-3 px-4 pb-4">
                <div className="sticky top-0 z-10 p-8 pb-4 border-b bg-muted/90 ">
                    <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
                        Current Order
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-xs text-primary">
                            {cartItems.length}
                        </span>
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">
                        Order #2034 • {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                </div>

                {cartItems.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-muted-foreground space-y-4 opacity-50">
                        <ShoppingBag className="w-16 h-16 stroke-1" />
                        <p>No items added yet</p>
                    </div>
                ) : (
                    cartItems.map((item) => (
                        <div
                            key={item.menuItem.id}
                            className="group flex items-center gap-4 p-3 rounded-xl hover:bg-secondary transition-all backdrop-blur-md"
                        >
                            <div className="h-12 w-12 rounded-lg bg-black/20 p-1 shrink-0">
                                <img src="/logo.svg" alt={item.menuItemNameSnapshot} className="h-full w-full object-contain" />
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start">
                                    <h4 className="font-medium text-sm truncate">{item.menuItemNameSnapshot}</h4>
                                    <span className="font-bold text-sm">
                                        ${(item.unitPriceSnapshot * item.qty).toFixed(2)}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between mt-1">
                                    <p className="text-xs text-muted-foreground">
                                        {item.qty} x ${item.unitPriceSnapshot.toFixed(2)}
                                    </p>

                                    <div className="flex items-center bg-muted/50 border border-border/50 rounded-full shadow-sm">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            disabled={!item.menuItem.active}
                                            className="h-8 w-8 rounded-full hover:bg-destructive/10 hover:text-destructive"
                                            onClick={() => removeItem(item.menuItem)}
                                        >
                                            <Minus className="h-4 w-4" />
                                        </Button>

                                        <span className="w-px h-3 bg-border" />

                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            disabled={!item.menuItem.active}
                                            className="h-8 w-8 rounded-full hover:bg-primary/20 hover:text-primary"
                                            onClick={() => addItem(item.menuItem)}
                                        >
                                            <Plus className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div className="p-6 bg-muted space-y-6 rounded-2xl border-t">
                {/* Totals Breakdown */}
                <div className="space-y-4 text-sm border-t shadow-2xl p-6 rounded-xl bg-accent">
                    <div className="flex justify-between text-muted-foreground">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                        <span>Tax (10%)</span>
                        <span>${tax.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-end">
                        <span className="text-base font-medium">Total</span>
                        <span className="text-3xl font-bold tracking-tight text-primary">
                            ${total.toFixed(2)}
                        </span>
                    </div>
                </div>
                
                <Button
                    size="lg"
                    variant="outline"
                    className="bg-accent! shadow-2xl border-0! border-t! w-full text-lg font-bold h-14 transition-all active:scale-[0.98]"
                    disabled={items.size === 0}
                    onClick={() => setOpenDialog(true)}
                >
                    <span>Charge ${total.toFixed(2)}</span>
                    <ArrowRight className="ml-2 h-5 w-5" />
                </Button>


            </div>
        </div>
    );
};