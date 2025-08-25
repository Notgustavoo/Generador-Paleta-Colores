import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Switch,
  Alert,
  SafeAreaView,
} from 'react-native';
import { globalStyles, colors } from '../styles/globalStyles';

const SettingsScreen = () => {
  // Estados de ejemplo (puedes conectar con tu lógica real)
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [autoSaveEnabled, setAutoSaveEnabled] = React.useState(false);
  const [highQualityEnabled, setHighQualityEnabled] = React.useState(true);

  // Componente de opción con switch
  const SwitchOption = ({ title, subtitle, value, onValueChange }) => (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
      }}
    >
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 16, fontWeight: '500', color: colors.text }}>
          {title}
        </Text>
        {subtitle && (
          <Text style={{ fontSize: 14, color: colors.textSecondary }}>
            {subtitle}
          </Text>
        )}
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: colors.border, true: colors.primaryDark }}
        thumbColor={value ? colors.surface : colors.textSecondary}
      />
    </View>
  );

  // Componente de opción simple
  const SettingsOption = ({ title, subtitle, onPress }) => (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
      }}
    >
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 16, fontWeight: '500', color: colors.text }}>
          {title}
        </Text>
        {subtitle && (
          <Text style={{ fontSize: 14, color: colors.textSecondary }}>
            {subtitle}
          </Text>
        )}
      </View>
      <Text style={{ fontSize: 16, color: colors.textSecondary }}>→</Text>
    </View>
  );

  return (
    <SafeAreaView style={[globalStyles.container]}>
      <View style={{ alignItems: 'center', marginBottom: 24, marginTop: 10 }}>
        <Text
          style={{
            fontSize: 28,
            fontWeight: '700',
            color: colors.text,
            letterSpacing: 0.5,
            textAlign: 'center',
          }}
        >
          Configuración
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: '#8E8E93',
            textAlign: 'center',
            marginTop: 4,
          }}
        >
          Personaliza tu experiencia
        </Text>
      </View>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Botón cerrar sesión */}
        <View style={{ alignItems: 'center', marginTop: 10, marginBottom: 20 }}>
          <Text
            onPress={async () => {
              const { auth } = await import('../services/firebase');
              auth.signOut();
            }}
            style={{
              color: colors.error,
              fontSize: 16,
              fontWeight: '700',
              paddingVertical: 12,
              paddingHorizontal: 32,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: colors.error,
              backgroundColor: 'transparent',
              textAlign: 'center',
              marginTop: 10,
            }}
          >
            Cerrar sesión
          </Text>
        </View>
        {/* Sección General */}
        <Text
          style={{
            fontSize: 18,
            fontWeight: '600',
            color: colors.text,
            marginBottom: 10,
          }}
        >
          General
        </Text>
        <View
          style={{
            backgroundColor: colors.surface,
            borderRadius: 12,
            marginBottom: 25,
          }}
        >
          <SwitchOption
            title="Notificaciones"
            subtitle="Recibir notificaciones de la app"
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
          />
          <SwitchOption
            title="Auto-guardar paletas"
            subtitle="Guardar automáticamente las paletas generadas"
            value={autoSaveEnabled}
            onValueChange={setAutoSaveEnabled}
          />
          <SettingsOption
            title="Idioma"
            subtitle="Español"
            onPress={() =>
              Alert.alert('Idioma', 'Seleccionar idioma de la aplicación')
            }
          />
          <SettingsOption
            title="Tema"
            subtitle="Claro"
            onPress={() =>
              Alert.alert('Tema', 'Cambiar entre tema claro y oscuro')
            }
          />
        </View>
        {/* Sección Paletas */}
        <Text
          style={{
            fontSize: 18,
            fontWeight: '600',
            color: colors.text,
            marginBottom: 10,
          }}
        >
          Paletas de Colores
        </Text>
        <View
          style={{
            backgroundColor: colors.surface,
            borderRadius: 12,
            marginBottom: 25,
          }}
        >
          <SwitchOption
            title="Calidad alta"
            subtitle="Procesar imágenes en alta calidad"
            value={highQualityEnabled}
            onValueChange={setHighQualityEnabled}
          />
          <SettingsOption
            title="Colores por paleta"
            subtitle="5 colores (recomendado)"
            onPress={() =>
              Alert.alert('Colores', 'Seleccionar número de colores por paleta')
            }
          />
          <SettingsOption
            title="Formato de exportación"
            subtitle="HEX, RGB, HSL"
            onPress={() =>
              Alert.alert('Formato', 'Seleccionar formato de exportación')
            }
          />
        </View>
        {/* Sección Cuenta */}
        <Text
          style={{
            fontSize: 18,
            fontWeight: '600',
            color: colors.text,
            marginBottom: 10,
          }}
        >
          Cuenta
        </Text>
        <View
          style={{
            backgroundColor: colors.surface,
            borderRadius: 12,
            marginBottom: 25,
          }}
        >
          <SettingsOption
            title="Información personal"
            subtitle="Editar perfil y datos"
            onPress={() => Alert.alert('Perfil', 'Editar perfil próximamente')}
          />
          <SettingsOption
            title="Privacidad"
            subtitle="Configurar privacidad de paletas"
            onPress={() =>
              Alert.alert('Privacidad', 'Configurar opciones de privacidad')
            }
          />
          <SettingsOption
            title="Exportar datos"
            subtitle="Descargar todas mis paletas"
            onPress={() =>
              Alert.alert('Exportar', 'Descargar todas las paletas guardadas')
            }
          />
        </View>
        {/* Sección Soporte */}
        <Text
          style={{
            fontSize: 18,
            fontWeight: '600',
            color: colors.text,
            marginBottom: 10,
          }}
        >
          Soporte y Ayuda
        </Text>
        <View
          style={{
            backgroundColor: colors.surface,
            borderRadius: 12,
            marginBottom: 25,
          }}
        >
          <SettingsOption
            title="Ayuda y Soporte"
            subtitle="Preguntas frecuentes y contacto"
            onPress={() =>
              Alert.alert('Ayuda', '¿Necesitas ayuda? soporte@paletteapp.com')
            }
          />
          <SettingsOption
            title="Calificar la app"
            subtitle="Danos tu opinión en la store"
            onPress={() => Alert.alert('Calificar', '¡Gracias por tu apoyo!')}
          />
          <SettingsOption
            title="Reportar problema"
            subtitle="Informar errores o sugerencias"
            onPress={() =>
              Alert.alert(
                'Reportar',
                'Envíanos un email a: bugs@paletteapp.com'
              )
            }
          />
          <SettingsOption
            title="Términos y Privacidad"
            subtitle="Políticas de uso y privacidad"
            onPress={() =>
              Alert.alert(
                'Términos y Privacidad',
                'Términos de Servicio y Política de Privacidad'
              )
            }
          />
        </View>
        {/* Sección Acerca de */}
        <Text
          style={{
            fontSize: 18,
            fontWeight: '600',
            color: colors.text,
            marginBottom: 10,
          }}
        >
          Acerca de
        </Text>
        <View
          style={{
            backgroundColor: colors.surface,
            borderRadius: 12,
            marginBottom: 25,
          }}
        >
          <SettingsOption
            title="Versión de la app"
            subtitle="1.0.0 (Build 2025.08.25)"
            onPress={() =>
              Alert.alert(
                'Versión',
                'Generador de Paletas v1.0.0\nÚltima actualización disponible'
              )
            }
          />
          <SettingsOption
            title="Desarrolladores"
            subtitle="Hecho con dedicación por el equipo"
            onPress={() =>
              Alert.alert(
                'Desarrolladores',
                'Generador de Paletas\nDesarrollado con React Native y Expo'
              )
            }
          />
          <SettingsOption
            title="Novedades"
            subtitle="Ver últimas actualizaciones"
            onPress={() =>
              Alert.alert(
                'Novedades v1.0',
                'Nuevo en esta versión:\n• Extracción de colores con IA\n• Compartir paletas\n• Navegación mejorada\n• Estadísticas de usuario\n• Diseño renovado\n¡Próximamente más funciones!'
              )
            }
          />
        </View>
        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen;
