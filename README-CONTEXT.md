# Schema - Dynamic Layout Renderer

## 🎯 Sobre o Projeto

O Schema é um sistema de renderização dinâmica que utiliza arquivos JSON para definir a estrutura e o conteúdo de páginas web. Ao invés de codificar a estrutura diretamente nos componentes React, você pode alterá-la através de arquivos JSON simples.

**Principais características:**

- ✨ Renderização dinâmica de componentes baseada em schemas
- 🎨 Componentes UI pré-construídos (Header, Footer, Hero Banner, Product Grid)
- ⚡ APIs RESTful para servir header, body e footer
- 🔄 Carregamento assíncrono com Suspense e skeleton loading
- 📱 Design responsivo com Tailwind CSS
- 🛡️ Type-safe com TypeScript
- 🎬 Animações suaves e efeitos visuais

## 📁 Estrutura do Projeto

```
schema/
├── app/
│   ├── api/
│   │   ├── body/route.ts           # API para retornar seções do body
│   │   ├── footer/route.ts         # API para retornar footer
│   │   ├── header/route.ts         # API para retornar header
│   │   └── schema-unico/route.ts   # API para retornar schema completo
│   ├── schema/page.tsx             # Página principal que renderiza o layout dinâmico
│   ├── layout.tsx                  # Layout raiz
│   ├── page.tsx                    # Página inicial
│   └── globals.css                 # Estilos globais
├── components/
│   ├── DynamicLayoutRenderer.tsx   # Componente principal responsável pela renderização
│   ├── headers/
│   │   └── HeaderModern.tsx        # Componente de header moderno
│   ├── footers/
│   │   └── FooterSimple.tsx        # Componente de footer simples
│   └── sections/
│       ├── HeroBanner.tsx          # Seção hero com title, subtitle e CTA
│       └── ProductGrid.tsx         # Grid de produtos
├── schemas/
│   ├── schema-body.json            # Schema para as seções do body (Hero, Produtos, etc)
│   ├── schema-footer.json          # Schema para o footer
│   └── schema-header.json          # Schema para o header
├── public/                         # Arquivos estáticos públicos
├── package.json
├── tsconfig.json
├── next.config.ts
├── tailwindcss.config.ts
└── eslint.config.mjs
```

## � DynamicLayoutRenderer - Componente Principal

O `DynamicLayoutRenderer.tsx` é o coração do sistema, responsável por renderizar dinamicamente componentes baseado em schemas JSON. É um componente genérico que mapeia strings de nomes de componentes para seus componentes React reais.

### Como Funciona

O componente utiliza um padrão de **mapeamento dinâmico** onde:

1. Um schema JSON define qual componente renderizar e seus props
2. O `DynamicLayoutRenderer` busca o componente no `COMPONENT_MAP`
3. O componente é renderizado com os props fornecidos

### Tipos Definidos

O arquivo define as seguintes interfaces TypeScript:

#### `HeaderModernProps`

Props para o componente de header:

```typescript
{
  logoUrl: string;           // URL do logo
  storeName: string;         // Nome da loja
  menuItems: Array<{         // Itens do menu
    label: string;           // Texto do item
    href: string;            // Link do item
  }>;
  backgroundColor?: string;  // Cor de fundo (opcional)
  textColor?: string;        // Cor do texto (opcional)
}
```

#### `HeroBannerProps`

Props para o componente hero banner:

```typescript
{
  title: string;             // Título principal
  subtitle: string;          // Subtítulo
  imageUrl?: string;         // URL da imagem (opcional)
  buttonText: string;        // Texto do botão
  buttonLink?: string;       // Link do botão (opcional)
}
```

#### `ProductGridProps`

Props para o grid de produtos:

```typescript
{
  title: string; // Título da seção
  columns: number; // Número de colunas
  products: Array<{
    // Array de produtos
    id: number; // ID único do produto
    name: string; // Nome do produto
    price: number; // Preço do produto
    image: string; // URL da imagem
  }>;
}
```

#### `FooterSimpleProps`

Props para o componente footer:

```typescript
{
  copyright: string;         // Texto de copyright
  links?: Array<{            // Links do footer (opcional)
    label: string;           // Texto do link
    href: string;            // URL do link
  }>;
  socialMedia?: Array<{      // Redes sociais (opcional)
    platform: string;        // Nome da plataforma
    url: string;             // URL do perfil
  }>;
  backgroundColor?: string;  // Cor de fundo (opcional)
}
```

### O Mapeamento de Componentes

O `COMPONENT_MAP` é um objeto que mapeia strings para componentes React:

```typescript
const COMPONENT_MAP: Record<string, React.ComponentType<ComponentProps>> = {
  HeaderModern: HeaderModern,
  HeroBanner: HeroBanner,
  ProductGrid: ProductGrid,
  FooterSimple: FooterSimple,
};
```

**Para adicionar um novo componente ao sistema:**

1. Crie seu componente em `components/`
2. Defina sua interface de props
3. Adicione o componente ao `COMPONENT_MAP`
4. Adicione a interface ao tipo union `ComponentProps`

