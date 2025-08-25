import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { auth } from '../services/firebase';
import { getUserPalettes } from '../services/paletteService';
import { globalStyles, colors } from '../styles/globalStyles';

const ProfileScreen = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [palettesCount, setPalettesCount] = useState(0);

  useEffect(() => {
    setUser(auth.currentUser);
    const fetchPalettes = async () => {
      try {
        const result = await getUserPalettes();
        if (result.success) {
          setPalettesCount(result.palettes.length);
        } else {
          setPalettesCount(0);
        }
      } catch (e) {
        setPalettesCount(0);
      } finally {
        setLoading(false);
      }
    };
    fetchPalettes();
  }, []);

  if (loading) {
    return (
      <SafeAreaView
        style={[
          globalStyles.container,
          { justifyContent: 'center', alignItems: 'center' },
        ]}
      >
        <ActivityIndicator size="large" color={colors.primaryDark} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[globalStyles.container, { padding: 20 }]}>
      {/* Título principal */}
      <Text
        style={{
          fontSize: 28,
          fontWeight: '700',
          color: colors.text,
          textAlign: 'center',
          marginBottom: 18,
          letterSpacing: 0.5,
        }}
      >
        Perfil
      </Text>
      <View style={{ alignItems: 'center', marginBottom: 24 }}>
        {/* Avatar con sombra */}
        <View
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            backgroundColor: colors.primaryDark,
            marginBottom: 16,
            justifyContent: 'center',
            alignItems: 'center',
            shadowColor: colors.shadow,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.18,
            shadowRadius: 8,
            elevation: 6,
          }}
        >
          <Text
            style={{ color: colors.surface, fontSize: 40, fontWeight: '700' }}
          >
            {user?.displayName ? user.displayName[0].toUpperCase() : 'U'}
          </Text>
        </View>
        <Text
          style={{
            fontSize: 22,
            fontWeight: '700',
            color: colors.text,
            marginBottom: 2,
          }}
        >
          {user?.displayName || 'Usuario'}
        </Text>
        <Text
          style={{
            fontSize: 15,
            color: colors.textSecondary,
            marginBottom: 8,
          }}
        >
          {user?.email}
        </Text>
        <TouchableOpacity
          style={{
            borderWidth: 1,
            borderColor: colors.primaryDark,
            borderRadius: 8,
            paddingVertical: 6,
            paddingHorizontal: 18,
            marginTop: 4,
            backgroundColor: 'transparent',
          }}
          onPress={() => {}}
          activeOpacity={0.7}
        >
          <Text
            style={{
              color: colors.primaryDark,
              fontWeight: '600',
              fontSize: 15,
            }}
          >
            Editar perfil
          </Text>
        </TouchableOpacity>
      </View>
      {/* Tarjeta de estadísticas */}
      <View
        style={{
          backgroundColor: colors.surface,
          borderRadius: 14,
          padding: 24,
          marginBottom: 32,
          shadowColor: colors.shadow,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 6,
          elevation: 3,
        }}
      >
        <Text
          style={{
            fontSize: 17,
            fontWeight: '600',
            color: colors.text,
            marginBottom: 10,
          }}
        >
          Estadísticas
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 6,
          }}
        >
          <Text style={{ fontSize: 15, color: colors.textSecondary }}>
            Paletas creadas
          </Text>
          <Text style={{ fontSize: 15, color: colors.text, fontWeight: '600' }}>
            {palettesCount}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 15, color: colors.textSecondary }}>
            Último acceso
          </Text>
          <Text style={{ fontSize: 15, color: colors.text, fontWeight: '600' }}>
            próximamente
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
