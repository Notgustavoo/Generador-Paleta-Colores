import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  RefreshControl,
  ActionSheetIOS,
  Platform,
  SafeAreaView,
} from 'react-native';
import { getUserPalettes, deletePalette } from '../services/paletteService';
import { globalStyles, colors } from '../styles/globalStyles';
import * as Clipboard from 'expo-clipboard';
import {
  sharePaletteAsText,
  sharePaletteColors,
  sharePaletteAsImage,
} from '../services/shareService';
import { MaterialIcons } from '@expo/vector-icons';

const SavedPalettesScreen = ({ navigation }) => {
  const [palettes, setPalettes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [sharing, setSharing] = useState(false);

  useEffect(() => {
    loadPalettes();
  }, []);

  const loadPalettes = async () => {
    setLoading(true);
    try {
      const result = await getUserPalettes();
      if (result.success) {
        setPalettes(result.palettes);
      } else {
        Alert.alert('Error', 'No se pudieron cargar las paletas guardadas');
      }
    } catch (error) {
      console.error('Error al cargar paletas:', error);
      Alert.alert('Error', 'Error al cargar paletas guardadas');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadPalettes();
    setRefreshing(false);
  };

  const handleDeletePalette = (paletteId, paletteName) => {
    Alert.alert(
      'Eliminar Paleta',
      `¿Estás seguro que quieres eliminar "${paletteName}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            const result = await deletePalette(paletteId);
            if (result.success) {
              setPalettes(palettes.filter((p) => p.id !== paletteId));
              Alert.alert('Éxito', 'Paleta eliminada correctamente');
            } else {
              Alert.alert('Error', 'No se pudo eliminar la paleta');
            }
          },
        },
      ]
    );
  };

  const copyPaletteToClipboard = async (palette) => {
    const colorsText = palette.colors
      .map((color) => color.hex.toUpperCase())
      .join(', ');
    await Clipboard.setStringAsync(colorsText);
    Alert.alert('Copiado', 'Paleta copiada al portapapeles');
  };

  const handleSharePalette = async (palette) => {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: [
            'Cancelar',
            'Compartir como texto',
            'Solo colores',
            'Como imagen',
          ],
          cancelButtonIndex: 0,
          title: `Compartir paleta "${palette.name}"`,
        },
        async (buttonIndex) => {
          if (buttonIndex === 0) return; // Cancelar

          setSharing(true);
          try {
            switch (buttonIndex) {
              case 1:
                await sharePaletteAsText(palette.colors, palette.name);
                break;
              case 2:
                await sharePaletteColors(palette.colors);
                break;
              case 3:
                await sharePaletteAsImage(palette.colors, palette.name);
                break;
            }
          } catch (error) {
            console.error('Error al compartir:', error);
            Alert.alert('Error', 'No se pudo compartir la paleta');
          } finally {
            setSharing(false);
          }
        }
      );
    } else {
      // Para Android, mostrar Alert con opciones
      Alert.alert(
        'Compartir Paleta',
        `Selecciona cómo quieres compartir "${palette.name}"`,
        [
          { text: 'Cancelar', style: 'cancel' },
          {
            text: 'Como texto',
            onPress: async () => {
              setSharing(true);
              try {
                await sharePaletteAsText(palette.colors, palette.name);
              } catch (error) {
                console.error('Error al compartir:', error);
                Alert.alert('Error', 'No se pudo compartir la paleta');
              } finally {
                setSharing(false);
              }
            },
          },
          {
            text: 'Solo colores',
            onPress: async () => {
              setSharing(true);
              try {
                await sharePaletteColors(palette.colors);
              } catch (error) {
                console.error('Error al compartir:', error);
                Alert.alert('Error', 'No se pudo compartir la paleta');
              } finally {
                setSharing(false);
              }
            },
          },
          {
            text: 'Como imagen',
            onPress: async () => {
              setSharing(true);
              try {
                await sharePaletteAsImage(palette.colors, palette.name);
              } catch (error) {
                console.error('Error al compartir:', error);
                Alert.alert('Error', 'No se pudo compartir la paleta');
              } finally {
                setSharing(false);
              }
            },
          },
        ]
      );
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'Fecha desconocida';

    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <SafeAreaView style={[globalStyles.container]}>
        <View style={[globalStyles.container, globalStyles.centerContent]}>
          <ActivityIndicator size="large" color={colors.primaryDark} />
          <Text
            style={{
              marginTop: 10,
              color: colors.textSecondary,
              textAlign: 'center',
            }}
          >
            Cargando paletas guardadas...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[globalStyles.container]}>
      <View style={{ flex: 1 }}>
        {/* Header */}
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
            Mis Paletas
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
            {palettes.length} paleta{palettes.length !== 1 ? 's' : ''} guardada
            {palettes.length !== 1 ? 's' : ''}
          </Text>
        </View>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ padding: 20, paddingTop: 0 }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[colors.primaryDark]}
            />
          }
        >
          {/* Lista de paletas */}
          {palettes.length === 0 ? (
            <View style={[globalStyles.card, globalStyles.centerContent]}>
              <Text
                style={{
                  fontSize: 48,
                  marginBottom: 15,
                }}
              >
                🎨
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '600',
                  color: colors.text,
                  textAlign: 'center',
                  marginBottom: 8,
                }}
              >
                No tienes paletas guardadas
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: colors.textSecondary,
                  textAlign: 'center',
                  lineHeight: 20,
                }}
              >
                Crea tu primera paleta desde una imagen y guárdala para verla
                aquí
              </Text>
            </View>
          ) : (
            palettes.map((palette) => (
              <View
                key={palette.id}
                style={{
                  backgroundColor: colors.surface,
                  borderRadius: 18,
                  padding: 22,
                  marginBottom: 24,
                  shadowColor: colors.shadow,
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.13,
                  shadowRadius: 10,
                  elevation: 5,
                }}
              >
                {/* Header de la paleta */}
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 12,
                  }}
                >
                  <View>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: '700',
                        color: colors.text,
                        marginBottom: 2,
                      }}
                    >
                      {palette.name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        color: colors.textSecondary,
                      }}
                    >
                      {formatDate(palette.createdAt)}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() =>
                      handleDeletePalette(palette.id, palette.name)
                    }
                    style={{
                      padding: 8,
                      backgroundColor: colors.error,
                      borderRadius: 8,
                      shadowColor: colors.shadow,
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.12,
                      shadowRadius: 4,
                      elevation: 2,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <MaterialIcons
                      name="delete"
                      size={22}
                      color={colors.surface}
                    />
                  </TouchableOpacity>
                </View>

                {/* Vista previa de la paleta */}
                <View
                  style={{
                    flexDirection: 'row',
                    height: 48,
                    borderRadius: 10,
                    overflow: 'hidden',
                    marginBottom: 16,
                    borderWidth: 1,
                    borderColor: colors.border,
                  }}
                >
                  {palette.colors.map((color, index) => (
                    <View
                      key={index}
                      style={{
                        flex: 1,
                        backgroundColor:
                          color.hex && color.hex.startsWith('#')
                            ? color.hex
                            : '#' + color.hex,
                      }}
                    />
                  ))}
                </View>

                {/* Lista de colores */}
                <View style={{ marginBottom: 16 }}>
                  {palette.colors.map((color, index) => (
                    <View
                      key={index}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginBottom: 8,
                        padding: 8,
                        backgroundColor: colors.background,
                        borderRadius: 8,
                        borderWidth: 1,
                        borderColor: colors.border,
                      }}
                    >
                      <View
                        style={{
                          width: 32,
                          height: 32,
                          backgroundColor:
                            color.hex && color.hex.startsWith('#')
                              ? color.hex
                              : '#' + color.hex,
                          borderRadius: 16,
                          marginRight: 14,
                          borderWidth: 1,
                          borderColor: colors.border,
                        }}
                      />
                      <View style={{ flex: 1 }}>
                        <Text
                          style={{
                            fontSize: 15,
                            fontWeight: '600',
                            color: colors.text,
                          }}
                        >
                          {color.name}
                        </Text>
                        <Text
                          style={{
                            fontSize: 12,
                            color: colors.textSecondary,
                          }}
                        >
                          {color.hex && color.hex.startsWith('#')
                            ? color.hex.toUpperCase()
                            : '#' + color.hex.toUpperCase()}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>

                {/* Botones de acción */}
                <View style={{ flexDirection: 'row', marginTop: 2 }}>
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      marginRight: 10,
                      borderWidth: 1.5,
                      borderColor: colors.primaryDark,
                      borderRadius: 8,
                      paddingVertical: 10,
                      backgroundColor: 'transparent',
                      alignItems: 'center',
                    }}
                    onPress={() => copyPaletteToClipboard(palette)}
                  >
                    <Text
                      style={{
                        color: colors.primaryDark,
                        fontWeight: '600',
                        fontSize: 15,
                      }}
                    >
                      📋 Copiar
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      borderRadius: 8,
                      paddingVertical: 10,
                      backgroundColor: colors.primaryDark,
                      alignItems: 'center',
                    }}
                    onPress={() => handleSharePalette(palette)}
                    disabled={sharing}
                  >
                    <Text
                      style={{
                        color: colors.surface,
                        fontWeight: '600',
                        fontSize: 15,
                      }}
                    >
                      {sharing ? '📤 Compartiendo...' : '📤 Compartir'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </ScrollView>

        {/* Espacio adicional para la navegación inferior */}
        <View style={{ height: 20 }} />
      </View>
    </SafeAreaView>
  );
};

export default SavedPalettesScreen;
