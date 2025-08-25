import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import { signOut } from 'firebase/auth';
import * as ImagePicker from 'expo-image-picker';
import { auth } from '../services/firebase';
import { getColorPalette, getMockColorPalette } from '../services/imaggaApi';
import { globalStyles, colors } from '../styles/globalStyles';
import ColorPaletteCard from '../components/ColorPaletteCard';
import { getUserPalettes } from '../services/paletteService';

const HomeScreen = ({ navigation }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [colorPalette, setColorPalette] = useState(null);
  const [loading, setLoading] = useState(false);
  const [recentPalettes, setRecentPalettes] = useState([]);

  useEffect(() => {
    loadRecentPalettes();
  }, []);

  const loadRecentPalettes = async () => {
    try {
      const result = await getUserPalettes();
      if (result.success) {
        // Mostrar solo las 3 paletas más recientes
        setRecentPalettes(result.palettes.slice(0, 3));
      }
    } catch (error) {
      console.error('Error al cargar paletas recientes:', error);
    }
  };

  const handleLogout = async () => {
    Alert.alert('Cerrar Sesión', '¿Estás seguro que quieres cerrar sesión?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Cerrar Sesión',
        style: 'destructive',
        onPress: async () => {
          try {
            await signOut(auth);
          } catch (error) {
            console.error('Error al cerrar sesión:', error);
            Alert.alert('Error', 'No se pudo cerrar sesión');
          }
        },
      },
    ]);
  };

  const pickImage = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert(
          'Permisos necesarios',
          'Se necesita acceso a la galería para seleccionar imágenes'
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'images',
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setSelectedImage(result.assets[0].uri);
        await generatePalette(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error al seleccionar imagen:', error);
      Alert.alert('Error', 'No se pudo seleccionar la imagen');
    }
  };

  const takePhoto = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert(
          'Permisos necesarios',
          'Se necesita acceso a la cámara para tomar fotos'
        );
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setSelectedImage(result.assets[0].uri);
        await generatePalette(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error al tomar foto:', error);
      Alert.alert('Error', 'No se pudo tomar la foto');
    }
  };

  const generatePalette = async (imageUri) => {
    setLoading(true);
    setColorPalette(null);

    try {
      // Usando la API real de Imagga
      const result = await getColorPalette(imageUri);

      if (result.success) {
        setColorPalette(result.colors);
      } else {
        Alert.alert('Error', result.error || 'No se pudo generar la paleta');
      }
    } catch (error) {
      console.error('Error al generar paleta:', error);
      Alert.alert('Error', 'Error al procesar la imagen');
    } finally {
      setLoading(false);
    }
  };
  const currentUser = auth.currentUser;

  return (
    <SafeAreaView style={[globalStyles.container]}>
      <View style={{ flex: 1 }}>
        {/* Header minimalista */}
        <View
          style={{
            paddingVertical: 20,
            paddingHorizontal: 20,
            backgroundColor: colors.surface,
            borderBottomWidth: 1,
            borderBottomColor: colors.border,
          }}
        >
          <Text
            style={{
              fontSize: 28,
              fontWeight: '700',
              color: colors.text,
              textAlign: 'center',
              letterSpacing: 0.5,
            }}
          >
            Generador de Paletas
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: colors.textSecondary,
              textAlign: 'center',
              marginTop: 4,
              fontWeight: '400',
            }}
          >
            Crea paletas únicas desde tus imágenes
          </Text>
        </View>

        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          {/* Sección principal - Generar Paleta */}
          <View
            style={{
              margin: 20,
              padding: 30,
              backgroundColor: colors.surface,
              borderRadius: 20,
              alignItems: 'center',
              shadowColor: colors.shadow,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 3,
            }}
          >
            <Text
              style={{
                fontSize: 22,
                fontWeight: '600',
                color: colors.text,
                marginBottom: 8,
              }}
            >
              Generar Paleta
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: colors.textSecondary,
                textAlign: 'center',
                marginBottom: 25,
                lineHeight: 20,
              }}
            >
              Crea una paleta de colores única desde tus fotos
            </Text>

            {/* Área de imagen placeholder */}
            {!selectedImage ? (
              <View
                style={{
                  width: '100%',
                  height: 180,
                  backgroundColor: colors.background,
                  borderRadius: 15,
                  borderWidth: 2,
                  borderColor: colors.border,
                  borderStyle: 'dashed',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 20,
                }}
              >
                <Text
                  style={{
                    fontSize: 48,
                    marginBottom: 8,
                  }}
                >
                  📸
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '500',
                    color: colors.textSecondary,
                    textAlign: 'center',
                  }}
                >
                  Selecciona una imagen
                </Text>
              </View>
            ) : (
              <View
                style={{
                  width: '100%',
                  height: 180,
                  marginBottom: 20,
                }}
              >
                <Image
                  source={{ uri: selectedImage }}
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 15,
                  }}
                  resizeMode="cover"
                />
              </View>
            )}

            {/* Botón principal */}
            <TouchableOpacity
              style={{
                backgroundColor: colors.primaryDark,
                paddingVertical: 15,
                paddingHorizontal: 40,
                borderRadius: 25,
                width: '100%',
                alignItems: 'center',
                marginBottom: 15,
              }}
              onPress={pickImage}
            >
              <Text
                style={{
                  color: colors.surface,
                  fontSize: 16,
                  fontWeight: '600',
                }}
              >
                Subir imagen
              </Text>
            </TouchableOpacity>

            {/* Botón secundario */}
            <TouchableOpacity
              style={{
                backgroundColor: 'transparent',
                paddingVertical: 12,
                paddingHorizontal: 30,
                borderRadius: 20,
                borderWidth: 1,
                borderColor: colors.border,
                width: '100%',
                alignItems: 'center',
              }}
              onPress={takePhoto}
            >
              <Text
                style={{
                  color: colors.text,
                  fontSize: 14,
                  fontWeight: '500',
                }}
              >
                📷 Tomar foto
              </Text>
            </TouchableOpacity>
          </View>

          {/* Loading */}
          {loading && (
            <View
              style={{
                margin: 20,
                padding: 30,
                backgroundColor: colors.surface,
                borderRadius: 20,
                alignItems: 'center',
              }}
            >
              <ActivityIndicator size="large" color={colors.primaryDark} />
              <Text
                style={{
                  marginTop: 15,
                  color: colors.textSecondary,
                  textAlign: 'center',
                  fontSize: 16,
                }}
              >
                Generando paleta de colores...
              </Text>
            </View>
          )}

          {/* Paleta generada */}
          {colorPalette && !loading && (
            <View style={{ marginHorizontal: 20, marginBottom: 20 }}>
              <ColorPaletteCard colorPalette={colorPalette} />
            </View>
          )}

          {/* Sección de Paletas Guardadas */}
          <View
            style={{
              margin: 20,
              marginTop: 10,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 15,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '600',
                  color: colors.text,
                }}
              >
                Paletas guardadas
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('SavedPalettes')}
              >
                <Text
                  style={{
                    fontSize: 14,
                    color: colors.primaryDark,
                    fontWeight: '500',
                  }}
                >
                  Ver todas →
                </Text>
              </TouchableOpacity>
            </View>

            {/* Vista previa de paletas recientes */}
            {recentPalettes.length > 0 ? (
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {recentPalettes.map((palette, index) => (
                  <TouchableOpacity
                    key={palette.id}
                    style={{
                      marginRight: 15,
                      width: 120,
                    }}
                    onPress={() => navigation.navigate('SavedPalettes')}
                  >
                    <View
                      style={{
                        height: 80,
                        borderRadius: 12,
                        overflow: 'hidden',
                        marginBottom: 8,
                        flexDirection: 'row',
                      }}
                    >
                      {palette.colors.slice(0, 4).map((color, colorIndex) => (
                        <View
                          key={colorIndex}
                          style={{
                            flex: 1,
                            backgroundColor: color.hex,
                          }}
                        />
                      ))}
                    </View>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: '500',
                        color: colors.text,
                        textAlign: 'center',
                      }}
                      numberOfLines={1}
                    >
                      {palette.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            ) : (
              <View
                style={{
                  padding: 30,
                  backgroundColor: colors.background,
                  borderRadius: 15,
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: colors.textSecondary,
                    textAlign: 'center',
                  }}
                >
                  Aún no tienes paletas guardadas
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: colors.textSecondary,
                    textAlign: 'center',
                    marginTop: 5,
                  }}
                >
                  ¡Crea tu primera paleta! 🎨
                </Text>
              </View>
            )}
          </View>

          {/* Espacio adicional para la navegación inferior */}
          <View style={{ height: 20 }} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
