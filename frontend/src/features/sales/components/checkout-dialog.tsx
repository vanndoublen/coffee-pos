import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogFooter, DialogHeader } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useCartStore } from "@/features/menu-item/stores/cartStore";
import { PaymentMethod } from "@/features/payments/payment.types";
import { cn } from "@/lib/utils";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { BanknoteIcon, CreditCardIcon, Loader2Icon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useCheckout } from "../sale.hook";
import { SaleRequest } from "../sale.types";
import { generateReceiptNo, getPayments, getSaleItems } from "../lib/utils";
import { useMe } from "@/features/auth/auth.hooks";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const CheckoutDialog = ({ open, onOpenChange }: Props) => {
    const [method, setMethod] = useState<PaymentMethod>("CASH");
    const [isMultiplePayments, setIsMultiplePayments] = useState(false);
    const [enableCashPayment, setEnableCashPayment] = useState(false);
    const [enableCardPayment, setEnableCardPayment] = useState(false);
    const [cashInput, setCashInput] = useState("");
    const [cardInput, setCardInput] = useState("");

    const items = useCartStore((s) => s.items);
    const clearCart = useCartStore((s) => s.clearCart);
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

    const cashCents = enableCashPayment
        ? Math.round(Number(cashInput || 0) * 100)
        : 0;

    const cardCents = enableCardPayment
        ? Math.round(Number(cardInput || 0) * 100)
        : 0;
    const totalCents = Math.round(total * 100);
    const paidCents = cashCents + cardCents;
    const remainingCents = Math.max(0, totalCents - paidCents);
    const changeCents = Math.max(0, paidCents - totalCents);

    useEffect(() => {
        if (!enableCashPayment) {
            setCashInput("");
        }
    }, [enableCashPayment]);

    useEffect(() => {
        if (!enableCardPayment) {
            setCardInput("");
        }
    }, [enableCardPayment]);

    const queryClient = useQueryClient();
    const checkoutMutation = useCheckout();

    const { data: user } = useMe();
    if (!user) return;

    const onSubmit = () => {
        const data: SaleRequest = {
            receiptNo: generateReceiptNo(),
            cashierId: user.id,
            saleItems: getSaleItems(cartItems),
            payments: getPayments(isMultiplePayments, enableCashPayment, enableCardPayment, cashCents, cardCents, totalCents, method),
        }

        checkoutMutation.mutate(data, {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["sales"] });
                onOpenChange(false);
                clearCart();
                toast.success("Checkout completed");
            }
        })
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>

            <DialogContent className="sm:max-w-sm md:max-w-xl">
                <DialogHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <DialogTitle>Preview</DialogTitle>
                            <DialogDescription className="text-muted-foreground text-sm">
                                Confirm and complete the checkout
                            </DialogDescription>
                        </div>
                        <div className="flex items-center gap-x-2">
                            <Checkbox id="multiple-payment" checked={isMultiplePayments} onCheckedChange={(value) => setIsMultiplePayments(!!value)} />
                            <label htmlFor="multiple-payment" className="text-xs hover:cursor-pointer">Multiple payments?</label>
                        </div>
                    </div>
                </DialogHeader>

                {isMultiplePayments ? (
                    <div className="flex flex-col items-center gap-y-4">
                        <div className="w-full grid grid-cols-2 gap-x-4">
                            <div className="col-span-1 flex flex-col gap-y-4 bg-muted/45 p-4 rounded-2xl border-t shadow-2xl">
                                <div className="flex items-center justify-between">
                                    <span className={cn("text-sm", !enableCashPayment && "text-muted-foreground")}>Cash</span>
                                    <Switch checked={enableCashPayment} onCheckedChange={setEnableCashPayment} />
                                </div>
                                <Input
                                    value={cashInput}
                                    inputMode="decimal"
                                    placeholder="0.00"
                                    disabled={!enableCashPayment}
                                    onChange={(e) => {
                                        const v = e.target.value;
                                        if (v === "" || /^\d*(\.\d{0,2})?$/.test(v)) {
                                            setCashInput(v);
                                        }
                                    }}
                                    onBlur={() => {
                                        if (cashInput === "") return;
                                        const num = Number(cashInput);
                                        if (!isNaN(num)) {
                                            setCashInput(num.toFixed(2));
                                        }
                                    }}
                                />
                            </div>

                            <div className="col-span-1 flex flex-col gap-y-4 bg-muted/45 p-4 rounded-2xl border-t shadow-2xl">
                                <div className="flex items-center justify-between">
                                    <span className={cn("text-sm", !enableCardPayment && "text-muted-foreground")}>Card</span>
                                    <Switch checked={enableCardPayment} onCheckedChange={setEnableCardPayment} />
                                </div>
                                <Input
                                    value={cardInput}
                                    inputMode="decimal"
                                    placeholder="0.00"
                                    disabled={!enableCardPayment}
                                    onChange={(e) => {
                                        const v = e.target.value;
                                        if (v === "" || /^\d*(\.\d{0,2})?$/.test(v)) {
                                            setCardInput(v);
                                        }
                                    }}
                                    onBlur={() => {
                                        if (cardInput === "") return;
                                        const num = Number(cardInput);
                                        if (!isNaN(num)) {
                                            setCardInput(num.toFixed(2));
                                        }
                                    }}
                                />
                            </div>
                        </div>

                        <div className="w-full rounded-2xl px-6 py-2 bg-muted/45 border-t shadow-2xl text-sm flex justify-between ">
                            <span>Total paid: ${(paidCents / 100).toFixed(2)}</span>
                            <span>Remaining: ${Math.max(0, (remainingCents / 100)).toFixed(2)}</span>
                            <span>Change: ${Math.max(0, (changeCents / 100)).toFixed(2)}</span>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 gap-x-2 bg-secondary-foreground/5 inset-shadow-sm/15 rounded-xl p-1 border">
                        <Button
                            variant="secondary"
                            className={cn(
                                "bg-muted/90!",
                                method === "CASH" ?
                                    "border-t shadow-sm" :
                                    "bg-transparent! text-muted-foreground"
                            )}
                            onClick={() => setMethod("CASH")}
                        >
                            <BanknoteIcon className="w-6 h-6" />
                            <span>Cash</span>
                        </Button>

                        <Button
                            variant="secondary"
                            className={cn(
                                "bg-muted/90!",
                                method === "CARD" ?
                                    "border-t shadow-sm" :
                                    "bg-transparent! text-muted-foreground"
                            )}
                            onClick={() => setMethod("CARD")}
                        >
                            <CreditCardIcon className="w-6 h-6" />
                            <span>Card</span>
                        </Button>
                    </div>
                )}

                <div className="space-y-4 text-sm p-6 rounded-2xl bg-muted/45 border border-dashed border-t shadow-2xl">
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

                <DialogFooter>
                    <Button
                        variant="outline"
                        className="shadow-sm! transition-all active:scale-[0.98]"
                        disabled={isMultiplePayments && paidCents < totalCents && items.size === 0}
                        onClick={onSubmit}
                    >
                        {checkoutMutation.isPending ? (
                            <Loader2Icon className="animate-spin"/>
                        ) : (
                            <span className="text-sm font-semibold">Complete Sale</span>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>

        </Dialog>
    )
}