# Configuración del Proyecto

## Firebase Configuration

Para configurar Firebase, necesitas:

1. Ir a [Firebase Console](https://console.firebase.google.com/)
2. Crear un nuevo proyecto o usar uno existente
3. Agregar una aplicación web al proyecto
4. Copiar la configuración y reemplazar en `src/services/firebase.js`:

```javascript
const firebaseConfig = {
  apiKey: 'tu-api-key',
  authDomain: 'tu-project-id.firebaseapp.com',
  projectId: 'tu-project-id',
  storageBucket: 'tu-project-id.appspot.com',
  messagingSenderId: 'tu-sender-id',
  appId: 'tu-app-id',
};
```

### Configurar Authentication

1. En Firebase Console, ve a Authentication
2. Habilita el método de "Email/Password"
3. Configura dominios autorizados si es necesario

### Configurar Firestore

1. En Firebase Console, ve a Firestore Database
2. Crea la base de datos en modo de prueba
3. Configura las reglas de seguridad según necesites

## Imagga API Configuration

Para configurar la API de Imagga:

1. Ir a [Imagga](https://imagga.com/)
2. Crear una cuenta y obtener las credenciales
3. Reemplazar en `src/services/imaggaApi.js`:

```javascript
const IMAGGA_API_KEY = 'tu-imagga-api-key';
const IMAGGA_API_SECRET = 'tu-imagga-api-secret';
```

## Ejecutar el Proyecto

### Requisitos previos

- Node.js instalado
- Expo CLI instalado: `npm install -g @expo/cli`
- Dispositivo móvil con Expo Go app o emulador

### Comandos

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm start

# Ejecutar en Android
npm run android

# Ejecutar en iOS (solo en macOS)
npm run ios

# Ejecutar en web
npm run web
```

## Estado Actual

- ✅ Pantalla de Login con validaciones
- ✅ Pantalla de Registro con validaciones
- ✅ Pantalla principal con funcionalidad de cámara/galería
- ✅ Integración con Imagga API (configuración mock incluida)
- ✅ Componente para mostrar paletas de colores
- ✅ Tema de colores cremas consistente
- ✅ Navegación entre pantallas
- ⏳ Exploración de paletas públicas (por implementar)

## Próximos Pasos

1. Configurar credenciales reales de Firebase e Imagga
2. Implementar guardado de paletas en Firestore
3. Agregar pantalla de paletas guardadas
4. Implementar funcionalidad de compartir paletas
5. Agregar más opciones de customización