### Componente Export: `DynamicComponent`

Componente que renderiza um único componente dinâmico:

```typescript
<DynamicComponent
  component="HeaderModern"
  props={{
    logoUrl: "...",
    storeName: "Minha Loja",
    menuItems: [...]
  }}
/>
```

**Props:**

- `component`: String com o nome do componente (deve estar em `COMPONENT_MAP`)
- `props`: Objeto com os props do componente

### Componente Export: `DynamicLayoutRenderer`

Renderiza um layout completo (header + body com múltiplas seções + footer):

```typescript
export default function DynamicLayoutRenderer({ schema }: Props);
```

**Props:**

- `schema`: Objeto `LayoutSchema` com a estrutura completa

**Estrutura do Schema:**

```typescript
interface LayoutSchema {
  version: string;
  storeId: string;
  layout: {
    header: ComponentConfig;
    body: {
      sections: SectionConfig[];
    };
    footer: ComponentConfig;
  };
}
```

**Exemplo de uso:**

```tsx
import DynamicLayoutRenderer from "@/components/DynamicLayoutRenderer";

const layoutSchema = {
  version: "1.0",
  storeId: "store-1",
  layout: {
    header: {
      component: "HeaderModern",
      props: {
        logoUrl: "https://...",
        storeName: "Loja X",
        menuItems: [
          { label: "Home", href: "/" },
          { label: "Produtos", href: "/produtos" }
        ]
      }
    },
    body: {
      sections: [
        {
          id: "hero-1",
          component: "HeroBanner",
          props: {
            title: "Bem-vindo",
            subtitle: "Veja nossos produtos",
            buttonText: "Comprar"
          }
        },
        {
          id: "produtos-1",
          component: "ProductGrid",
          props: {
            title: "Produtos em Destaque",
            columns: 3,
            products: [...]
          }
        }
      ]
    },
    footer: {
      component: "FooterSimple",
      props: {
        copyright: "© 2026 Minha Empresa"
      }
    }
  }
};

export default function App() {
  return <DynamicLayoutRenderer schema={layoutSchema} />;
}
```

### Tratamento de Erros

Se um componente não for encontrado no `COMPONENT_MAP`, o sistema:

1. Registra um aviso no console: `Componente "NomeInvalido" não encontrado`
2. Retorna `null` em vez de quebrar a aplicação

Isso garante que um componente inválido não derrube a página inteira.

## �📝 Como Usar

### Usando a Página Principal

Acesse [http://localhost:3000](http://localhost:3000) e clique no botão "Dinâmico" para ir para a página que renderiza o layout baseado em schemas.

### Modificando os Schemas

Os schemas JSON determinam o que é renderizado na página. Existem 3 tipos principais:

#### 1. Header Schema (`schemas/schema-header.json`)

Define a estrutura do cabeçalho:

```json
{
  "component": "HeaderModern",
  "props": {
    "logoUrl": "https://...",
    "storeName": "Sua Loja",
    "menuItems": [
      { "label": "Home", "href": "/" },
      { "label": "Produtos", "href": "/produtos" }
    ]
  }
}
```

#### 2. Body Schema (`schemas/schema-body.json`)

Define as seções da página:

```json
{
  "sections": [
    {
      "id": "hero-1",
      "component": "HeroBanner",
      "props": {
        "title": "Bem-vindo",
        "subtitle": "Descrição",
        "buttonText": "Comprar Agora"
      }
    },
    {
      "id": "products-1",
      "component": "ProductGrid",
      "props": {
        "title": "Nossos Produtos",
        "columns": 3,
        "products": [...]
      }
    }
  ]
}
```

#### 3. Footer Schema (`schemas/schema-footer.json`)

Define a estrutura do rodapé:

```json
{
  "component": "FooterSimple",
  "props": {
    "copyright": "© 2026 Sua Empresa",
    "links": [...],
    "socialMedia": [...]
  }
}
```

### Componentes Disponíveis

#### HeaderModern

Renderiza um cabeçalho moderno com logo e menu:

- `logoUrl`: URL do logo
- `storeName`: Nome da loja
- `menuItems`: Array de itens do menu

#### HeroBanner

Seção hero com destacamento:

- `title`: Título principal
- `subtitle`: Subtítulo
- `buttonText`: Texto do botão CTA
- `imageUrl`: URL da imagem (opcional)
- `buttonLink`: Link do botão (opcional)

#### ProductGrid

Grid responsivo de produtos:

- `title`: Título da seção
- `columns`: Número de colunas (1-4)
- `products`: Array de produtos com id, name, price, image

#### FooterSimple

Rodapé simples:

- `copyright`: Texto de copyright
- `links`: Array de links (opcional)
- `socialMedia`: Array com redes sociais (opcional)

## 🔌 APIs Disponíveis

### GET /api/header

Retorna a configuração do header em JSON

### GET /api/body

Retorna a configuração das seções do body em JSON

### GET /api/footer

Retorna a configuração do footer em JSON

### GET /api/schema-unico

Retorna o schema completo da página
