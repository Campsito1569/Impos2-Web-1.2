# Guía Completa de Setup - Impos2 Mobile

## Lista de Comandos Exactos (Windows)

### Paso 1: Verificar Node.js

```bash
node --version
```

Debe mostrar v20.x o superior. Si no, descarga Node.js LTS desde https://nodejs.org/

### Paso 2: Navegar a la carpeta del proyecto

```bash
cd impos2-mobile
```

### Paso 3: Instalar dependencias

```bash
npm install
```

### Paso 4: Crear directorio dist y copiar index.html

```bash
mkdir dist
copy index.html dist\index.html
```

O en PowerShell:
```powershell
New-Item -ItemType Directory -Force -Path dist
Copy-Item index.html dist\index.html
```

### Paso 5: Generar iconos y splash screen

```bash
npx @capacitor/assets generate --iconBackgroundColor '#ffffff' --iconBackgroundColorDark '#000000' --splashBackgroundColor '#ffffff' --splashBackgroundColorDark '#000000'
```

**Nota**: Este comando requiere que existan las carpetas `android/` e `ios/`, así que primero ejecuta los pasos 6 y 7, luego vuelve a este paso.

### Paso 6: Agregar plataforma Android

```bash
npx cap add android
```

### Paso 7: Agregar plataforma iOS (opcional, solo preparación)

```bash
npx cap add ios
```

**Nota**: En Windows, este comando puede fallar o generar errores porque requiere herramientas de macOS. Esto es normal. El proyecto iOS se puede generar después en macOS.

### Paso 8: Configurar Android para HTTPS

Después de `npx cap add android`, modifica estos archivos:

#### android/app/src/main/AndroidManifest.xml

Busca la etiqueta `<application>` y asegúrate de que tenga:

```xml
android:usesCleartextTraffic="false"
android:networkSecurityConfig="@xml/network_security_config"
```

#### Crear android/app/src/main/res/xml/network_security_config.xml

Crea el archivo con este contenido:

```xml
<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
    <base-config cleartextTrafficPermitted="false">
        <trust-anchors>
            <certificates src="system" />
            <certificates src="user" />
        </trust-anchors>
    </base-config>
    <domain-config cleartextTrafficPermitted="false">
        <domain includeSubdomains="true">impos2-web-1-2.vercel.app</domain>
        <domain includeSubdomains="true">vercel.app</domain>
    </domain-config>
</network-security-config>
```

### Paso 9: Sincronizar con Capacitor

```bash
npx cap sync
```

### Paso 10: Abrir en Android Studio

```bash
npx cap open android
```

### Paso 11: Ejecutar en Android Studio

1. En Android Studio, espera a que termine de indexar
2. Selecciona un dispositivo/emulador desde el dropdown superior
3. Si no hay emulador, ve a Tools > Device Manager > Create Device
4. Click en el botón "Run" (▶️) o presiona Shift+F10

## Estructura de Archivos Creada

```
impos2-mobile/
├── android/                          # Generado por `npx cap add android`
│   ├── app/
│   │   ├── build.gradle
│   │   └── src/
│   │       └── main/
│   │           ├── AndroidManifest.xml
│   │           ├── java/
│   │           └── res/
│   │               └── xml/
│   │                   └── network_security_config.xml  # Crear manualmente
│   ├── build.gradle
│   └── settings.gradle
├── ios/                              # Generado por `npx cap add ios` (en macOS)
│   └── App/
│       └── App/
│           ├── Info.plist
│           └── AppDelegate.swift
├── dist/                             # Creado manualmente
│   └── index.html
├── node_modules/                     # Generado por `npm install`
├── .capacitor/                       # Generado por Capacitor
├── .gitignore
├── capacitor.config.ts
├── index.html
├── package.json
├── package-lock.json
├── README.md
├── SETUP.md                          # Este archivo
├── setup-android-config.md
├── setup-ios-config.md
└── tsconfig.json
```

## Contenido Completo de Archivos Clave

### capacitor.config.ts

Ya creado en la raíz del proyecto. Contiene:
- appId: `com.impos2.app`
- appName: `Impos2`
- server.url: `https://impos2-web-1-2.vercel.app/`
- server.cleartext: `false`
- Configuración de SplashScreen y StatusBar

### index.html

Ya creado en la raíz. Contiene:
- Loading spinner mientras carga
- Manejo de errores con mensaje y botón "Reintentar"
- iframe que carga la URL de la web
- Integración con plugins de Capacitor (App, SplashScreen, StatusBar)
- Manejo del botón "atrás" en Android

### android/app/src/main/res/xml/network_security_config.xml

**Crear manualmente después de `npx cap add android`:**

