# Configuración Android - Archivos a Modificar

Después de ejecutar `npx cap add android`, modifica estos archivos:

## 1. android/app/src/main/AndroidManifest.xml

Asegúrate de que tenga esta configuración (especialmente la parte de `usesCleartextTraffic`):

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
    <application
        android:label="@string/app_name"
        android:icon="@mipmap/ic_launcher"
        android:usesCleartextTraffic="false"
        android:networkSecurityConfig="@xml/network_security_config"
        ...>
        ...
    </application>
</manifest>
```

## 2. android/app/src/main/res/xml/network_security_config.xml

Crea este archivo si no existe:

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

## 3. android/app/build.gradle

Verifica que tenga estas configuraciones mínimas:

```gradle
android {
    compileSdkVersion 34
    
    defaultConfig {
        applicationId "com.impos2.app"
        minSdkVersion 23
        targetSdkVersion 34
        versionCode 1
        versionName "1.0.0"
    }
    
    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
}
```







