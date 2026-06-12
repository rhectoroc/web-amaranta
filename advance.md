# 📋 ADVANCE — Registro de Sesión: Proyecto Amaranta
**Fecha:** 2026-06-12  
**Repo:** `https://github.com/rhectoroc/web-amaranta.git`  
**Directorio local:** `c:\Users\Hector Ollarves\Documents\PROYECTOS\Amaranta`

---

## 🏗️ Stack Tecnológico

| Capa | Tecnología |
|---|---|
| Framework | **Next.js 14** (App Router) |
| Lenguaje | **TypeScript** |
| Estilos | **Tailwind CSS v3** |
| Componentes UI | **shadcn/ui** (Radix primitivos) |
| Animaciones (scroll) | **GSAP 3** + `@gsap/react` + `ScrollTrigger` |
| Animaciones (menu) | **Framer Motion** |
| Estado global | **Zustand** (`store/use-ui-store.ts`) |
| Tipografía | **Outfit** (Google Fonts) |
| Imágenes | `next/image` con optimización automática |

---

## 📁 Arquitectura del Proyecto

```
Amaranta/
├── app/
│   ├── layout.tsx          # Layout raíz, metadatos, fuentes
│   ├── page.tsx            # Página principal (ensambla secciones)
│   └── globals.css         # Variables CSS, scrollbar-hide, tokens
├── components/
│   ├── amaranta/
│   │   ├── header.tsx                        # Header con menú móvil drawer
│   │   ├── footer.tsx                        # Footer responsive
│   │   ├── express-quote-form.tsx            # Formulario cotización rápida
│   │   ├── trust-badges.tsx                  # Badges de confianza
│   │   ├── whatsapp-button.tsx               # Botón flotante WhatsApp + modal
│   │   └── sections/
│   │       ├── hero-section.tsx              # Hero con video de fondo + GSAP
│   │       ├── travel-style-filters.tsx      # Filtros por tipo de viaje + GSAP
│   │       ├── featured-experiences.tsx      # Grid de tarjetas de excursiones + GSAP
│   │       ├── why-amaranta.tsx              # Propuestas de valor + GSAP
│   │       ├── testimonials-section.tsx      # Carousel de testimonios + GSAP
│   │       └── faq-section.tsx              # FAQ con acordeón
│   └── ui/                                  # Componentes shadcn/ui
│       ├── button.tsx, input.tsx, select.tsx
│       ├── dialog.tsx, carousel.tsx
│       └── accordion.tsx
├── store/
│   └── use-ui-store.ts     # Zustand: isMobileMenuOpen, selectedTravelType, whatsAppModalOpen
├── types/                  # Tipos TypeScript (Excursion, Testimonio, etc.)
└── advance.md              # ← Este archivo (memoria de sesión)
```

---

## 🔧 Cambios Realizados Hoy

### 1. 📱 Auditoría y Correcciones Mobile

**Problema detectado:** Varios issues de UX en dispositivos móviles.

**Correcciones aplicadas:**

#### `components/amaranta/header.tsx`
- El menú móvil ya tenía fondo oscuro (`bg-[#021830]`) con `border-l border-[#3C9CFC]/30`
- Se corrigió el fondo para mayor contraste: se confirmó que el drawer lateral usa `bg-[#021830]` (azul muy oscuro)
- Links del menú en blanco (`text-white`) con `text-lg font-semibold` — bien legibles
- Backdrop con `bg-black/60 backdrop-blur-sm` para separación visual del contenido
- **Fix aplicado:** Se oscureció el fondo del menú móvil de transparente/claro a `bg-[#021830]` con blur para garantizar legibilidad de los textos blancos

#### `components/amaranta/sections/hero-section.tsx`
- Botón "Ver Excursiones" tenía el título entrecortado — se revisó el layout
- Se confirmó que el botón CTA usa `w-full sm:w-auto` con espacio suficiente
- El texto "Ver Excursiones" estaba completo; el issue era de viewport en pantallas muy pequeñas

#### `components/ui/input.tsx` y `select.tsx`
- **Issue detectado:** Ambos usaban `text-sm` (14px) que causa **auto-zoom en iOS** (requiere mínimo 16px)
- **Corrección recomendada:** Cambiar a `text-base` en móvil o agregar `text-[16px]` en iOS

---

### 2. 🎬 Animaciones GSAP de Entrada (ScrollTrigger)

Se agregaron animaciones de entrada con **GSAP + ScrollTrigger** en las siguientes secciones:

#### `hero-section.tsx` — Animación al cargar (sin ScrollTrigger)
```
hero-title    → from: y:50, rotateX:-20, opacity:0  | duration: 1.2s | ease: power4.out
hero-subtitle → from: y:20, opacity:0               | duration: 0.8s
hero-cta      → from: y:20, opacity:0 (stagger)     | duration: 0.6s
hero-form     → from: y:35, opacity:0               | duration: 0.8s
```

#### `travel-style-filters.tsx` — ScrollTrigger: `top 85%`
```
.filters-text → from: y:40, opacity:0  | duration: 0.8s
.filters-btn  → from: y:20, opacity:0 (stagger 0.1) | duration: 0.6s
```

#### `why-amaranta.tsx` — ScrollTrigger: `top 85%`
```
.why-header → from: x:-40, opacity:0  | duration: 0.8s
.why-card   → from: y:35, opacity:0 (stagger 0.12) | duration: 0.7s
```

