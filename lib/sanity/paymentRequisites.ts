import { contentClient } from "./contentClient";

export interface PaymentRequisites {
  seller: string;
  edrpouOrRnokpp: string;
  iban: string;
}

const PAYMENT_REQUISITES_QUERY = `
*[_type == "paymentRequisites" && _id == "paymentRequisites"][0]{
  seller,
  edrpouOrRnokpp,
  iban
}
`;

export async function getPaymentRequisites(): Promise<PaymentRequisites | null> {
  const row = await contentClient.fetch<PaymentRequisites | null>(
    PAYMENT_REQUISITES_QUERY,
    {},
    {
      next: {
        revalidate: 3600,
        tags: ["sanity:paymentRequisites"],
      },
    },
  );

  if (!row?.seller?.trim() || !row.edrpouOrRnokpp?.trim() || !row.iban?.trim()) {
    return null;
  }

  return {
    seller: row.seller.trim(),
    edrpouOrRnokpp: row.edrpouOrRnokpp.trim(),
    iban: row.iban.trim().toUpperCase(),
  };
}

/** UA00 0000 0000 0000 0000 0000 0000 0 */
export function formatIbanDisplay(iban: string): string {
  const clean = iban.replace(/\s/g, "").toUpperCase();
  return clean.replace(/(.{4})/g, "$1 ").trim();
}
