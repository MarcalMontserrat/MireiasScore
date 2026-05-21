# 🏀 Mireia's Score

Marcador de baloncesto para categoría **pre-mini** (8 cuartos), diseñado para usar desde el móvil durante los partidos.

👉 **[Abrir marcador](https://marcalmontserrat.github.io/MireiasScore/)**

---

## Funcionalidades

- **8 cuartos** (Q1–Q8)
- Suma de **+1, +2, +3** por equipo en el cuarto activo
- Botón **−1** para corregir errores
- **Marcador total acumulado** siempre visible
- **Tabla de desglose** por cuarto con detalle de tiros (1×, 2×, 3×)
- **Nombres de equipo** editables
- **Reinicio** de partido con confirmación
- Diseño **mobile-first** con botones grandes para tocar fácil

## Estructura del proyecto

```
MireiasScore/
├── index.html       # Markup
├── css/
│   └── style.css    # Estilos mobile-first
└── js/
    ├── state.js     # Estado y lógica
    ├── render.js    # Actualización del DOM
    └── app.js       # Eventos e inicialización
```

## Despliegue

Publicado en **GitHub Pages** desde la rama `main`.  
Cualquier push a `main` actualiza automáticamente la web.
