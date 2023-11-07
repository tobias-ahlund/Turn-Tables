import { loadStripe } from "@stripe/stripe-js";

let stripePromise;
const stripeKey = import.meta.env.STRIPE_PUBLIC_KEY;

export default function getStripe() {
	if (!stripePromise) {
		stripePromise = loadStripe(`'${stripeKey}'`);
	}
	return stripePromise;
};