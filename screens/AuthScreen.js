import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Dimensions,
  LayoutAnimation,
  UIManager,
  KeyboardAvoidingView
} from 'react-native';
import { Input, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes
} from 'react-native-google-signin';

import { login, register, googleSignIn } from '../actions';
import keys from '../config/keys';
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const BG_IMAGE = require('../assets/images/bg_screen2.jpg');

GoogleSignin.configure({
  scopes: ['profile', 'email', 'openid'], // what API you want to access on behalf of the user, default is email and profile
  webClientId: keys.google.client_id, // client ID of type WEB for your server (needed to verify user ID and offline access)
  offlineAccess: false, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  // hostedDomain: 'https://mongosilakan.net', // specifies a hosted domain restriction
  loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
  forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login.
  accountName: '', // [Android] specifies an account name on the device that should be used
  iosClientId: '' // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
});

// Enable LayoutAnimation on Android
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

const TabSelector = ({ selected }) => (
  <View style={styles.selectorContainer}>
    <View style={selected && styles.selected} />
  </View>
);

TabSelector.propTypes = {
  selected: PropTypes.bool.isRequired
};

class AuthScreen extends Component {
  state = {
    token: ''
  };

  constructor(props) {
    super(props);

    this.state = {
      email: 'admin@localhost.com',
      password: 'password',
      fontLoaded: false,
      selectedCategory: 0,
      isLoading: false,
      isEmailValid: true,
      isPasswordValid: true,
      isConfirmationValid: true
    };
  }

