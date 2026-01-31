# Inicio Rápido - Impos2 Mobile

## Comandos Rápidos (Windows)

### 1. Instalación Inicial

```bash
# Navegar a la carpeta
cd impos2-mobile

# Instalar dependencias
npm install

# Preparar directorio dist (se ejecuta automáticamente después de npm install)
npm run setup:dist
```

### 2. Configurar Android

```bash
# Agregar plataforma Android
npm run cap:add:android

# Configurar Android para HTTPS (crea network_security_config.xml)
npm run setup:android

# Sincronizar
npm run cap:sync

# Abrir en Android Studio
npm run cap:open:android
```

### 3. Configurar iOS (solo en macOS)

```bash
# Agregar plataforma iOS
npm run cap:add:ios

# Sincronizar
npm run cap:sync

# Abrir en Xcode
npm run cap:open:ios
```

## Flujo Completo desde Cero

```bash
# 1. Instalar
npm install

# 2. Agregar Android
npm run cap:add:android

# 3. Configurar Android
npm run setup:android

# 4. Sincronizar
npm run cap:sync

# 5. Abrir Android Studio
npm run cap:open:android
```

## Verificar Versiones

```bash
node --version    # Debe ser v20.x o superior
npm --version
npx cap --version
```

## Estructura de Comandos

| Comando | Descripción |
|---------|-------------|
| `npm install` | Instala dependencias y prepara dist/ |
| `npm run setup:dist` | Prepara el directorio dist/ |
| `npm run setup:android` | Configura Android para HTTPS |
| `npm run cap:add:android` | Agrega plataforma Android |
| `npm run cap:add:ios` | Agrega plataforma iOS |
| `npm run cap:sync` | Sincroniza cambios con las plataformas |
| `npm run cap:open:android` | Abre proyecto en Android Studio |
| `npm run cap:open:ios` | Abre proyecto en Xcode |

## Solución Rápida de Problemas

### Error: "dist no existe"
```bash
npm run setup:dist
```

### Error: "Android no configurado"
```bash
npm run setup:android
npm run cap:sync
```

### Error: "Cannot find module"
```bash
npm install
npm run cap:sync
```

## Documentación Completa

- **SETUP.md**: Guía completa paso a paso
- **README.md**: Documentación general del proyecto
- **setup-android-config.md**: Detalles de configuración Android
- **setup-ios-config.md**: Detalles de configuración iOS







