# Impos2 Mobile - Aplicación Capacitor

Aplicación móvil wrapper para Impos2 usando Capacitor.

## Requisitos Previos

- Node.js LTS (v20.x o superior)
- npm o yarn
- Android Studio (para Android)
- Xcode (para iOS, solo en macOS)

## Instalación y Configuración

### 1. Instalar dependencias

```bash
npm install
```

### 2. Generar assets (iconos y splash)

```bash
npx @capacitor/assets generate --iconBackgroundColor '#ffffff' --iconBackgroundColorDark '#000000' --splashBackgroundColor '#ffffff' --splashBackgroundColorDark '#000000'
```

### 3. Crear directorio dist (necesario para Capacitor)

```bash
mkdir dist
copy index.html dist\index.html
```

O en PowerShell:
```powershell
New-Item -ItemType Directory -Force -Path dist
Copy-Item index.html dist\index.html
```

### 4. Sincronizar con Capacitor

```bash
npx cap sync
```

## Android

### Agregar plataforma Android

```bash
npx cap add android
```

### Abrir en Android Studio

```bash
npx cap open android
```

### Ejecutar en emulador/dispositivo

Desde Android Studio:
1. Selecciona un dispositivo/emulador
2. Click en "Run" (▶️)

O desde la terminal:
```bash
npx cap run android
```

### Configuración Android

Los archivos de configuración ya están preparados:

- **android/app/src/main/AndroidManifest.xml**: Configurado para HTTPS solamente
- **android/app/build.gradle**: Configurado con las dependencias necesarias
- **android/variables.gradle**: Configurado con appId y appName

## iOS

### Agregar plataforma iOS (solo en macOS)

```bash
npx cap add ios
```

### Abrir en Xcode

```bash
npx cap open ios
```

### Configuración iOS

Los archivos de configuración ya están preparados:

- **ios/App/App/Info.plist**: Configurado para usar WKWebView
- **ios/App/App.xcodeproj**: Proyecto configurado

## Estructura del Proyecto

```
impos2-mobile/
├── android/                 # Proyecto Android (generado)
├── ios/                     # Proyecto iOS (generado)
├── dist/                    # Directorio de build
│   └── index.html          # HTML wrapper
├── capacitor.config.ts      # Configuración de Capacitor
├── index.html              # HTML wrapper (fuente)
├── package.json            # Dependencias
├── tsconfig.json           # Configuración TypeScript
└── README.md               # Este archivo
```

## Solución de Problemas Comunes

### Error: "Cannot find module '@capacitor/core'"

```bash
npm install
npx cap sync
```

### Error de CORS en Android

La configuración ya está lista para HTTPS. Si tienes problemas:
1. Verifica que `cleartext: false` en `capacitor.config.ts`
2. Verifica `android:allowMixedContent: false` en `capacitor.config.ts`
3. Revisa `AndroidManifest.xml` que no tenga `usesCleartextTraffic="true"`

### La web no carga en el emulador

1. Verifica la conexión a internet del emulador
2. Abre Chrome en el emulador y prueba acceder a la URL directamente
3. Verifica que la URL sea correcta en `capacitor.config.ts`
4. Revisa los logs: `adb logcat | grep -i capacitor`

### Error al ejecutar `npx cap sync`

Asegúrate de que:
1. El directorio `dist/` existe y contiene `index.html`
2. Has ejecutado `npm install` primero
3. Estás en el directorio raíz del proyecto

### El emulador no aparece en Android Studio

1. Abre Android Studio
2. Ve a Tools > Device Manager
3. Crea un nuevo dispositivo virtual (AVD)
4. Selecciona una imagen del sistema (recomendado: API 33 o superior)

### Problemas con navegación externa

La app está configurada para cargar solo la URL especificada. Si necesitas permitir navegación externa, modifica el CSP en `index.html`.

### Verificar versión de Node

```bash
node --version
```

Debe ser v20.x o superior (LTS).

### Verificar versión de Capacitor

```bash
npx cap --version
```

### Limpiar y reconstruir

Si tienes problemas persistentes:

```bash
# Limpiar node_modules
rm -rf node_modules
npm install

# Limpiar plataformas
rm -rf android ios

# Reagregar plataformas
npx cap add android
npx cap add ios

# Sincronizar
npx cap sync
```

## Comandos Útiles

```bash
# Sincronizar cambios
npx cap sync

# Sincronizar solo Android
npx cap sync android

# Sincronizar solo iOS
npx cap sync ios

# Abrir Android Studio
npx cap open android

# Abrir Xcode
npx cap open ios

# Ejecutar en Android
npx cap run android

# Ejecutar en iOS
npx cap run ios

# Copiar web assets
npx cap copy

# Actualizar Capacitor
npx cap update
```

## Desarrollo

Para desarrollo local, puedes modificar `index.html` y luego:

```bash
copy index.html dist\index.html
npx cap sync
```

## Build para Producción

### Android

1. Abre el proyecto en Android Studio
2. Build > Generate Signed Bundle / APK
3. Sigue el asistente

### iOS

1. Abre el proyecto en Xcode
2. Selecciona el esquema "App"
3. Product > Archive
4. Distribuye la app

## Notas

- La app carga la URL `https://impos2-web-1-2.vercel.app/` como wrapper
- El loading screen se muestra mientras carga la web
- Si hay error de conexión, se muestra un mensaje con botón de reintentar
- La app está configurada para HTTPS solamente (sin HTTP cleartext)
- iOS usa WKWebView por defecto






