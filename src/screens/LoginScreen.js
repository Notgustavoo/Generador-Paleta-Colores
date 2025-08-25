import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebase';
import { globalStyles, colors } from '../styles/globalStyles';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // La navegación se manejará automáticamente por el listener de auth
    } catch (error) {
      console.error('Error de login:', error);
      let errorMessage = 'Error al iniciar sesión';

      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'Usuario no encontrado';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Contraseña incorrecta';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Email inválido';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Demasiados intentos. Intenta más tarde';
          break;
        default:
          errorMessage = error.message;
      }

      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const navigateToSignup = () => {
    navigation.navigate('Signup');
  };

  return (
    <KeyboardAvoidingView
      style={globalStyles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={globalStyles.centeredContainer}>
          {/* Header */}
          <View style={{ alignItems: 'center', marginBottom: 40 }}>
            <Text style={globalStyles.title}>Generador de Paletas</Text>
            <Text style={globalStyles.subtitle}>
              Inicia sesión para crear paletas de colores únicas
            </Text>
          </View>

          {/* Logo/Icon placeholder */}
          <View
            style={{
              width: 100,
              height: 100,
              backgroundColor: colors.primaryDark,
              borderRadius: 50,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 40,
            }}
          >
            <Text
              style={{
                fontSize: 40,
                color: colors.surface,
              }}
            >
              🎨
            </Text>
          </View>

          {/* Formulario */}
          <View style={{ width: '100%' }}>
            <TextInput
              style={globalStyles.input}
              placeholder="Correo electrónico"
              placeholderTextColor={colors.textSecondary}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />

            <TextInput
              style={globalStyles.input}
              placeholder="Contraseña"
              placeholderTextColor={colors.textSecondary}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
            />

            <TouchableOpacity
              style={[
                globalStyles.button,
                loading && { backgroundColor: colors.border },
              ]}
              onPress={handleLogin}
              disabled={loading}
            >
              <Text style={globalStyles.buttonText}>
                {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={globalStyles.secondaryButton}
              onPress={navigateToSignup}
            >
              <Text style={globalStyles.secondaryButtonText}>
                Crear Nueva Cuenta
              </Text>
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <View style={{ marginTop: 20 }}>
            <TouchableOpacity>
              <Text style={globalStyles.linkText}>
                ¿Olvidaste tu contraseña?
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
