#!/usr/bin/env node

/**
 * Script para configurar Android después de npx cap add android
 * Ejecutar: node scripts/setup-android.js
 */

const fs = require('fs');
const path = require('path');

const ANDROID_DIR = path.join(__dirname, '..', 'android');
const MANIFEST_PATH = path.join(ANDROID_DIR, 'app', 'src', 'main', 'AndroidManifest.xml');
const XML_DIR = path.join(ANDROID_DIR, 'app', 'src', 'main', 'res', 'xml');
const NETWORK_CONFIG_PATH = path.join(XML_DIR, 'network_security_config.xml');

console.log('🔧 Configurando Android para HTTPS...\n');

// Verificar que existe la carpeta android
if (!fs.existsSync(ANDROID_DIR)) {
  console.error('❌ Error: La carpeta android/ no existe.');
  console.error('   Ejecuta primero: npx cap add android');
  process.exit(1);
}

// 1. Crear network_security_config.xml
console.log('1. Creando network_security_config.xml...');

if (!fs.existsSync(XML_DIR)) {
  fs.mkdirSync(XML_DIR, { recursive: true });
  console.log('   ✓ Creada carpeta res/xml/');
}

const networkConfigContent = `<?xml version="1.0" encoding="utf-8"?>
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
</network-security-config>`;

fs.writeFileSync(NETWORK_CONFIG_PATH, networkConfigContent);
console.log('   ✓ Creado network_security_config.xml');

// 2. Modificar AndroidManifest.xml
console.log('\n2. Modificando AndroidManifest.xml...');

if (!fs.existsSync(MANIFEST_PATH)) {
  console.error('   ❌ Error: AndroidManifest.xml no encontrado');
  process.exit(1);
}

let manifestContent = fs.readFileSync(MANIFEST_PATH, 'utf8');

// Verificar si ya tiene las configuraciones
if (manifestContent.includes('usesCleartextTraffic="false"') && 
    manifestContent.includes('networkSecurityConfig="@xml/network_security_config"')) {
  console.log('   ✓ AndroidManifest.xml ya está configurado');
} else {
  // Buscar la etiqueta <application> y añadir los atributos
  if (manifestContent.includes('<application')) {
    // Añadir usesCleartextTraffic si no existe
    if (!manifestContent.includes('usesCleartextTraffic')) {
      manifestContent = manifestContent.replace(
        /(<application[^>]*)/,
        '$1\n        android:usesCleartextTraffic="false"'
      );
    }
    
    // Añadir networkSecurityConfig si no existe
    if (!manifestContent.includes('networkSecurityConfig')) {
      manifestContent = manifestContent.replace(
        /(<application[^>]*)/,
        '$1\n        android:networkSecurityConfig="@xml/network_security_config"'
      );
    }
    
    fs.writeFileSync(MANIFEST_PATH, manifestContent);
    console.log('   ✓ AndroidManifest.xml actualizado');
  } else {
    console.warn('   ⚠️  No se encontró la etiqueta <application> en AndroidManifest.xml');
    console.warn('   ⚠️  Por favor, añade manualmente:');
    console.warn('      android:usesCleartextTraffic="false"');
    console.warn('      android:networkSecurityConfig="@xml/network_security_config"');
  }
}

console.log('\n✅ Configuración de Android completada!');
console.log('\n📝 Próximos pasos:');
console.log('   1. Ejecuta: npx cap sync');
console.log('   2. Ejecuta: npx cap open android');
console.log('   3. En Android Studio, ejecuta la app en un emulador/dispositivo');







