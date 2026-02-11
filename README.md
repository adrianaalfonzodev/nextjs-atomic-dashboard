# API Login Demo

Aplicacion web construida con Next.js 15, React 19 y Supabase. Incluye autenticacion de usuarios, un dashboard con datos de SpaceX y un CRUD de posts usando JSONPlaceholder.

## Tech Stack

- **Next.js 15** (App Router + Turbopack)
- **React 19** + TypeScript
- **Tailwind CSS 4**
- **Redux Toolkit** (estado de autenticacion)
- **Supabase** (auth backend)
- **Phosphor Icons**

## Requisitos

- Node.js 18+
- npm

## Instalacion

1. Clonar el repositorio:

```bash
git clone https://github.com/adrianaalfonzodev/api-login-demo.git
cd api-login-demo
```

2. Instalar dependencias:

```bash
npm install
```

3. Configurar variables de entorno. Copiar el archivo de ejemplo y ajustar los valores si es necesario:

```bash
cp .env.example .env
```

Variables requeridas:

| Variable                               | Descripcion               |
| -------------------------------------- | ------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`             | URL del proyecto Supabase |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Clave publica de Supabase |
| `NEXT_PUBLIC_SPACEX_API_URL`           | URL de la API de SpaceX   |
| `NEXT_PUBLIC_JSONPLACEHOLDER_API_URL`  | URL de JSONPlaceholder    |

## Usuario de prueba

| Campo | Valor              |
| ----- | ------------------ |
| Email | `user@example.com` |
| Clave | `password`         |

## Ejecucion

### Desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### Produccion

```bash
npm run build
npm start
```

### Lint

```bash
npm run lint
```

## Estructura del Proyecto (Atomic Design)

```
src/
  components/
    atoms/          Button, Input, Checkbox, Label, Textarea, Spinner, Divider, IconButton, ExternalLink
    molecules/      FormField, TextareaField, NavItem, SocialLoginButton, PostCard, LaunchCard
    organisms/      LoginForm, RegisterForm, PostForm, PostList, Sidebar, Header, ProfileForm
    templates/      AuthTemplate, DashboardTemplate
  app/              Paginas (Next.js App Router)
    auth/           Login y registro
    dashboard/      Home, profile, posts
  features/         Redux slices (auth)
  hooks/            Custom hooks (useAuthCheck)
  lib/              API clients (Supabase, SpaceX, JSONPlaceholder)
  store/            Redux store y provider
```
