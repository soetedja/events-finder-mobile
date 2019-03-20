import React from 'react';
import { View, StyleSheet, SectionList, TouchableOpacity } from 'react-native';
import { ListItem, Divider, SearchBar } from 'react-native-elements';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { logout } from '../actions';

const ORANGE = '#FF9500';
const BLUE = '#007AFF';
const GREEN = '#4CD964';
const RED = '#FF3B30';
const GREY = '#8E8E93';
const PURPLE = '#5856D6';
const TEAL_BLUE = '#5AC8FA';

const sections = [
  {
    data: [
      {
        title: 'General',
        icon: 'ios-settings',
        backgroundColor: BLUE
      },
      {
        title: 'Logout',
        backgroundColor: GREY,
        icon: 'ios-log-out',
        hideChevron: true
      }
    ]
  }
];

class SettingScreen extends React.PureComponent {
  state = {
    token: ''
  };

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.token) {
      return { token: nextProps.token };
    }

    return null;
  }

  componentDidUpdate() {
    if (!this.props.token) {
      // Perform some operation here
      this.props.navigation.navigate('Auth');
    }
  }

  logout = () => {
    this.props.logout();
  };

  renderItem = ({
    item: {
      title,
      backgroundColor,
      icon,
      rightTitle,
      hideChevron,
      checkbox,
      onPressed
    }
  }) => (
    <TouchableOpacity onPress={onPressed}>
      <ListItem
        containerStyle={{ paddingVertical: 8 }}
        switch={checkbox && { value: true }}
        key={title}
        chevron={!hideChevron}
        rightTitle={rightTitle}
        leftIcon={{
          type: 'ionicon',
          name: icon,
          size: 20,
          color: 'white',
          containerStyle: {
            backgroundColor,
            width: 28,
            height: 28,
            borderRadius: 6,
            alignItems: 'center',
            justifyContent: 'center'
          }
        }}
        title={title}
      />
    </TouchableOpacity>
  );

  renderSectionHeader = () => <View style={styles.headerSection} />;

  ItemSeparatorComponent = () => (
    <View style={styles.separatorComponent}>
      <Divider style={styles.separator} />
    </View>
  );

  ListHeaderComponent = () => (
    <View>
      <SearchBar platform='ios' placeholder='Search' />
      <Divider />
    </View>
  );

  keyExtractor = (item, index) => index;

  render() {
    return (
      <View>
        <SearchBar platform='ios' placeholder='Search' />
        <Divider />
        <TouchableOpacity onPress={this.logout}>
          <ListItem
            containerStyle={{ paddingVertical: 8 }}
            key='Logout'
            chevron={true}
            leftIcon={{
              type: 'ionicon',
              name: 'ios-log-out',
              size: 20,
              color: 'white',
              containerStyle: {
                backgroundColor: GREY,
                width: 28,
                height: 28,
                borderRadius: 6,
                alignItems: 'center',
                justifyContent: 'center'
              }
            }}
            title='Logout'
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EFEFF4'
  },
  separatorComponent: {
    backgroundColor: 'white'
  },
  separator: {
    marginLeft: 58
  },
  headerSection: {
    height: 30
  }
});

SettingScreen.propTypes = {
  logout: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
  token: PropTypes.string
};

const mapStateToProps = ({ auth }) => ({ token: auth.token });

export default connect(
  mapStateToProps,
  { logout }
)(SettingScreen);
