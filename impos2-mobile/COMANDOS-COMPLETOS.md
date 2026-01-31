# Comandos Completos - Impos2 Mobile

## Secuencia Completa de Comandos (Windows)

### Verificación Inicial

```bash
# Verificar Node.js (debe ser v20.x o superior)
node --version

# Verificar npm
npm --version

# Navegar a la carpeta del proyecto
cd impos2-mobile
```

### Instalación y Setup Inicial

```bash
# 1. Instalar dependencias (esto también ejecuta prepare-dist automáticamente)
npm install

# 2. Verificar que dist/ existe
dir dist

# 3. Verificar que index.html está en dist/
dir dist\index.html
```

### Configuración Android

```bash
# 1. Agregar plataforma Android
npx cap add android

# 2. Configurar Android para HTTPS (crea network_security_config.xml y modifica AndroidManifest.xml)
npm run setup:android

# 3. Verificar configuración Android
type android\app\src\main\AndroidManifest.xml | findstr usesCleartextTraffic
type android\app\src\main\res\xml\network_security_config.xml

# 4. Sincronizar con Capacitor
npx cap sync

# 5. Abrir en Android Studio
npx cap open android
```

### En Android Studio

1. Esperar a que termine de indexar (puede tardar varios minutos la primera vez)
2. Si no hay emulador:
   - Tools > Device Manager
   - Create Device
   - Seleccionar dispositivo (ej: Pixel 5)
   - Seleccionar imagen del sistema (API 33 o superior)
   - Finish
3. Seleccionar el dispositivo/emulador del dropdown superior
4. Click en Run (▶️) o presionar Shift+F10

### Configuración iOS (solo en macOS)

```bash
# 1. Agregar plataforma iOS
npx cap add ios

# 2. Sincronizar
npx cap sync

# 3. Abrir en Xcode
npx cap open ios
```

### Generar Iconos y Splash (Opcional)

```bash
# Nota: Requiere que android/ e ios/ ya existan

# Generar assets
npx @capacitor/assets generate --iconBackgroundColor '#ffffff' --iconBackgroundColorDark '#000000' --splashBackgroundColor '#ffffff' --splashBackgroundColorDark '#000000'

# Sincronizar después de generar assets
npx cap sync
```

## Comandos de Verificación

### Verificar Estructura

```bash
# Verificar que dist existe
dir dist

# Verificar estructura de android
dir android\app\src\main

# Verificar network_security_config.xml
type android\app\src\main\res\xml\network_security_config.xml

# Verificar AndroidManifest.xml
type android\app\src\main\AndroidManifest.xml
```

### Verificar Versiones

```bash
# Node.js
node --version

# npm
npm --version

# Capacitor CLI
npx cap --version

# Capacitor Core (desde package.json)
npm list @capacitor/core
```

### Verificar Configuración

```bash
# Verificar capacitor.config.ts
type capacitor.config.ts

# Verificar package.json
type package.json

# Verificar que index.html tiene la URL correcta
type index.html | findstr impos2-web-1-2.vercel.app
```

## Comandos de Desarrollo

### Sincronizar Cambios

```bash
# Sincronizar todo
npx cap sync

# Sincronizar solo Android
npx cap sync android

# Sincronizar solo iOS
npx cap sync ios
```

### Actualizar después de Cambios

```bash
# Si modificas capacitor.config.ts o index.html:
npm run setup:dist
npx cap sync

# Si modificas configuración de Android:
npm run setup:android
npx cap sync
```

### Abrir Proyectos

```bash
# Abrir Android Studio
npx cap open android

# Abrir Xcode (macOS)
npx cap open ios
```

## Comandos de Debugging

### Ver Logs de Android

```bash
# Ver todos los logs de Capacitor
adb logcat | findstr /i capacitor

# Ver logs de la app
adb logcat | findstr /i impos2

# Ver errores
adb logcat | findstr /i error
```

### Verificar Conexión del Emulador

```bash
# Listar dispositivos conectados
adb devices

# Verificar conectividad del emulador
adb shell ping -c 4 impos2-web-1-2.vercel.app
```

## Comandos de Limpieza

### Limpiar y Reconstruir

```bash
# Limpiar node_modules
rmdir /s /q node_modules
npm install

# Limpiar plataformas (cuidado: perderás configuraciones manuales)
rmdir /s /q android
rmdir /s /q ios

# Reagregar plataformas
npx cap add android
npm run setup:android
npx cap sync
```

### Limpiar Cache

```bash
# Limpiar cache de npm
npm cache clean --force

# Limpiar cache de Capacitor
rmdir /s /q .capacitor
npx cap sync
```

## Comandos de Build (Producción)

### Android APK

```bash
# 1. Abrir en Android Studio
npx cap open android

# 2. En Android Studio:
#    - Build > Generate Signed Bundle / APK
#    - Seleccionar APK
#    - Siguiente
#    - Crear o seleccionar keystore
#    - Siguiente
#    - Seleccionar release
#    - Finish
```

### Android AAB (para Play Store)

```bash
# 1. Abrir en Android Studio
npx cap open android

# 2. En Android Studio:
#    - Build > Generate Signed Bundle / APK
#    - Seleccionar Android App Bundle
#    - Siguiente
#    - Crear o seleccionar keystore
#    - Siguiente
#    - Seleccionar release
#    - Finish
```

### iOS (solo en macOS)

```bash
# 1. Abrir en Xcode
npx cap open ios

# 2. En Xcode:
#    - Seleccionar esquema "App"
#    - Product > Archive
#    - Distribuir App
#    - Seguir el asistente
```

## Resumen de Scripts npm

| Script | Comando | Descripción |
|--------|---------|-------------|
| `setup:dist` | `npm run setup:dist` | Prepara directorio dist/ |
| `setup:android` | `npm run setup:android` | Configura Android para HTTPS |
| `cap:add:android` | `npm run cap:add:android` | Agrega plataforma Android |
| `cap:add:ios` | `npm run cap:add:ios` | Agrega plataforma iOS |
| `cap:sync` | `npm run cap:sync` | Sincroniza cambios |
| `cap:open:android` | `npm run cap:open:android` | Abre Android Studio |
| `cap:open:ios` | `npm run cap:open:ios` | Abre Xcode |
| `cap:run:android` | `npm run cap:run:android` | Ejecuta en Android |
| `cap:run:ios` | `npm run cap:run:ios` | Ejecuta en iOS |

## Checklist de Setup

- [ ] Node.js v20.x o superior instalado
- [ ] npm instalado y funcionando
- [ ] `npm install` ejecutado exitosamente
- [ ] Directorio `dist/` existe con `index.html`
- [ ] `npx cap add android` ejecutado
- [ ] `npm run setup:android` ejecutado
- [ ] `network_security_config.xml` existe
- [ ] `AndroidManifest.xml` tiene `usesCleartextTraffic="false"`
- [ ] `npx cap sync` ejecutado
- [ ] Android Studio instalado
- [ ] Emulador/dispositivo configurado
- [ ] App ejecuta correctamente

## Notas

- Todos los comandos asumen que estás en la carpeta `impos2-mobile`
- Los comandos de PowerShell pueden usar `Get-ChildItem` en lugar de `dir`
- Los comandos de limpieza eliminan datos, úsalos con cuidado
- La primera vez que abres Android Studio puede tardar varios minutos
- iOS solo se puede compilar en macOS con Xcode instalado






