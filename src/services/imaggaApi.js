// Servicio para la API de Imagga

const IMAGGA_API_KEY = 'acc_af077bb09cd02a4';
const IMAGGA_API_SECRET = '23e2c289c38ab81de89d5e2fe24b2f9d';
const IMAGGA_BASE_URL = 'https://api.imagga.com/v2';

// Función helper para convertir a base64 (compatible con React Native)
const base64Encode = (str) => {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  let result = '';
  let i = 0;

  while (i < str.length) {
    const a = str.charCodeAt(i++);
    const b = i < str.length ? str.charCodeAt(i++) : 0;
    const c = i < str.length ? str.charCodeAt(i++) : 0;

    const bitmap = (a << 16) | (b << 8) | c;

    result += chars.charAt((bitmap >> 18) & 63);
    result += chars.charAt((bitmap >> 12) & 63);
    result += i - 2 < str.length ? chars.charAt((bitmap >> 6) & 63) : '=';
    result += i - 1 < str.length ? chars.charAt(bitmap & 63) : '=';
  }

  return result;
};

// Función para obtener la paleta de colores de una imagen
export const getColorPalette = async (imageUri) => {
  try {
    // Crear FormData para enviar la imagen
    const formData = new FormData();
    formData.append('image', {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'image.jpg',
    });

    // Crear headers de autorización usando base64
    const auth = base64Encode(`${IMAGGA_API_KEY}:${IMAGGA_API_SECRET}`);

    const response = await fetch(`${IMAGGA_BASE_URL}/colors`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${auth}`,
        // No incluir Content-Type para FormData, el navegador lo configura automáticamente
      },
      body: formData,
    });
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const data = await response.json();

    // Debug: ver qué datos devuelve la API
    console.log('Respuesta de Imagga:', JSON.stringify(data, null, 2));

    // Procesar la respuesta para obtener los colores principales
    if (data.result && data.result.colors && data.result.colors.image_colors) {
      const colors = data.result.colors.image_colors
        .slice(0, 5)
        .map((color) => {
          console.log('Color individual:', color);
          return {
            hex: color.html_code,
            percentage: color.percent,
            name:
              color.closest_palette_color_parent ||
              color.closest_palette_color ||
              'Color',
          };
        });

      return {
        success: true,
        colors: colors,
      };
    } else {
      return {
        success: false,
        error: 'No se pudieron extraer colores de la imagen',
      };
    }
  } catch (error) {
    console.error('Error al obtener paleta de colores:', error);
    return {
      success: false,
      error: error.message || 'Error desconocido',
    };
  }
};

// Función auxiliar para generar paleta mock para desarrollo
export const getMockColorPalette = () => {
  const mockColors = [
    { hex: '#F5F5DC', percentage: 35, name: 'Beige' },
    { hex: '#DEB887', percentage: 25, name: 'Burlywood' },
    { hex: '#D2B48C', percentage: 20, name: 'Tan' },
    { hex: '#F4A460', percentage: 15, name: 'Sandy Brown' },
    { hex: '#CD853F', percentage: 5, name: 'Peru' },
  ];

  return {
    success: true,
    colors: mockColors,
  };
};
