# Índice de Documentación - Impos2 Mobile

Bienvenido al proyecto Impos2 Mobile. Esta es una aplicación wrapper creada con Capacitor que carga la aplicación web desde `https://impos2-web-1-2.vercel.app/`.

## 🚀 Inicio Rápido

**¿Solo quieres empezar rápido?** → [QUICKSTART.md](QUICKSTART.md)

## 📚 Documentación Completa

### Para Setup Inicial
- **[SETUP.md](SETUP.md)**: Guía completa paso a paso con solución de problemas
- **[COMANDOS-COMPLETOS.md](COMANDOS-COMPLETOS.md)**: Lista completa de todos los comandos

### Para Configuración Específica
- **[setup-android-config.md](setup-android-config.md)**: Detalles de configuración Android
- **[setup-ios-config.md](setup-ios-config.md)**: Detalles de configuración iOS

### Referencia
- **[README.md](README.md)**: Documentación general del proyecto
- **[ARCHIVOS-CREADOS.md](ARCHIVOS-CREADOS.md)**: Resumen de todos los archivos creados

## 🎯 Guías por Objetivo

### Quiero empezar desde cero
1. Lee [QUICKSTART.md](QUICKSTART.md)
2. Sigue los comandos en [SETUP.md](SETUP.md)
3. Consulta [COMANDOS-COMPLETOS.md](COMANDOS-COMPLETOS.md) si necesitas ayuda

### Tengo un problema específico
1. Revisa la sección "Solución de Problemas" en [SETUP.md](SETUP.md)
2. Consulta los logs con los comandos en [COMANDOS-COMPLETOS.md](COMANDOS-COMPLETOS.md)

### Quiero entender la estructura
1. Lee [ARCHIVOS-CREADOS.md](ARCHIVOS-CREADOS.md)
2. Revisa [README.md](README.md) para la arquitectura general

### Quiero configurar Android/iOS manualmente
1. Lee [setup-android-config.md](setup-android-config.md) para Android
2. Lee [setup-ios-config.md](setup-ios-config.md) para iOS

## 📋 Checklist Rápido

- [ ] Node.js v20.x instalado
- [ ] `npm install` ejecutado
- [ ] `npx cap add android` ejecutado
- [ ] `npm run setup:android` ejecutado
- [ ] `npx cap sync` ejecutado
- [ ] Android Studio instalado
- [ ] App ejecutando en emulador/dispositivo

## 🔗 Enlaces Útiles

- [Documentación oficial de Capacitor](https://capacitorjs.com/docs)
- [Guía de Android Studio](https://developer.android.com/studio)
- [Guía de Xcode](https://developer.apple.com/xcode/)

## 📞 Soporte

Si encuentras problemas:
1. Revisa [SETUP.md](SETUP.md) sección "Solución de Problemas"
2. Verifica las versiones con los comandos en [COMANDOS-COMPLETOS.md](COMANDOS-COMPLETOS.md)
3. Revisa los logs de Android/iOS

## 🎓 Conceptos Clave

- **Capacitor**: Framework para crear apps móviles nativas desde web
- **Wrapper**: La app carga la URL web en un WebView, no necesita el código fuente
- **HTTPS Only**: La app está configurada para usar solo HTTPS (sin HTTP cleartext)
- **WKWebView**: El motor web usado en iOS (más moderno que UIWebView)

---

**¿No estás seguro por dónde empezar?** → Empieza con [QUICKSTART.md](QUICKSTART.md)







