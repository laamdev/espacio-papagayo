"use client";

import { useActionState } from "react";
import { type CheckoutState, startCheckout } from "@/app/crowdfunding/actions";
import { Button } from "@/components/ui/button";

type TierFormProps = {
	tierId: string;
	disabled: boolean;
	label: string;
	freeAmount?: { min: number; max: number };
};

export function TierForm({
	tierId,
	disabled,
	label,
	freeAmount,
}: TierFormProps) {
	const [state, formAction, pending] = useActionState<CheckoutState, FormData>(
		startCheckout,
		{},
	);
	const errorId = `${tierId}-error`;

	return (
		<form action={formAction} className="flex flex-col gap-3">
			<input type="hidden" name="tierId" value={tierId} />
			{freeAmount && (
				<label className="flex flex-col gap-1.5 text-sm">
					<span className="text-muted-foreground">Importe (€)</span>
					<input
						type="number"
						name="amount"
						required
						inputMode="numeric"
						min={freeAmount.min}
						max={freeAmount.max}
						step={1}
						placeholder={`Desde ${freeAmount.min} €`}
						disabled={disabled}
						aria-describedby={state.error ? errorId : undefined}
						className="h-10 rounded-lg border border-input bg-background px-3 text-base outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:opacity-50"
					/>
				</label>
			)}
			<Button
				type="submit"
				size="lg"
				disabled={disabled || pending}
				className="h-11 text-base"
			>
				{pending ? "Abriendo el pago…" : label}
			</Button>
			{state.error && (
				<p id={errorId} role="alert" className="text-sm text-destructive">
					{state.error}
				</p>
			)}
		</form>
	);
}
