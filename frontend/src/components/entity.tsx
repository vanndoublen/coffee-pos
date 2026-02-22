import { Input } from "@/components/ui/input";
import { CgSearch } from "react-icons/cg";
import { Button } from "./ui/button";

interface EntitySearchProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export const EntitySearch = ({
    value,
    onChange,
    placeholder,
}: EntitySearchProps) => {


    return (
        <div className="relative ml-auto">
            <CgSearch className="size-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
                className="max-w-50 bg-background shadow-none border-border pl-8"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
};

interface EntityPaginationProps {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    disabled?: boolean;
}

export const EntityPagination = ({
    page,
    totalPages,
    onPageChange,
    disabled
}: EntityPaginationProps) => {
    return (

        // TODO: consider changing the index to start from 1
        <div className="flex items-center justify-between gap-x-2 w-full">
            <div className="flex-1 text-sm text-muted-foreground">
                Page {page + 1} of {totalPages || 1}
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <Button
                    disabled={page === 0 || disabled}
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(Math.max(0, page - 1))}
                >
                    Previous
                </Button>
                <Button
                    disabled={page === totalPages - 1 || totalPages === 0 || disabled}
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(Math.min(totalPages - 1, page + 1))}
                >
                    Next
                </Button>
            </div>
        </div>
    )
}