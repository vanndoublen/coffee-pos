"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { CreateMenuItemRequest } from "../menu-item.types";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCreateMenuItem } from "../menu-item.hooks";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Loader2Icon } from "lucide-react";

const formSchema = z.object({
    name: z.string().min(1, "Name is required"),

    price: z
        .number("Price is required")
        .min(0.01, "Price must be greater than 0")
        .refine(
            (val) => Number.isInteger(val * 100),
            "Max 2 decimal places allowed"
        ),
});




type MenuFormValues = z.infer<typeof formSchema>;

export const CreateMenuItemForm = () => {
    const queryClient = useQueryClient();

    const form = useForm<MenuFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            price: undefined,
        }
    })

    const createMenuItemMutation = useCreateMenuItem();

    const onSubmit = async (values: MenuFormValues) => {
        const data: CreateMenuItemRequest = {
            name: values.name,
            price: values.price,
        }

        await createMenuItemMutation.mutateAsync(data,
            {
                onSuccess: () => {
                    toast.success("New menu created");
                    queryClient.invalidateQueries({ queryKey: ["menu-items"] });

                    form.reset({
                        name: "",
                        price: undefined,
                    });
                },

                onError: (error) => {
                    toast.error(`Error: ${error}`);
                }
            }
        );
    }

    return (
        <div
            className="h-full flex flex-col bg-muted border-t shadow-md border-white/5 relative rounded-xl p-2 gap-2"
        >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col h-full gap-2"
                >
                    <div className="flex-1 flex flex-col text-center p-4 gap-8">
                        <div>
                            <h1>Create your menu item</h1>
                            <span className="text-muted-foreground text-sm">
                                fill in the form below to create a new menu item
                            </span>
                        </div>

                        <div className="grid gap-8 border-t shadow-2xl p-8 rounded-xl bg-accent">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                className="shadow-2xl"
                                                type="username"
                                                placeholder="Latte"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="price"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Price</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                step="0.01"
                                                placeholder="2.75"
                                                value={field.value ?? ""}
                                                onChange={(e) => {
                                                    const v = e.target.value;

                                                    if (v === "") {
                                                        field.onChange(undefined);
                                                        return;
                                                    }

                                                    const num = e.target.valueAsNumber;
                                                    field.onChange(isNaN(num) ? undefined : num);
                                                }}
                                                onBlur={(e) => {
                                                    const num = e.target.valueAsNumber;

                                                    if (!isNaN(num)) {
                                                        field.onChange(Number(num.toFixed(2)));
                                                    }
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    <div className="p-6 bg-muted backdrop-blur-md border-t rounded-b-xl">
                        <Button
                            size="lg"
                            variant="outline"
                            className="bg-accent! w-full text-lg font-bold h-14 shadow-2xl shadow-primary/20 hover:shadow-primary/40 transition-all active:scale-[0.98]"
                            type="submit"
                            disabled={createMenuItemMutation.isPending}
                        >
                            {createMenuItemMutation.isPending ? (
                                <div>
                                    <Loader2Icon className="animate-spin" />
                                </div>
                            ) : (
                                <span>Create</span>
                            )}
                        </Button>
                    </div>
                </form>
            </Form>

        </div>
    )
}