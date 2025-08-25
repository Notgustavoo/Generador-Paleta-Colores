import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ActionSheetIOS,
  Platform,
} from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { globalStyles, colors } from '../styles/globalStyles';
import { saveUserPalette } from '../services/paletteService';
import { auth } from '../services/firebase';
import {
  sharePaletteAsText,
  sharePaletteColors,
  sharePaletteAsImage,
} from '../services/shareService';

const ColorPaletteCard = ({ colorPalette = [] }) => {
  const [saving, setSaving] = useState(false);
  const [sharing, setSharing] = useState(false);

  const copyToClipboard = async (text) => {
    try {
      await Clipboard.setStringAsync(text);
      Alert.alert('Éxito', 'Color copiado al portapapeles');
    } catch (error) {
      Alert.alert('Error', 'No se pudo copiar el color');
    }
  };

  const handleSharePalette = async () => {
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
          title: 'Selecciona cómo compartir la paleta',
        },
        async (buttonIndex) => {
          if (buttonIndex === 0) return; // Cancelar

          setSharing(true);
          try {
            switch (buttonIndex) {
              case 1:
                await sharePaletteAsText(colorPalette);
                break;
              case 2:
                await sharePaletteColors(colorPalette);
                break;
              case 3:
                await sharePaletteAsImage(colorPalette);
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
        'Selecciona cómo quieres compartir la paleta',
        [
          { text: 'Cancelar', style: 'cancel' },
          {
            text: 'Como texto',
            onPress: async () => {
              setSharing(true);
              try {
                await sharePaletteAsText(colorPalette);
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
                await sharePaletteColors(colorPalette);
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
                await sharePaletteAsImage(colorPalette);
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

  const handleSavePalette = async () => {
    if (!auth.currentUser) {
      Alert.alert('Error', 'Debes estar logueado para guardar paletas');
      return;
    }

    Alert.prompt(
      'Guardar Paleta',
      'Escribe un nombre para tu paleta:',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Guardar',
          onPress: async (paletteName) => {
            if (!paletteName || paletteName.trim() === '') {
              Alert.alert(
                'Error',
                'El nombre de la paleta no puede estar vacío'
              );
              return;
            }

            setSaving(true);
            try {
              const result = await saveUserPalette(
                auth.currentUser.uid,
                paletteName.trim(),
                colorPalette
              );

              if (result.success) {
                Alert.alert('Éxito', 'Paleta guardada correctamente');
              } else {
                Alert.alert(
                  'Error',
                  result.error || 'No se pudo guardar la paleta'
                );
              }
            } catch (error) {
              console.error('Error al guardar paleta:', error);
              Alert.alert('Error', 'Error al guardar la paleta');
            } finally {
              setSaving(false);
            }
          },
        },
      ],
      'plain-text',
      'Mi paleta'
    );
  };

  // Debug: ver qué colores estamos recibiendo
  console.log('Colores en ColorPaletteCard:', colorPalette);

  return (
    <View style={globalStyles.card}>
      <Text style={globalStyles.cardTitle}>Paleta de Colores</Text>

      {/* Lista de colores */}
      {colorPalette.map((color, index) => (
        <View key={index}>
          <TouchableOpacity
            style={[
              globalStyles.flexRow,
              {
                marginBottom: 15,
                padding: 10,
                backgroundColor: colors.background,
                borderRadius: 8,
                alignItems: 'center',
              },
            ]}
            onPress={() => copyToClipboard(color.hex)}
          >
            {/* Cuadro de color */}
            <View
              style={[
                globalStyles.colorBox,
                {
                  backgroundColor:
                    color.hex && color.hex.startsWith('#')
                      ? color.hex
                      : '#' + color.hex,
                },
              ]}
            />

            {/* Información del color */}
            <View style={{ flex: 1, marginLeft: 15 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '600',
                  color: colors.text,
                  marginBottom: 2,
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
                {color.percentage}% de la imagen
              </Text>
            </View>

            {/* Indicador de tap */}
            <Text
              style={{
                fontSize: 12,
                color: colors.textSecondary,
                fontStyle: 'italic',
              }}
            >
              Tap para copiar
            </Text>
          </TouchableOpacity>

          {/* Código hexadecimal */}
          <TouchableOpacity
            style={{
              backgroundColor: colors.secondary,
              padding: 8,
              borderRadius: 6,
              marginBottom: 15,
              alignSelf: 'flex-start',
            }}
            onPress={() => copyToClipboard(color.hex)}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: '600',
                color: colors.text,
              }}
            >
              {color.hex && color.hex.startsWith('#')
                ? color.hex
                : '#' + color.hex}
            </Text>
          </TouchableOpacity>
        </View>
      ))}

      {/* Botón para guardar paleta */}
      <TouchableOpacity
        style={[
          globalStyles.button,
          saving && { backgroundColor: colors.disabled },
        ]}
        onPress={handleSavePalette}
        disabled={saving}
      >
        <Text style={globalStyles.buttonText}>
          {saving ? 'Guardando...' : 'Guardar Paleta'}
        </Text>
      </TouchableOpacity>

      {/* Botón para compartir paleta */}
      <TouchableOpacity
        style={[
          globalStyles.button,
          {
            backgroundColor: colors.accent,
            marginTop: 10,
          },
          sharing && { backgroundColor: colors.disabled },
        ]}
        onPress={handleSharePalette}
        disabled={sharing}
      >
        <Text style={globalStyles.buttonText}>
          {sharing ? 'Compartiendo...' : 'Compartir Paleta'}
        </Text>
      </TouchableOpacity>

      {/* Vista previa horizontal de la paleta */}
      <View
        style={{
          marginTop: 15,
          padding: 15,
          backgroundColor: colors.background,
          borderRadius: 8,
        }}
      >
        <Text
          style={{
            fontSize: 14,
            fontWeight: '600',
            color: colors.text,
            marginBottom: 10,
            textAlign: 'center',
          }}
        >
          Vista previa de la paleta
        </Text>
        <View
          style={[
            globalStyles.flexRow,
            { height: 40, borderRadius: 8, overflow: 'hidden' },
          ]}
        >
          {colorPalette.map((color, index) => (
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
      </View>
    </View>
  );
};

export default ColorPaletteCard;
