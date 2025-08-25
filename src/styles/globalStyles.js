import { StyleSheet } from 'react-native';

// Paleta de colores cremas y relacionados
export const colors = {
  primary: '#F5F5DC', // Beige claro
  primaryDark: '#DEB887', // Burlywood
  secondary: '#D2B48C', // Tan
  accent: '#F4A460', // Sandy Brown
  background: '#FAF0E6', // Linen
  surface: '#FFFFFF', // Blanco
  text: '#5D4037', // Café oscuro
  textSecondary: '#8D6E63', // Café medio
  error: '#D32F2F', // Rojo para errores
  success: '#388E3C', // Verde para éxito
  border: '#E0E0E0', // Gris claro para bordes
  shadow: '#000000', // Negro para sombras
  disabled: '#CCCCCC', // Gris para elementos deshabilitados
};

// Estilos globales
export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: colors.surface,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: colors.border,
    fontSize: 16,
    color: colors.text,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: colors.primaryDark,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: colors.surface,
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    width: '100%',
    height: 50,
    backgroundColor: 'transparent',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 2,
    borderColor: colors.primaryDark,
  },
  secondaryButtonText: {
    color: colors.primaryDark,
    fontSize: 16,
    fontWeight: '600',
  },
  linkText: {
    color: colors.accent,
    textAlign: 'center',
    marginTop: 10,
    fontSize: 16,
  },
  errorText: {
    color: colors.error,
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 14,
  },
  successText: {
    color: colors.success,
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 14,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 20,
    marginVertical: 10,
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  colorBox: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flexColumn: {
    flexDirection: 'column',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default { colors, globalStyles };
