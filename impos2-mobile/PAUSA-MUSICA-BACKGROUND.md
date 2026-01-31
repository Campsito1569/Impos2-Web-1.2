# Funcionalidad: Pausar Música en Segundo Plano

## Descripción

La aplicación ahora pausa automáticamente toda la música cuando pasa a segundo plano (cuando el usuario sale de la app o cambia a otra aplicación).

## Implementación

### Función `detenerMusica()`

Se implementó una función que:
1. Pausa todos los elementos `<audio>` en el documento principal
2. Intenta pausar audios dentro del iframe (puede fallar por políticas CORS)
3. Envía un mensaje `postMessage` al iframe para que pause su música (si la web lo soporta)

```javascript
function detenerMusica() {
  // Pausa audios en documento principal
  // Intenta pausar audios en iframe
  // Envía mensaje al iframe para pausar
}
```

### Listeners Implementados

#### 1. **Capacitor App State Change** (Nativo)
```javascript
App.addListener('appStateChange', ({ isActive }) => {
  if (!isActive) {
    detenerMusica(); // App pasó a segundo plano
  }
});
```

#### 2. **Document Visibility Change** (Web)
```javascript
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    detenerMusica(); // Página oculta
  }
});
```

#### 3. **Window Blur** (Web)
```javascript
window.addEventListener('blur', () => {
  detenerMusica(); // Ventana perdió foco
});
```

## Comportamiento

### Cuando la App Pasa a Segundo Plano

- ✅ Se pausan todos los elementos `<audio>` del documento principal
- ✅ Se intenta pausar audios dentro del iframe (si es posible acceder)
- ✅ Se envía mensaje al iframe para que pause su música
- ✅ La música **NO** se reanuda automáticamente al volver

### Limitaciones

1. **CORS en iframe**: Si la web cargada en el iframe está en un dominio diferente, puede que no se pueda acceder directamente a sus elementos `<audio>` por políticas de seguridad del navegador.

2. **Solución alternativa**: Se envía un mensaje `postMessage` al iframe. Para que funcione completamente, la web externa debería escuchar este mensaje:
   ```javascript
   window.addEventListener('message', (event) => {
     if (event.data.action === 'pauseAllAudio') {
       // Pausar todos los audios
       document.querySelectorAll('audio').forEach(a => a.pause());
     }
   });
   ```

## Archivos Modificados

- `impos2-mobile/index.html`: Añadida función `detenerMusica()` y listeners

## Pruebas

### Probar en Android/iOS

1. Ejecuta la app en un dispositivo/emulador
2. Reproduce música en la web
3. Presiona el botón Home para llevar la app a segundo plano
4. Verifica que la música se detiene
5. Vuelve a la app
6. Verifica que la música NO se reanuda automáticamente

### Probar en Navegador

1. Abre la app en un navegador
2. Reproduce música
3. Cambia a otra pestaña o minimiza la ventana
4. Verifica que la música se detiene
5. Vuelve a la pestaña/ventana
6. Verifica que la música NO se reanuda automáticamente

## Logs de Consola

La función genera logs útiles para debugging:

- `⏸️ Audio pausado en documento principal`
- `⏸️ Audio pausado en iframe`
- `📨 Mensaje enviado al iframe para pausar audio`
- `⚠️ No se puede acceder al contenido del iframe (CORS)`
- `📱 App pasó a segundo plano - pausando música`
- `👁️ Página oculta - pausando música`
- `🔍 Ventana perdió foco - pausando música`

## Mejoras Futuras (Opcional)

Si quieres que la web externa también responda al mensaje `postMessage`, puedes añadir este código en la web:

```javascript
// En la web externa (impos2-web-1-2.vercel.app)
window.addEventListener('message', (event) => {
  if (event.data && event.data.action === 'pauseAllAudio') {
    // Pausar todos los elementos audio
    document.querySelectorAll('audio').forEach(a => {
      if (!a.paused) {
        a.pause();
      }
    });
    
    // Si usas el módulo de audio de la app
    if (typeof stopBackgroundMusic === 'function') {
      stopBackgroundMusic();
    }
  }
});
```

## Notas

- La música se pausa pero **NO** se reanuda automáticamente al volver a la app
- Si necesitas reanudar la música automáticamente, puedes modificar los listeners para detectar cuando la app vuelve al foreground y reanudar
- Los logs ayudan a identificar si hay problemas con CORS o acceso al iframe




