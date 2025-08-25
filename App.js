import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './src/services/firebase';
import { Text, View } from 'react-native';

// Screens
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import HomeScreen from './src/screens/HomeScreen';
import SavedPalettesScreen from './src/screens/SavedPalettesScreen';
import ExplorePalettesScreen from './src/screens/ExplorePalettesScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import SettingsScreen from './src/screens/SettingsScreen';

// Styles
import { colors } from './src/styles/globalStyles';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Iconos minimalistas personalizados
const TabIcon = ({ focused, name }) => {
  const icons = {
    Home: focused ? '●' : '○',
    Profile: focused ? '▲' : '△',
    SavedPalettes: focused ? '♥' : '♡',
    ExplorePalettes: focused ? '◆' : '◇',
    Settings: focused ? '■' : '□',
  };

  return (
    <View
      style={{ alignItems: 'center', justifyContent: 'center', paddingTop: 4 }}
    >
      <Text
        style={{
          fontSize: 16,
          color: focused ? colors.primaryDark : colors.textSecondary,
          marginBottom: 4,
        }}
      >
        {icons[name]}
      </Text>
    </View>
  );
};

// Componente Tab Navigator
const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => (
          <TabIcon focused={focused} name={route.name} />
        ),
        tabBarActiveTintColor: colors.primaryDark,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          paddingTop: 12,
          paddingBottom: 25, // Más espacio para el home indicator
          height: 85, // Altura aumentada para iPhone con home indicator
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          marginTop: 4,
          marginBottom: 2,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ tabBarLabel: 'Inicio' }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ tabBarLabel: 'Perfil' }}
      />
      <Tab.Screen
        name="SavedPalettes"
        component={SavedPalettesScreen}
        options={{ tabBarLabel: 'Favoritos' }}
      />
      <Tab.Screen
        name="ExplorePalettes"
        component={ExplorePalettesScreen}
        options={{ tabBarLabel: 'Explorar' }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ tabBarLabel: 'Config' }}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) {
    return null; // Podrías mostrar un splash screen aquí
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.primaryDark,
          },
          headerTintColor: colors.surface,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        {user ? (
          // Usuario autenticado - Mostrar navegación por pestañas
          <Stack.Screen
            name="MainTabs"
            component={MainTabNavigator}
            options={{ headerShown: false }}
          />
        ) : (
          // Usuario no autenticado - Mostrar pantallas de auth
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{
                title: 'Iniciar Sesión',
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Signup"
              component={SignupScreen}
              options={{
                title: 'Crear Cuenta',
                headerShown: false,
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