  // async UNSAFE_componentWillMount() {
  //   let token = await AsyncStorage.getItem('token');
  //   // AsyncStorage.removeItem('fb_token');
  //   if (token) {
  //     this.setState({ token });
  //     this.props.navigation.navigate('Map');
  //   } else {
  //     this.setState({ token: false });
  //   }
  // }
  // Somewhere in your code
  _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
      this.props.googleSignIn(userInfo);
    } catch (error) {
      console.error(error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.token) {
      return { token: nextProps.token };
    }

    return null;
  }

  componentDidUpdate() {
    if (this.props.token) {
      // Perform some operation here
      this.onAuthComplete(this.props.token);
    }
  }

  onAuthComplete(token) {
    LayoutAnimation.easeInEaseOut();
    if (token) {
      this.props.navigation.navigate('Map');
    }
    this.setState({
      isLoading: false
    });
  }

  componentDidMount() {
    this.setState({ fontLoaded: true });
  }

  selectCategory = selectedCategory => {
    LayoutAnimation.easeInEaseOut();
    this.setState({
      selectedCategory,
      isLoading: false
    });
  };

  login = () => {
    const { email, password } = this.state;
    this.setState({ isLoading: true });

    const loginDetails = {
      email,
      password
    };

    this.props.login(loginDetails);
    // Simulate an API call
    // setTimeout(() => {
    //   LayoutAnimation.easeInEaseOut();
    //   this.setState({
    //     isLoading: false,
    //     isEmailValid: this.validateEmail(email) || this.emailInput.shake(),
    //     isPasswordValid: password.length >= 8 || this.passwordInput.shake()
    //   });
    // }, 1500);
  };

  signUp = () => {
    const { email, password, passwordConfirmation } = this.state;
    this.setState({ isLoading: true });
    // Simulate an API call
    setTimeout(() => {
      LayoutAnimation.easeInEaseOut();
      this.setState({
        isLoading: false,
        isEmailValid: this.validateEmail(email) || this.emailInput.shake(),
        isPasswordValid: password.length >= 8 || this.passwordInput.shake(),
        isConfirmationValid:
          password === passwordConfirmation || this.confirmationInput.shake()
      });
    }, 1500);
  };

  render() {
    const {
      selectedCategory,
      isLoading,
      isEmailValid,
      isPasswordValid,
      isConfirmationValid,
      email,
      password,
      passwordConfirmation
    } = this.state;
    const isLoginPage = selectedCategory === 0;
    const isSignUpPage = selectedCategory === 1;

    return (
      <View style={styles.container}>
        <ImageBackground source={BG_IMAGE} style={styles.bgImage}>
          {this.state.fontLoaded ? (
            <View>
              <KeyboardAvoidingView
                contentContainerStyle={styles.loginContainer}
                behavior='position'
              >
                <View style={styles.titleContainer}>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.titleText}>EVENTS+</Text>
                  </View>
                  <View style={{ marginTop: -10, marginLeft: 10 }}>
                    <Text style={styles.titleText}>MOBILE</Text>
                  </View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Button
                    disabled={isLoading}
                    type='clear'
                    activeOpacity={0.7}
                    onPress={() => this.selectCategory(0)}
                    containerStyle={{ flex: 1 }}
                    titleStyle={[
                      styles.categoryText,
                      isLoginPage && styles.selectedCategoryText
                    ]}
                    title={'Login'}
                  />
                  <Button
                    disabled={isLoading}
                    type='clear'
                    activeOpacity={0.7}
                    onPress={() => this.selectCategory(1)}
                    containerStyle={{ flex: 1 }}
                    titleStyle={[
                      styles.categoryText,
                      isSignUpPage && styles.selectedCategoryText
                    ]}
                    title={'Sign up'}
                  />
                </View>
                <View style={styles.rowSelector}>
                  <TabSelector selected={isLoginPage} />
                  <TabSelector selected={isSignUpPage} />
                </View>
                <View style={styles.formContainer}>
                  <Input
                    leftIcon={
                      <Icon
                        name='md-mail'
                        color='rgba(0, 0, 0, 0.38)'
                        size={25}
                        style={{ backgroundColor: 'transparent' }}
                      />
                    }
                    value={email}
                    keyboardAppearance='light'
                    autoFocus={false}
                    autoCapitalize='none'
                    autoCorrect={false}
                    keyboardType='email-address'
                    returnKeyType='next'
                    inputStyle={{ marginLeft: 10 }}
                    placeholder={'Email'}
                    containerStyle={{
                      borderBottomColor: 'rgba(0, 0, 0, 0.38)'
                    }}
                    ref={input => (this.emailInput = input)}
                    onSubmitEditing={() => this.passwordInput.focus()}
                    onChangeText={email => this.setState({ email })}
                    errorMessage={
                      isEmailValid ? null : 'Please enter a valid email address'
                    }
                  />
                  <Input
                    leftIcon={
                      <SimpleIcon
                        name='lock'
                        color='rgba(0, 0, 0, 0.38)'
                        size={25}
                        style={{ backgroundColor: 'transparent' }}
                      />
                    }
                    value={password}
                    keyboardAppearance='light'
                    autoCapitalize='none'
                    autoCorrect={false}
                    secureTextEntry={true}
                    returnKeyType={isSignUpPage ? 'next' : 'done'}
                    blurOnSubmit={true}
                    containerStyle={{
                      marginTop: 16,
                      borderBottomColor: 'rgba(0, 0, 0, 0.38)'
                    }}
                    inputStyle={{ marginLeft: 10 }}
                    placeholder={'Password'}
                    ref={input => (this.passwordInput = input)}
                    onSubmitEditing={() => isSignUpPage
                        ? this.confirmationInput.focus()
                        : this.login()
                    }
                    onChangeText={password => this.setState({ password })}
                    errorMessage={
                      isPasswordValid
                        ? null
                        : 'Please enter at least 8 characters'
                    }
                  />
                  {isSignUpPage && (
                    <Input
                      icon={
                        <SimpleIcon
                          name='lock'
                          color='rgba(0, 0, 0, 0.38)'
                          size={25}
                          style={{ backgroundColor: 'transparent' }}
                        />
                      }
                      value={passwordConfirmation}
                      secureTextEntry={true}
                      keyboardAppearance='light'
                      autoCapitalize='none'
                      autoCorrect={false}
                      keyboardType='default'
                      returnKeyType={'done'}
                      blurOnSubmit={true}
                      containerStyle={{
                        marginTop: 16,
                        borderBottomColor: 'rgba(0, 0, 0, 0.38)'
                      }}
                      inputStyle={{ marginLeft: 10 }}
                      placeholder={'Confirm password'}
                      ref={input => (this.confirmationInput = input)}
                      onSubmitEditing={this.signUp}
                      onChangeText={passwordConfirmation => this.setState({ passwordConfirmation })
                      }
                      errorMessage={
                        isConfirmationValid
                          ? null
                          : 'Please enter the same password'
                      }
                    />
                  )}
                  <Button
                    buttonStyle={styles.loginButton}
                    containerStyle={{ marginTop: 32, flex: 0 }}
                    activeOpacity={0.8}
                    title={isLoginPage ? 'LOGIN' : 'SIGN UP'}
                    onPress={isLoginPage ? this.login : this.signUp}
                    titleStyle={styles.loginTextButton}
                    loading={isLoading}
                    disabled={isLoading}
                  />
                  <Text>Or</Text>
                  {/* <View> */}
                  <GoogleSigninButton
                    style={{ width: 192, height: 48 }}
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Dark}
                    onPress={this._signIn}
                    disabled={this.state.isSigninInProgress}
                  />
                  {/* </View> */}
                </View>
              </KeyboardAvoidingView>
              <View style={styles.helpContainer}>
                <Button
                  title={'Need help ?'}
                  titleStyle={{ color: 'white' }}
                  buttonStyle={{ backgroundColor: 'transparent' }}
                  underlayColor='transparent'
                  onPress={() => this.props.login()}
                />
              </View>
            </View>
          ) : (
            <Text>Loading...</Text>
          )}
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  rowSelector: {
    height: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  selectorContainer: {
    flex: 1,
    alignItems: 'center'
  },
  selected: {
    position: 'absolute',
    borderRadius: 50,
    height: 0,
    width: 0,
    top: -5,
    borderRightWidth: 70,
    borderBottomWidth: 70,
    borderColor: 'white',
    backgroundColor: 'white'
  },
  loginContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  loginTextButton: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold'
  },
  loginButton: {
    backgroundColor: 'rgba(232, 147, 142, 1)',
    borderRadius: 10,
    height: 50,
    width: 200
  },
  titleContainer: {
    height: 150,
    backgroundColor: 'transparent',
    justifyContent: 'center'
  },
  formContainer: {
    backgroundColor: 'white',
    width: SCREEN_WIDTH - 30,
    borderRadius: 10,
    paddingTop: 32,
    paddingBottom: 32,
    alignItems: 'center'
  },
  loginText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white'
  },
  bgImage: {
    flex: 1,
    top: 0,
    left: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center'
  },
  categoryText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 24,
    fontFamily: 'light',
    backgroundColor: 'transparent',
    opacity: 0.54
  },
  selectedCategoryText: {
    opacity: 1
  },
  titleText: {
    color: 'white',
    fontSize: 30,
    fontFamily: 'regular'
  },
  helpContainer: {
    height: 64,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

AuthScreen.propTypes = {
  login: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
  token: PropTypes.string
};

const mapStateToProps = ({ auth }) => ({ token: auth.token });

export default connect(
  mapStateToProps,
  { login, register, googleSignIn }
)(AuthScreen);
