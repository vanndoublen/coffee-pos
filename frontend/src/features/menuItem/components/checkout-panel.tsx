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


export const CheckoutPanel = () => {
    const [paymentMethod, setPaymentMethod] = useState<"cash" | "card">("card");

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
            className="h-full flex flex-col bg-secondary/90 border-t shadow-md border-white/5 relative rounded-xl p-2"
        >

            <div className="flex-1 overflow-y-auto space-y-3 px-4">
                <div className="sticky top-0 z-10 p-6 pb-4 border-b bg-secondary/90 ">
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
                            className="group flex items-center gap-4 p-3 rounded-xl bg-muted/20 border border-transparent hover:border-primary/20 hover:bg-muted/40 transition-all backdrop-blur-md"
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

            <div className="p-6 bg-secondary backdrop-blur-md border-t space-y-6 rounded-b-xl">

                <div className="grid grid-cols-2 gap-3 shadow-2xl rounded-xl bg-muted/45 p-1">
                    <Button
                        variant="secondary"
                        onClick={() => setPaymentMethod("cash")}
                        className={cn(
                            "flex bg-transparent! items-center justify-ceniter gap-2 p-3 rounded-xl border-0 transition-all duration-200",
                            paymentMethod === "cash"
                                ? "text-primary bg-accent/30! shadow-2xl"
                                : "bg-transparent border-border hover:bg-muted/10 text-muted-foreground/50"
                        )}
                    >
                        <Banknote className="w-6 h-6" />
                        <span className="text-xs font-semibold uppercase">Cash</span>
                    </Button>

                    <Button
                        variant="secondary"

                        onClick={() => setPaymentMethod("card")}
                        className={cn(
                            "flex bg-transparent! items-center justify-ceniter gap-2 p-3 rounded-xl border-0 transition-all duration-200",
                            paymentMethod === "card"
                                ? "text-primary bg-accent/30! shadow-2xl"
                                : "bg-transparent border-border hover:bg-muted/10 text-muted-foreground/50"
                        )}
                    >
                        <CreditCard className="w-6 h-6" />
                        <span className="text-xs font-semibold uppercase">Card</span>
                    </Button>

                    {/* 
                    <Button
                    variant="ghost"

                        onClick={() => setPaymentMethod("card")}
                        className={cn(
                            "flex items-center justify-center gap-2 p-3 rounded-xl border transition-all duration-200",
                            paymentMethod === "card"
                                ? "bg-primary/10 border-primary text-primary shadow-[0_0_20px_-5px_rgba(0,0,0,0.3)] shadow-primary/20"
                                : "bg-muted/10 border-border hover:bg-muted/20 text-muted-foreground"
                        )}
                    >
                        <CreditCard className="w-6 h-6" />
                        <span className="text-xs font-semibold uppercase">Card</span>
                    </Button>
                    */}
                </div>

                {/* Totals Breakdown */}
                <div className="space-y-4 text-sm shadow-2xl p-6 rounded-xl bg-muted/45">
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
                    className="w-full text-lg font-bold h-14 shadow-2xl shadow-primary/20 hover:shadow-primary/40 transition-all active:scale-[0.98]"
                >
                    <span>Charge ${total.toFixed(2)}</span>
                    <ArrowRight className="ml-2 h-5 w-5" />
                </Button>


            </div>
        </div>
    );
};