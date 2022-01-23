import Commerce from '@chec/commerce.js';

export const commerce: Commerce = new Commerce(import.meta.env.VITE_CHEC_PUBLIC_KEY, true);
