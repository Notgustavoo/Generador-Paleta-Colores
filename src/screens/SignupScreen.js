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
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../services/firebase';
import { globalStyles, colors } from '../styles/globalStyles';

const SignupScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    // Validaciones
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setLoading(true);
    try {
      // Crear usuario con email y contraseña
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Actualizar el perfil del usuario con el nombre
      await updateProfile(userCredential.user, {
        displayName: name,
      });

      Alert.alert('Éxito', 'Cuenta creada exitosamente');
    } catch (error) {
      console.error('Error de registro:', error);
      let errorMessage = 'Error al crear la cuenta';

      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'Este email ya está registrado';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Email inválido';
          break;
        case 'auth/weak-password':
          errorMessage = 'La contraseña es muy débil';
          break;
        default:
          errorMessage = error.message;
      }

      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
    }
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
            <Text style={globalStyles.title}>Crear Cuenta</Text>
            <Text style={globalStyles.subtitle}>
              Únete y comienza a crear paletas increíbles
            </Text>
          </View>

          {/* Logo/Icon placeholder */}
          <View
            style={{
              width: 80,
              height: 80,
              backgroundColor: colors.accent,
              borderRadius: 40,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 30,
            }}
          >
            <Text
              style={{
                fontSize: 30,
                color: colors.surface,
              }}
            >
              ✨
            </Text>
          </View>

          {/* Formulario */}
          <View style={{ width: '100%' }}>
            <TextInput
              style={globalStyles.input}
              placeholder="Nombre completo"
              placeholderTextColor={colors.textSecondary}
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
              autoCorrect={false}
            />

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

            <TextInput
              style={globalStyles.input}
              placeholder="Confirmar contraseña"
              placeholderTextColor={colors.textSecondary}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              autoCapitalize="none"
            />

            <TouchableOpacity
              style={[
                globalStyles.button,
                loading && { backgroundColor: colors.border },
              ]}
              onPress={handleSignup}
              disabled={loading}
            >
              <Text style={globalStyles.buttonText}>
                {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={globalStyles.secondaryButton}
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={globalStyles.secondaryButtonText}>
                Ya tengo cuenta
              </Text>
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 12,
                color: colors.textSecondary,
                lineHeight: 18,
              }}
            >
              Al crear una cuenta, aceptas nuestros términos de servicio y
              política de privacidad
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;
