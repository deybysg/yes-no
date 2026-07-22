# 💕 Preguntas para Mi Novia - Panel Secreto con Firebase

## 📋 Instrucciones de Configuración

### Paso 1: Crear proyecto en Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Haz clic en "Agregar proyecto"
3. Nombre: `yes-no-app` (o el que quieras)
4. Desactiva Google Analytics (opcional)
5. Haz clic en "Crear proyecto"

### Paso 2: Habilitar Firestore

1. En el panel izquierdo, haz clic en "Firestore Database"
2. Haz clic en "Crear base de datos"
3. Selecciona "En modo de prueba" (para empezar rápido)
4. Selecciona la ubicación más cercana
5. Haz clic en "Activar"

### Paso 3: Obtener configuración

1. Ve a "Configuración del proyecto" (⚙️)
2. En "General", baja hasta "Tus apps"
3. Haz clic en el ícono de web (</>)
4. Nombre la app: `yes-no-web`
5. Haz clic en "Registrar app"
6. Copia la configuración que aparece

### Paso 4: Actualizar firebase.js

Abre `src/utils/firebase.js` y reemplaza los valores:

```javascript
const firebaseConfig = {
  apiKey: "TU_API_KEY",           // Copiar de Firebase
  authDomain: "TU_PROYECTO.firebaseapp.com",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_PROYECTO.appspot.com",
  messagingSenderId: "TU_SENDER_ID",
  appId: "TU_APP_ID"
};
```

### Paso 5: Configurar reglas de Firestore

En Firestore Database → Reglas, pega:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /responses/{response} {
      allow read, write: if true;
    }
  }
}
```

**⚠️ Nota:** Esto es para pruebas. En producción, deberías agregar seguridad.

### Paso 6: Ejecutar la app

```bash
cd yes-no-app
npm run dev
```

## 📱 Cómo Usar

### Para ella (responder):
- Abre: `http://localhost:5173/preguntas`
- Responde las 20 preguntas
- Las respuestas se guardan automáticamente

### Para ti (ver respuestas):
- Abre: `http://localhost:5173/panel`
- Contraseña: `novia2024`
- Ve todas las respuestas y estadísticas

## 🚀 Subir a Vercel

1. Sube el código a GitHub
2. Ve a [Vercel](https://vercel.com/)
3. Importa el repositorio
4. Vercel detectará automáticamente la configuración
5. Despliega

## 🔗 Links después de desplegar

- **Ella responde:** `https://tu-app.vercel.app/preguntas`
- **Tú ves respuestas:** `https://tu-app.vercel.app/panel`

## 📊 Funcionalidades

- ✅ 20 preguntas en 4 categorías
- ✅ Guardado en Firestore (nube)
- ✅ Panel secreto con estadísticas
- ✅ Tiempo real (actualización automática)
- ✅ Diseño responsive
- ✅ Contraseña protegida

## 🔧 Solución de problemas

**Si no carga la app:**
- Verifica que Firebase esté configurado correctamente
- Revisa la consola del navegador (F12)
- Asegúrate de que Firestore esté activado

**Si no guarda respuestas:**
- Verifica la conexión a internet
- Revisa las reglas de Firestore
- Mira los errores en la consola