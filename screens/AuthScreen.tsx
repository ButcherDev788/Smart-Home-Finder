import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';
import { Mail, Lock, User, ArrowLeft } from 'lucide-react-native';
import { COLORS, GLASSMORPHISM } from '../constants/theme';
import { scale, moderateScale } from '../utils/scaling';
import Button from '../components/Button';
import GlassmorphicCard from '../components/GlassmorphicCard';

interface AuthScreenProps {
  onLogin: () => void;
  onBack: () => void;
}

type AuthMode = 'login' | 'signup';
type UserRole = 'buyer' | 'agent';

const AuthScreen: React.FC<AuthScreenProps> = ({ onLogin, onBack }) => {
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [userRole, setUserRole] = useState<UserRole>('buyer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAuth = () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      onLogin();
    }, 1500);
  };

  const toggleAuthMode = () => {
    setAuthMode(authMode === 'login' ? 'signup' : 'login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background.dark} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <ArrowLeft size={24} color={COLORS.text.primary} />
          </TouchableOpacity>

          <View style={styles.headerContainer}>
            <Text style={styles.title}>
              {authMode === 'login' ? 'Welcome Back' : 'Create Account'}
            </Text>
            <Text style={styles.subtitle}>
              {authMode === 'login'
                ? 'Sign in to continue'
                : 'Sign up to get started'}
            </Text>
          </View>

          <GlassmorphicCard style={styles.formContainer} intensity={20}>
            <View style={styles.roleToggleContainer}>
              <TouchableOpacity
                style={[
                  styles.roleToggleButton,
                  userRole === 'buyer' && styles.roleToggleButtonActive,
                ]}
                onPress={() => setUserRole('buyer')}
              >
                <Text
                  style={[
                    styles.roleToggleText,
                    userRole === 'buyer' && styles.roleToggleTextActive,
                  ]}
                >
                  Buyer
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.roleToggleButton,
                  userRole === 'agent' && styles.roleToggleButtonActive,
                ]}
                onPress={() => setUserRole('agent')}
              >
                <Text
                  style={[
                    styles.roleToggleText,
                    userRole === 'agent' && styles.roleToggleTextActive,
                  ]}
                >
                  Agent
                </Text>
              </TouchableOpacity>
            </View>

            {authMode === 'signup' && (
              <View style={styles.inputContainer}>
                <User size={20} color={COLORS.text.secondary} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Full Name"
                  placeholderTextColor={COLORS.text.tertiary}
                  value={name}
                  onChangeText={setName}
                  autoCapitalize="words"
                />
              </View>
            )}

            <View style={styles.inputContainer}>
              <Mail size={20} color={COLORS.text.secondary} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Email Address"
                placeholderTextColor={COLORS.text.tertiary}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputContainer}>
              <Lock size={20} color={COLORS.text.secondary} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor={COLORS.text.tertiary}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            {authMode === 'login' && (
              <TouchableOpacity style={styles.forgotPasswordContainer}>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>
            )}

            <Button
              title={authMode === 'login' ? 'Sign In' : 'Sign Up'}
              onPress={handleAuth}
              gradient
              loading={loading}
              style={styles.authButton}
            />

            <View style={styles.switchModeContainer}>
              <Text style={styles.switchModeText}>
                {authMode === 'login'
                  ? "Don't have an account? "
                  : 'Already have an account? '}
              </Text>
              <TouchableOpacity onPress={toggleAuthMode}>
                <Text style={styles.switchModeLink}>
                  {authMode === 'login' ? 'Sign Up' : 'Sign In'}
                </Text>
              </TouchableOpacity>
            </View>
          </GlassmorphicCard>
        </ScrollView>
      </KeyboardAvoidingView>

      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.8)']}
        style={styles.bottomGradient}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.dark,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: scale(24),
    paddingTop: scale(60),
    paddingBottom: scale(40),
  },
  backButton: {
    position: 'absolute',
    top: scale(16),
    left: scale(16),
    zIndex: 10,
  },
  headerContainer: {
    marginBottom: scale(40),
  },
  title: {
    fontSize: moderateScale(28),
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: scale(8),
  },
  subtitle: {
    fontSize: moderateScale(16),
    color: COLORS.text.secondary,
  },
  formContainer: {
    padding: scale(24),
    borderRadius: scale(16),
  },
  roleToggleContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: scale(8),
    marginBottom: scale(24),
    padding: scale(4),
  },
  roleToggleButton: {
    flex: 1,
    paddingVertical: scale(10),
    alignItems: 'center',
    borderRadius: scale(6),
  },
  roleToggleButtonActive: {
    backgroundColor: COLORS.accent.primary,
  },
  roleToggleText: {
    color: COLORS.text.secondary,
    fontWeight: '500',
  },
  roleToggleTextActive: {
    color: COLORS.text.primary,
    fontWeight: '600',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: scale(8),
    marginBottom: scale(16),
    paddingHorizontal: scale(16),
    height: scale(50),
  },
  inputIcon: {
    marginRight: scale(12),
  },
  input: {
    flex: 1,
    color: COLORS.text.primary,
    fontSize: moderateScale(16),
    height: '100%',
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginBottom: scale(24),
  },
  forgotPasswordText: {
    color: COLORS.accent.primary,
    fontSize: moderateScale(14),
  },
  authButton: {
    marginBottom: scale(24),
  },
  switchModeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  switchModeText: {
    color: COLORS.text.secondary,
    fontSize: moderateScale(14),
  },
  switchModeLink: {
    color: COLORS.accent.primary,
    fontSize: moderateScale(14),
    fontWeight: '600',
  },
  bottomGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: scale(100),
  },
});

export default AuthScreen;