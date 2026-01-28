# 🎮 IMPOS2 - Versión Web

Un juego local de deducción entre amigos construido como aplicación web (SPA).

## 📋 Descripción

**IMPOS2** es un juego donde todos los jugadores menos uno (o varios) conocen una palabra secreta. El impostor debe pasar desapercibido mientras los demás intentan descubrirlo a través de rondas de discusión y eliminación.

## 🚀 Características

- ✅ **Tres modos de juego**: Manual, Semi-Manual y Base de Datos
- ✅ **Gestión de palabras**: Agrega y gestiona palabras para el juego
- ✅ **Múltiples impostores**: Configura la cantidad de impostores (1 o más)
- ✅ **Interfaz moderna**: Diseño gamer minimalista con tema oscuro y efectos neon morado
- ✅ **Persistencia local**: Usa localStorage sin dependencias nativas
- ✅ **Sistema inteligente**: Evita que un jugador sea impostor 4 veces seguidas

## 🛠️ Tecnologías

- **React 18**: Framework UI
- **Vite**: Build tool y dev server
- **React Router**: Navegación entre pantallas
- **Framer Motion**: Animaciones suaves
- **TailwindCSS**: Estilos con tema oscuro y neones morados
- **localStorage**: Persistencia de datos

## 📦 Instalación

1. Navega a la carpeta del proyecto:
```bash
cd impos2-web
```

2. Instala las dependencias:
```bash
npm install
```

## 🎯 Uso

### Modo Desarrollo

```bash
npm run dev
```

Esto iniciará el servidor de desarrollo de Vite (puerto 5173).

### Build para Producción

```bash
npm run build
```

Esto creará los archivos en la carpeta `dist/`.

### Preview del Build

```bash
npm run preview
```

## 🎮 Cómo Jugar

1. **Inicio**: Presiona "COMENZAR PARTIDA"
2. **Modo de Juego**: Selecciona entre:
   - **Modo Manual**: Una persona externa escribe UNA palabra secreta al iniciar cada partida
   - **Modo Semi-Manual**: Permite agregar VARIAS palabras de golpe (una por línea o separadas por comas)
   - **Modo Base de Datos**: Base de datos local con ~1000 palabras MUY conocidas
3. **Configurar Jugadores**: Agrega nombres de jugadores y elige la cantidad de impostores
4. **Preparación de Palabra**: Según el modo seleccionado
5. **Ver Roles**: Cada jugador verá su rol (impostor o jugador con palabra secreta)
6. **Rondas**: Los jugadores discuten y eliminan sospechosos
7. **Fin del Juego**: El juego termina cuando:
   - Todos los impostores son descubiertos (ganan los jugadores)
   - Los impostores igualan o superan a los jugadores (ganan los impostores)

## 📁 Estructura del Proyecto

```
impos2-web/
├── src/
│   ├── components/      # Componentes reutilizables
│   ├── pages/           # Pantallas del juego
│   ├── store/           # Context para gestión de estado
│   ├── data/            # Base de datos de palabras
│   ├── App.jsx          # Componente principal
│   ├── main.jsx         # Punto de entrada React
│   └── index.css        # Estilos globales
├── index.html
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## 🎨 Diseño

- **Tema oscuro** (#0B0714 → #1A1033)
- **Colores neon**: Lila (#A78BFA), Púrpura (#7C3AED)
- **Animaciones suaves** con Framer Motion
- **Efectos glow** y sombras neon
- **Tipografía moderna** y legible

## 📝 Persistencia

Los datos se guardan automáticamente en localStorage del navegador:
- Modo de juego seleccionado
- Lista de jugadores
- Cantidad de impostores
- Pool de palabras (modo semi-manual)
- Palabras usadas
- Historial de roles de impostores
- Partida actual

## 🔧 Scripts Disponibles

- `npm run dev`: Inicia desarrollo
- `npm run build`: Build para producción
- `npm run preview`: Preview del build

## 📄 Licencia

MIT

## 👨‍💻 Desarrollado por

Jose Ernesto Camps Silva

---

¡Disfruta del juego! 🎮