```xml
<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
    <base-config cleartextTrafficPermitted="false">
        <trust-anchors>
            <certificates src="system" />
            <certificates src="user" />
        </trust-anchors>
    </base-config>
    <domain-config cleartextTrafficPermitted="false">
        <domain includeSubdomains="true">impos2-web-1-2.vercel.app</domain>
        <domain includeSubdomains="true">vercel.app</domain>
    </domain-config>
</network-security-config>
```

## Instrucciones Detalladas

### Para Android

#### 1. Agregar plataforma
```bash
npx cap add android
```

#### 2. Abrir en Android Studio
```bash
npx cap open android
```

#### 3. Configurar AndroidManifest.xml
- Abre `android/app/src/main/AndroidManifest.xml`
- Busca `<application android:label=...`
- Añade: `android:usesCleartextTraffic="false"`
- Añade: `android:networkSecurityConfig="@xml/network_security_config"`

#### 4. Crear network_security_config.xml
- Crea la carpeta `android/app/src/main/res/xml/` si no existe
- Crea el archivo `network_security_config.xml` con el contenido indicado arriba

#### 5. Sincronizar
```bash
npx cap sync
```

#### 6. Ejecutar
- En Android Studio: Click en Run (▶️)
- O desde terminal: `npx cap run android`

### Para iOS

#### 1. Agregar plataforma (solo en macOS)
```bash
npx cap add ios
```

#### 2. Abrir en Xcode
```bash
npx cap open ios
```

#### 3. Verificar configuración
- Capacitor ya usa WKWebView por defecto
- Verifica `Info.plist` que tenga las configuraciones básicas
- Configura el Bundle Identifier: `com.impos2.app`

#### 4. Sincronizar
```bash
npx cap sync
```

## Solución de Problemas Comunes

### Problema: Emulador no aparece en Android Studio

**Solución:**
1. Abre Android Studio
2. Ve a Tools > Device Manager
3. Click en "Create Device"
4. Selecciona un dispositivo (ej: Pixel 5)
5. Selecciona una imagen del sistema (API 33 o superior)
6. Finish

### Problema: Error "Cannot find module '@capacitor/core'"

**Solución:**
```bash
npm install
npx cap sync
```

### Problema: CORS o errores de red en Android

**Solución:**
1. Verifica `capacitor.config.ts` que tenga `cleartext: false`
2. Verifica `AndroidManifest.xml` que tenga `usesCleartextTraffic="false"`
3. Verifica que existe `network_security_config.xml`
4. Ejecuta `npx cap sync`

### Problema: La web no carga (timeout)

**Solución:**
1. Verifica conexión a internet del emulador/dispositivo
2. Abre Chrome en el dispositivo y prueba la URL directamente
3. Verifica que la URL en `capacitor.config.ts` sea correcta
4. Revisa logs: `adb logcat | grep -i capacitor`

### Problema: Error al ejecutar `npx cap add android`

**Solución:**
1. Verifica que Node.js esté instalado: `node --version`
2. Verifica que npm funcione: `npm --version`
3. Limpia cache: `npm cache clean --force`
4. Reinstala: `rm -rf node_modules && npm install`

### Problema: Android Studio no encuentra el proyecto

**Solución:**
1. Asegúrate de estar en la carpeta `impos2-mobile`
2. Ejecuta `npx cap sync` primero
3. Luego `npx cap open android`

### Problema: Navegación externa no funciona

**Solución:**
- La app está configurada como wrapper, solo carga la URL especificada
- Si necesitas permitir navegación externa, modifica el CSP en `index.html`

### Problema: Splash screen no se oculta

**Solución:**
1. Verifica que `SplashScreen.hide()` se llame en `index.html`
2. Verifica la configuración en `capacitor.config.ts`
3. Ejecuta `npx cap sync`

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

## Comandos de Verificación

```bash
# Verificar que dist existe
dir dist

# Verificar estructura de android
dir android\app\src\main

# Verificar que network_security_config.xml existe
type android\app\src\main\res\xml\network_security_config.xml

# Ver logs de Android
adb logcat | findstr /i capacitor
```

## Notas Importantes

1. **Primera vez**: Después de `npx cap add android`, Android Studio puede tardar varios minutos en indexar y descargar dependencias.

2. **Emulador lento**: Si el emulador es lento, considera usar un dispositivo físico conectado por USB con depuración USB habilitada.

3. **Sincronización**: Cada vez que modifiques `capacitor.config.ts` o archivos en `dist/`, ejecuta `npx cap sync`.

4. **iOS en Windows**: No puedes compilar iOS en Windows. Solo puedes preparar el proyecto. Para compilar necesitas macOS con Xcode.

5. **Assets**: Los iconos y splash se generan con `@capacitor/assets`, pero necesitas las plataformas creadas primero.






