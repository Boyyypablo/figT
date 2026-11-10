// Serviços atuais da Mútua, usados só no bloco "continuar acessando" do fim da landing.
// Cada card leva à página do serviço no site nacional (https://www.mutua.com.br/...).
export type GrupoServico = 'tecnologicos' | 'programas';
export type LandingServico = {
    slug: string;
    nome: string;
    grupo: GrupoServico;
    /** Uma linha para o card. */
    linha: string;
    /** Página do serviço no site nacional. */
    href: string;
    /** Cor de assinatura do card. */
    cor: string;
};
const SITE = 'https://www.mutua.com.br';
export const landings: LandingServico[] = [
    { slug: 'mutua-celular', nome: 'Mútua Celular', grupo: 'tecnologicos', linha: 'Plano de celular para associados e dependentes.', href: `${SITE}/beneficios/tecnologicos/mutua-celular`, cor: '#0011FF' },
    { slug: 'mutuaverso', nome: 'Mútuaverso', grupo: 'tecnologicos', linha: 'O escritório virtual da Mútua, de todas as regionais.', href: `${SITE}/beneficios/tecnologicos/mutuaverso`, cor: '#6D26D9' },
    { slug: 'hub-de-ia', nome: 'Hub de IA', grupo: 'tecnologicos', linha: 'Curadoria de ferramentas de IA para a profissão.', href: `${SITE}/beneficios/tecnologicos/hub-de-ia`, cor: '#2563EB' },
    { slug: 'cartao-de-visita-digital', nome: 'Cartão de Visita Digital', grupo: 'tecnologicos', linha: 'Seu cartão profissional sempre à mão, gratuito.', href: `${SITE}/beneficios/tecnologicos/cartao-de-visita-digital`, cor: '#0854AA' },
    { slug: 'mutua-signer', nome: 'Mútua Signer', grupo: 'tecnologicos', linha: 'Assinatura eletrônica com validade jurídica.', href: `${SITE}/beneficios/tecnologicos/mutua-signer`, cor: '#164C92' },
    { slug: 'mutua-mulher', nome: 'Programa Mútua Mulher', grupo: 'programas', linha: 'Equidade, autonomia e benefícios para associadas.', href: `${SITE}/programas/mutua-mulher`, cor: '#8E165A' },
    { slug: 'mutua-junior', nome: 'Mútua Júnior', grupo: 'programas', linha: 'Para estudantes que vão fazer parte do Sistema.', href: `${SITE}/programas/mutua-junior`, cor: '#3C6DA7' },
    { slug: 'mutua-inova-mais', nome: 'Mútua Inova+', grupo: 'programas', linha: 'Maratona de inovação para engenharia, agronomia e geociências.', href: `${SITE}/programas/mutua-inova-mais`, cor: '#184286' },
];
export const buscarLanding = (slug: string) => landings.find((l) => l.slug === slug);
