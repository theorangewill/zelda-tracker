# Tailwind CSS - Classes Personalizadas

## Cores

O projeto define cores personalizadas no `tailwind.config.js`:

### Primary (Verde Zelda)
- `bg-primary` - Verde principal (#2d7a3e)
- `bg-primary-dark` - Verde escuro (#1f5429)
- `bg-primary-light` - Verde claro (#4a9d5f)
- `text-primary` - Texto verde

### Accent (Dourado)
- `bg-accent` - Amarelo dourado (#ffd700)
- `bg-accent-dark` - Dourado escuro (#ccac00)
- `text-accent` - Texto dourado

### Status
- `bg-danger` - Vermelho (#e74c3c)
- `bg-success` - Verde sucesso (#27ae60)
- `text-danger`, `text-success`

## Sombras

- `shadow-card` - Sombra suave para cards
- `shadow-card-hover` - Sombra mais pronunciada no hover

## Animações

- `animate-fadeIn` - Fade in com movimento suave

## Exemplos de Uso

```jsx
// Botão primário
<button className="bg-primary text-white px-5 py-2 rounded-lg hover:bg-primary-light">
  Clique aqui
</button>

// Card com sombra
<div className="bg-white rounded-xl shadow-card hover:shadow-card-hover p-5">
  Conteúdo do card
</div>

// Badge
<span className="bg-accent text-gray-800 px-3 py-1 rounded-xl text-xs font-semibold">
  Badge
</span>

// Gradiente
<div className="bg-gradient-to-r from-primary to-primary-light">
  Gradiente verde
</div>
```