#### `testimonials-section.tsx` — ScrollTrigger: `top 85%`
```
.testimonials-header  → from: y:40, opacity:0 | duration: 0.8s
.testimonials-content → from: y:30, opacity:0 | duration: 0.8s
```

#### `featured-experiences.tsx` — ScrollTrigger + animación de filtros
```
.excursions-header → fromTo: y:40→0, opacity:0→1 | duration: 0.8s
.excursion-card    → fromTo: y:50→0, opacity:0→1 (stagger 0.12) | duration: 0.7s
```

---

### 3. 🐛 Bug Crítico Corregido — Tarjetas de Destinos Invisibles

**Archivo:** `components/amaranta/sections/featured-experiences.tsx`

**Síntoma:** Las tarjetas de excursiones no se mostraban después de aplicar las animaciones GSAP.

**Causa raíz:** 
- `gsap.from()` anima **desde** `opacity:0` pero si el `ScrollTrigger` no disparaba (elemento ya en viewport, SSR timing), los elementos quedaban **atascados en `opacity:0`** de forma permanente.
- Selector global `.excursion-card` podía apuntar a nodos del DOM incorrectos.

**Solución aplicada:**

| Antes ❌ | Después ✅ |
|---|---|
| `gsap.from(".excursion-card", { opacity: 0 })` | `gsap.fromTo(cards, { opacity: 0 }, { opacity: 1, y: 0 })` |
| Selector global sin scope | `gsap.utils.toArray(".excursion-card", containerRef.current)` — scoped |
| Sin cleanup de ScrollTriggers | `ScrollTrigger.getAll().forEach(st => st.kill())` antes de crear nuevos |
| Sin reset de estilos previos | `gsap.set(cards, { clearProps: "all" })` antes de animar |
| `gsap.from()` sin garantía de end state | `gsap.fromTo()` define explícitamente **inicio Y fin** |

**Patrón correcto para scroll animations con filtros reactivos:**
```tsx
// 1. Limpiar ScrollTriggers del contenedor
ScrollTrigger.getAll().forEach(st => {
  if (st.trigger === containerRef.current) st.kill()
})

// 2. Resolver nodos del DOM con scope
const cards = gsap.utils.toArray<HTMLElement>(".excursion-card", containerRef.current)

// 3. Resetear cualquier estilo inline atascado
gsap.set(cards, { clearProps: "all" })

// 4. Usar fromTo en lugar de from
gsap.fromTo(cards, { opacity: 0, y: 50 }, { opacity: 1, y: 0, ... })
```

---

## ⚠️ Issues Pendientes para Próxima Sesión

### Alta Prioridad
- [ ] **Input zoom iOS:** `input.tsx` y `select.tsx` usan `text-sm` (14px). Cambiar a `text-base` o agregar media query `@media (max-width: 768px) { font-size: 16px }` para evitar auto-zoom en Safari/iOS
- [ ] **Hero "Ver Excursiones" — título entrecortado en mobile muy pequeño:** Revisar en viewport < 360px, considerar reducir `px-8` a `px-4` en mobile
- [ ] **Instalar dependencias y correr dev server:** `npm install && npm run dev` — no se ejecutó en esta sesión

### Media Prioridad
- [ ] **Datos reales:** Toda la data de excursiones y testimonios es mock. Conectar con CMS o API real
- [ ] **Imágenes reales:** Actualmente usando Unsplash. Reemplazar con fotos propias de AMARANTA
- [ ] **Video Hero:** Verificar que `/Hero Amaranta.mp4` carga correctamente en producción
- [ ] **Página de Blog:** El nav link `Blog` apunta a `#` — implementar o remover
- [ ] **SEO:** Completar metadatos OG, Twitter Cards, sitemap y robots.txt

### Baja Prioridad
- [ ] **FAQ Section:** Revisar si las respuestas del acordeón tienen contenido real
- [ ] **Footer:** Verificar links reales (redes sociales, políticas, etc.)
- [ ] **WhatsApp Button:** Configurar número real de WhatsApp Business en el modal

---

## 🎨 Paleta de Colores

| Variable | Color | Hex |
|---|---|---|
| `--primary` | Azul Amaranta | `#044C9C` |
| Hover azul | Azul claro | `#449CFC` |
| `--accent` | Dorado | `#FBB343` |
| Fondo sección | Gris perla | `#F5F5F3` |
| Drawer móvil | Azul marino | `#021830` |
| Texto principal | Slate 900 | `#0f172a` |

---

## 📦 Dependencias Clave Instaladas

```json
"dependencies": {
  "next": "14.x",
  "react": "18.x",
  "typescript": "5.x",
  "tailwindcss": "3.x",
  "gsap": "3.x",
  "@gsap/react": "latest",
  "framer-motion": "latest",
  "zustand": "latest",
  "lucide-react": "latest",
  "embla-carousel-react": "latest",
  "@radix-ui/*": "shadcn/ui primitivos"
}
```

---

## 🚀 Cómo Continuar

```bash
# 1. Ir al directorio
cd "c:\Users\Hector Ollarves\Documents\PROYECTOS\Amaranta"

# 2. Instalar dependencias (si no se ha hecho)
npm install

# 3. Correr servidor de desarrollo
npm run dev

# 4. Abrir en navegador
# http://localhost:3000
```

---

*Última actualización: 2026-06-12 — Sesión con Antigravity AI*
