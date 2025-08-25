import React from 'react';
import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import { globalStyles, colors } from '../styles/globalStyles';

const examplePalettes = [
  {
    id: '1',
    name: 'Sunset Beach',
    colors: ['#F5F5DC', '#F4A460', '#DEB887', '#D2B48C', '#8D6E63'],
  },
  {
    id: '2',
    name: 'Café Latte',
    colors: ['#D2B48C', '#F5F5DC', '#5D4037', '#DEB887', '#F4A460'],
  },
  {
    id: '3',
    name: 'Tierra y Arena',
    colors: ['#DEB887', '#F5F5DC', '#8D6E63', '#D2B48C', '#F4A460'],
  },
];

const ExplorePalettesScreen = () => {
  return (
    <SafeAreaView style={[globalStyles.container, { padding: 20 }]}>
      <View style={{ alignItems: 'center', marginBottom: 24 }}>
        <Text
          style={{
            fontSize: 28,
            fontWeight: '700',
            color: colors.text,
            letterSpacing: 0.5,
            textAlign: 'center',
          }}
        >
          Explorar Paletas
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: '#8E8E93',
            textAlign: 'center',
            marginTop: 4,
          }}
        >
          Descubre paletas creadas por la comunidad
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {examplePalettes.map((palette) => (
          <View
            key={palette.id}
            style={{
              backgroundColor: colors.surface,
              borderRadius: 12,
              padding: 20,
              marginBottom: 20,
              shadowColor: colors.shadow,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.08,
              shadowRadius: 4,
              elevation: 2,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: '600',
                color: colors.text,
                marginBottom: 10,
              }}
            >
              {palette.name}
            </Text>
            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
              {palette.colors.map((color, idx) => (
                <View
                  key={idx}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 8,
                    backgroundColor: color,
                    marginRight: idx < palette.colors.length - 1 ? 8 : 0,
                    borderWidth: 1,
                    borderColor: colors.border,
                  }}
                />
              ))}
            </View>
            <View style={{ flexDirection: 'row' }}>
              {palette.colors.map((color, idx) => (
                <Text
                  key={idx}
                  style={{
                    fontSize: 12,
                    color: colors.textSecondary,
                    marginRight: idx < palette.colors.length - 1 ? 12 : 0,
                  }}
                >
                  {color.toUpperCase()}
                </Text>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ExplorePalettesScreen;
