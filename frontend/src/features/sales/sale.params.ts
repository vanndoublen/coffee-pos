import { PAGINATION } from "@/config/constants";
import { createLoader, parseAsInteger, parseAsString, parseAsStringEnum } from "nuqs/server";

export const saleParams = {
  page: parseAsInteger.withDefault(PAGINATION.DEFAULT_PAGE).withOptions({clearOnDefault: true}),

  size: parseAsInteger.withDefault(PAGINATION.DEFAULT_PAGE_SIZE).withOptions({clearOnDefault: true}),

  search: parseAsString.withDefault("").withOptions({clearOnDefault: true}),

  status: parseAsStringEnum([
    "DRAFT",
    "COMPLETED",
    "VOIDED",
    "REFUNDED",
    "CANCELLED",
  ]).withOptions({clearOnDefault: true}),
};

export const salesParamsLoader = createLoader(saleParams); 