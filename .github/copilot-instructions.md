<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Generador de Paleta de Colores - React Native App

## Contexto del Proyecto

Esta es una aplicación React Native que permite a los usuarios generar paletas de colores a partir de imágenes usando:

- **Frontend**: React Native con Expo
- **Autenticación**: Firebase Authentication
- **Base de datos**: Firestore (Firebase)
- **API de colores**: Imagga API para extracción de paletas

## Estructura del Proyecto

```
src/
├── screens/           # Pantallas principales
├── components/        # Componentes reutilizables
├── services/          # Servicios (Firebase, APIs)
└── styles/           # Estilos globales y tema
```

## Estilo y Tema

- **Paleta de colores**: Tonos cremas y relacionados (beige, tan, sandy brown)
- **Colores principales**:
  - Primary: #F5F5DC (Beige)
  - Primary Dark: #DEB887 (Burlywood)
  - Secondary: #D2B48C (Tan)
  - Accent: #F4A460 (Sandy Brown)
- **Diseño**: Minimalista, enfocado en mostrar paletas de colores

## Convenciones de Código

- Usar componentes funcionales con hooks
- Manejar estados de carga y errores apropiadamente
- Seguir patrones de React Native y Expo
- Usar async/await para operaciones asíncronas
- Implementar validaciones de formularios

## APIs y Servicios

- Firebase configurado en `src/services/firebase.js`
- Imagga API configurada en `src/services/imaggaApi.js`
- Usar permisos apropiados para cámara y galería

## Funcionalidades Principales

1. **Autenticación**: Login y registro con Firebase
2. **Captura de imágenes**: Cámara y galería
3. **Extracción de colores**: Usando Imagga API
4. **Visualización de paletas**: Cards con códigos de color
5. **Guardado de paletas**: En Firestore (por implementar)
