export type TranslationCode = 'nvi' | 'ntlh' | 'acf'

export interface TranslationMetadata {
  code: TranslationCode
  name: string
  fullName: string
  description: string
}

export const TRANSLATIONS: TranslationMetadata[] = [
  {
    code: 'nvi',
    name: 'NVI',
    fullName: 'Nova Versão Internacional',
    description: 'Linguagem moderna e fluida, amplamente utilizada',
  },
  {
    code: 'ntlh',
    name: 'NTLH',
    fullName: 'Nova Tradução na Linguagem de Hoje',
    description: 'Linguagem simples, acessível e direta',
  },
  {
    code: 'acf',
    name: 'ACF',
    fullName: 'Almeida Corrigida Fiel',
    description: 'Tradicional, baseada no Textus Receptus',
  },
]
