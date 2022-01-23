interface ImportMetaEnv {
    readonly VITE_CHEC_PUBLIC_KEY: string
    readonly VITE_STRIPE_PUBLIC_KEY: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
