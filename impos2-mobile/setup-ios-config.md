# Configuración iOS - Archivos a Modificar

Después de ejecutar `npx cap add ios`, verifica estos archivos:

## 1. ios/App/App/Info.plist

Asegúrate de que tenga esta configuración para WKWebView:

```xml
<key>UIViewControllerBasedStatusBarAppearance</key>
<true/>
<key>UIStatusBarStyle</key>
<string>UIStatusBarStyleDefault</string>
<key>UIRequiresFullScreen</key>
<false/>
```

## 2. Verificar uso de WKWebView

En `ios/App/App/AppDelegate.swift` o `AppDelegate.m`, Capacitor ya usa WKWebView por defecto, pero verifica que no haya referencias a UIWebView (deprecated).

## 3. Configuración de Capabilities

En Xcode:
1. Selecciona el proyecto "App"
2. Ve a "Signing & Capabilities"
3. Verifica que el Bundle Identifier sea: `com.impos2.app`
4. Configura tu equipo de desarrollo para firmar







