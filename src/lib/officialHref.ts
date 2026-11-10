/** Âncoras locais permanecem; outras páginas abrem no site nacional. */
export function officialHref(href: string): string { return href.startsWith('/') && !href.startsWith('//') ? 'https://www.mutua.com.br'+href : href; }
