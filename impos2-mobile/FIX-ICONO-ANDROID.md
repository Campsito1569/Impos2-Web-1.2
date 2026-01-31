# Solución: Icono Adaptativo Android

## Problema Resuelto

El icono adaptativo de Android estaba mostrando el icono genérico (androide blanco con fondo azul) porque los archivos XML del icono adaptativo no estaban correctamente configurados.

## Cambios Realizados

### 1. ✅ Archivos XML del Icono Adaptativo Corregidos

**Archivo**: `android/app/src/main/res/mipmap-anydpi-v26/ic_launcher.xml`
```xml
<?xml version="1.0" encoding="utf-8"?>
<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">
    <background android:drawable="@color/ic_launcher_background"/>
    <foreground android:drawable="@mipmap/ic_launcher_foreground"/>
</adaptive-icon>
```

**Archivo**: `android/app/src/main/res/mipmap-anydpi-v26/ic_launcher_round.xml`
```xml
<?xml version="1.0" encoding="utf-8"?>
<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">
    <background android:drawable="@color/ic_launcher_background"/>
    <foreground android:drawable="@mipmap/ic_launcher_foreground"/>
</adaptive-icon>
```

### 2. ✅ Archivo de Color de Fondo Verificado

**Archivo**: `android/app/src/main/res/values/ic_launcher_background.xml`
```xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <color name="ic_launcher_background">#FFFFFF</color>
</resources>
```

**Nota**: El color actual es blanco (`#FFFFFF`). Si quieres cambiarlo, edita este archivo.

### 3. ✅ Recursos de Foreground Verificados

Se verificó que existen los archivos `ic_launcher_foreground.png` en todas las carpetas mipmap:
- ✅ `mipmap-mdpi/ic_launcher_foreground.png`
- ✅ `mipmap-hdpi/ic_launcher_foreground.png`
- ✅ `mipmap-xhdpi/ic_launcher_foreground.png`
- ✅ `mipmap-xxhdpi/ic_launcher_foreground.png`
- ✅ `mipmap-xxxhdpi/ic_launcher_foreground.png`

### 4. ✅ AndroidManifest.xml Verificado

El AndroidManifest.xml está correctamente configurado:
- `android:icon="@mipmap/ic_launcher"` ✅
- `android:roundIcon="@mipmap/ic_launcher_round"` ✅

## Estructura Correcta de Recursos

```
android/app/src/main/res/
├── mipmap-anydpi-v26/
│   ├── ic_launcher.xml          ✅ Corregido
│   └── ic_launcher_round.xml    ✅ Corregido
├── mipmap-mdpi/
│   ├── ic_launcher.png
│   ├── ic_launcher_foreground.png  ✅ Existe
│   └── ic_launcher_round.png
├── mipmap-hdpi/
│   ├── ic_launcher.png
│   ├── ic_launcher_foreground.png  ✅ Existe
│   └── ic_launcher_round.png
├── mipmap-xhdpi/
│   ├── ic_launcher.png
│   ├── ic_launcher_foreground.png  ✅ Existe
│   └── ic_launcher_round.png
├── mipmap-xxhdpi/
│   ├── ic_launcher.png
│   ├── ic_launcher_foreground.png  ✅ Existe
│   └── ic_launcher_round.png
├── mipmap-xxxhdpi/
│   ├── ic_launcher.png
│   ├── ic_launcher_foreground.png  ✅ Existe
│   └── ic_launcher_round.png
└── values/
    └── ic_launcher_background.xml  ✅ Existe y configurado
```

## Próximos Pasos

### 1. Limpiar y Reconstruir

```bash
# Limpiar build de Android
cd android
gradlew clean

# O desde la raíz del proyecto
cd impos2-mobile
npx cap sync android
```

### 2. Reconstruir en Android Studio

1. Abre Android Studio
2. Build > Clean Project
3. Build > Rebuild Project
4. Ejecuta la app en un dispositivo/emulador Android 12+

### 3. Verificar el Icono

- Desinstala la app anterior del dispositivo/emulador
- Instala la nueva versión
- Verifica que el icono se muestre correctamente en:
  - La pantalla de inicio
  - El cajón de aplicaciones
  - El selector de aplicaciones recientes

## Cambiar el Color de Fondo del Icono

Si quieres cambiar el color de fondo del icono adaptativo:

1. Edita `android/app/src/main/res/values/ic_launcher_background.xml`
2. Cambia el valor del color, por ejemplo:
   ```xml
   <color name="ic_launcher_background">#000000</color>  <!-- Negro -->
   <color name="ic_launcher_background">#3498db</color>  <!-- Azul -->
   <color name="ic_launcher_background">#2ecc71</color>  <!-- Verde -->
   ```
3. Reconstruye el proyecto

## Solución de Problemas

### El icono sigue mostrándose incorrecto

1. **Limpia el caché de Android Studio**:
   - File > Invalidate Caches / Restart
   - Invalidar y Reiniciar

2. **Limpia el build**:
   ```bash
   cd android
   gradlew clean
   ```

3. **Desinstala completamente la app**:
   - Configuración > Aplicaciones > Impos2 > Desinstalar

4. **Reinstala la app**:
   - Ejecuta desde Android Studio

### El icono no aparece en Android 12+

- Verifica que los archivos XML en `mipmap-anydpi-v26/` estén correctos
- Verifica que `ic_launcher_foreground.png` exista en todas las carpetas mipmap
- Verifica que `ic_launcher_background.xml` exista en `values/`

### El foreground no se muestra correctamente

- Asegúrate de que las imágenes `ic_launcher_foreground.png` tengan:
  - Formato PNG con transparencia
  - Tamaño correcto para cada densidad (mdpi, hdpi, xhdpi, etc.)
  - Contenido centrado en un área segura (evitar bordes)

## Referencias

- [Android Adaptive Icons](https://developer.android.com/guide/practices/ui_guidelines/icon_design_adaptive)
- [Capacitor Icons](https://capacitorjs.com/docs/guides/splash-screens-and-icons)




