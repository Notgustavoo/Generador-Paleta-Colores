import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import { Alert, Platform } from 'react-native';

// Función para compartir paleta como texto
export const sharePaletteAsText = async (
  palette,
  paletteName = 'Mi Paleta'
) => {
  try {
    // Asegurar que tenemos un array de colores
    const colors = Array.isArray(palette) ? palette : palette.colors || [];

    if (colors.length === 0) {
      Alert.alert('Error', 'No hay colores para compartir');
      return;
    }

    // Crear el texto de la paleta
    const paletteText =
      `🎨 ${paletteName}\n\n` +
      colors
        .map(
          (color, index) =>
            `${index + 1}. ${color.hex ? color.hex.toUpperCase() : 'N/A'} - ${
              color.name || 'Sin nombre'
            } (${color.percentage ? color.percentage.toFixed(1) : '0'}%)`
        )
        .join('\n') +
      '\n\n📱 Generado con Generador de Paletas';

    // Verificar si el dispositivo puede compartir
    if (await Sharing.isAvailableAsync()) {
      // Crear archivo temporal
      const fileName = `${paletteName.replace(
        /[^a-zA-Z0-9]/g,
        '_'
      )}_palette.txt`;
      const fileUri = FileSystem.documentDirectory + fileName;

      await FileSystem.writeAsStringAsync(fileUri, paletteText);

      await Sharing.shareAsync(fileUri, {
        mimeType: 'text/plain',
        dialogTitle: `Compartir ${paletteName}`,
      });

      // Limpiar archivo temporal después de compartir
      setTimeout(async () => {
        try {
          await FileSystem.deleteAsync(fileUri);
        } catch (error) {
          console.log('No se pudo eliminar archivo temporal:', error);
        }
      }, 5000);
    } else {
      Alert.alert('Error', 'Tu dispositivo no soporta la función de compartir');
    }
  } catch (error) {
    console.error('Error al compartir paleta:', error);
    Alert.alert('Error', 'No se pudo compartir la paleta');
  }
};

// Función para compartir solo los códigos hexadecimales
export const sharePaletteColors = async (
  palette,
  paletteName = 'Mi Paleta'
) => {
  try {
    // Asegurar que tenemos un array de colores
    const colors = Array.isArray(palette) ? palette : palette.colors || [];

    if (colors.length === 0) {
      Alert.alert('Error', 'No hay colores para compartir');
      return;
    }

    const colorsText =
      `🎨 ${paletteName}\n\n` +
      colors
        .map((color) => (color.hex ? color.hex.toUpperCase() : 'N/A'))
        .join(' • ') +
      '\n\n📱 Generado con Generador de Paletas';

    if (await Sharing.isAvailableAsync()) {
      const fileName = `${paletteName.replace(
        /[^a-zA-Z0-9]/g,
        '_'
      )}_colors.txt`;
      const fileUri = FileSystem.documentDirectory + fileName;

      await FileSystem.writeAsStringAsync(fileUri, colorsText);

      await Sharing.shareAsync(fileUri, {
        mimeType: 'text/plain',
        dialogTitle: `Compartir colores de ${paletteName}`,
      });

      // Limpiar archivo temporal
      setTimeout(async () => {
        try {
          await FileSystem.deleteAsync(fileUri);
        } catch (error) {
          console.log('No se pudo eliminar archivo temporal:', error);
        }
      }, 5000);
    } else {
      Alert.alert('Error', 'Tu dispositivo no soporta la función de compartir');
    }
  } catch (error) {
    console.error('Error al compartir colores:', error);
    Alert.alert('Error', 'No se pudieron compartir los colores');
  }
};

// Función para generar una imagen simple de la paleta y compartirla
export const sharePaletteAsImage = async (
  palette,
  paletteName = 'Mi Paleta'
) => {
  try {
    // Asegurar que tenemos un array de colores
    const colors = Array.isArray(palette) ? palette : palette.colors || [];

    if (colors.length === 0) {
      Alert.alert('Error', 'No hay colores para compartir');
      return;
    }

    // Esta función generaría una imagen SVG simple de la paleta
    const svgContent = `
      <svg width="400" height="200" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="200" fill="#f5f5f5"/>
        <text x="200" y="30" text-anchor="middle" font-family="Arial" font-size="16" font-weight="bold" fill="#333">${paletteName}</text>
        ${colors
          .map(
            (color, index) => `
          <rect x="${index * 80}" y="50" width="80" height="80" fill="${
              color.hex || '#000000'
            }"/>
          <text x="${
            index * 80 + 40
          }" y="145" text-anchor="middle" font-family="Arial" font-size="10" fill="#333">${
              color.hex || 'N/A'
            }</text>
          <text x="${
            index * 80 + 40
          }" y="160" text-anchor="middle" font-family="Arial" font-size="8" fill="#666">${
              color.name || 'Sin nombre'
            }</text>
          <text x="${
            index * 80 + 40
          }" y="175" text-anchor="middle" font-family="Arial" font-size="8" fill="#666">${
              color.percentage ? color.percentage.toFixed(1) : '0'
            }%</text>
        `
          )
          .join('')}
        <text x="200" y="195" text-anchor="middle" font-family="Arial" font-size="10" fill="#999">Generado con Generador de Paletas</text>
      </svg>
    `;

    const fileName = `${paletteName.replace(/[^a-zA-Z0-9]/g, '_')}_palette.svg`;
    const fileUri = FileSystem.documentDirectory + fileName;

    await FileSystem.writeAsStringAsync(fileUri, svgContent);

    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(fileUri, {
        mimeType: 'image/svg+xml',
        dialogTitle: `Compartir imagen de ${paletteName}`,
      });

      // Limpiar archivo temporal
      setTimeout(async () => {
        try {
          await FileSystem.deleteAsync(fileUri);
        } catch (error) {
          console.log('No se pudo eliminar archivo temporal:', error);
        }
      }, 5000);
    } else {
      Alert.alert('Error', 'Tu dispositivo no soporta la función de compartir');
    }
  } catch (error) {
    console.error('Error al compartir imagen:', error);
    Alert.alert('Error', 'No se pudo compartir la imagen de la paleta');
  }
};
