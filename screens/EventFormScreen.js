import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { GoogleAutoComplete } from 'react-native-google-autocomplete';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';

import LocationItem from '../components/LocationItem';
import { GMAPS_API_KEY } from '../config/key';
import { createEvent } from '../actions';

class EventFormScreen extends Component {
  static navigationOptions = {
    title: 'Post a new Event'
  };

  constructor(props) {
    super(props);
    this.state = {
      title: 'React Native Meetup',
      description: 'Feel free to join. Free snack available!',
      location: '',
      formatted_address: '',
      icon: '',
      url: '',
      startDateView: '',
      endDateView: ''
    };
  }

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.event) {
      return { event: nextProps.event };
    }

    return null;
  }

  componentDidUpdate() {
    if (this.props.event._id) {
      // Perform some operation here
      this.props.navigation.navigate('Map');
    }
  }

  showStartDateTimePicker = () => this.setState({ startDateTimePickerVisible: true });

  showEndDateTimePicker = () => this.setState({ endDateTimePickerVisible: true });

  hideStartDateTimePicker = () => this.setState({ startDateTimePickerVisible: false });

  hideEndDateTimePicker = () => this.setState({ endDateTimePickerVisible: false });

  handleStartDatePicked = start => {
    this.setState({
      start,
      startDateView: this.toLocalDateString(start)
    });
    this.hideStartDateTimePicker();
  };

  handleEndDatePicked = end => {
    this.setState({
      end,
      endDateView: this.toLocalDateString(end)
    });
    this.hideStartDateTimePicker();
  };

  toLocalDateString = date => moment(date).format('LLL');

  onSelectLoc = res => {
    this.setState({
      location: res.name,
      formatted_address: res.formatted_address,
      icon: res.icon,
      url: res.url,
      lat: res.geometry.location.lat,
      lng: res.geometry.location.lng
    });
  };

  createEvent = () => {
    this.setState({ isLoading: true });

    const newEvent = {};

    Object.assign(newEvent, this.state);

    this.props.createEvent(newEvent);
  };

  renderLocationField = () => {
    if (this.state.location) {
      return (
        <Input
          label='Selected Location'
          placeholder=''
          editable={false}
          containerStyle={{ marginBottom: 15 }}
          errorStyle={{ color: 'red' }}
          value={this.state.location}
          errorMessage=''
        />
      );
    }

    return (
      <GoogleAutoComplete
        apiKey={GMAPS_API_KEY}
        debounce={500}
        minLength={3}
        queryTypes='establishment'
      >
        {({
          handleTextChange,
          locationResults,
          fetchDetails,
          isSearching,
          inputValue
        }) => (
          <React.Fragment>
            {/* <View style={styles.inputWrapper}> */}
            <Input
              label='Search Location'
              style={styles.textInput}
              placeholder='Search a places'
              onChangeText={handleTextChange}
              value={inputValue}
              containerStyle={{ marginBottom: 15 }}
              errorStyle={{ color: 'red' }}
              errorMessage=''
            />
            {/* <Button title='Clear' onPress={clearSearchs} /> */}
            {/* </View> */}
            {isSearching && <ActivityIndicator size='large' color='red' />}
            <ScrollView style={{ marginTop: -15 }}>
              {locationResults.map((el, id) => (
                <LocationItem
                  {...el}
                  key={`${el.place_id}${id}`}
                  fetchDetails={fetchDetails}
                  onSelectLoc={this.onSelectLoc}
                />
              ))}
            </ScrollView>
          </React.Fragment>
        )}
      </GoogleAutoComplete>
    );
  };

  render() {
    return (
      <ScrollView style={{ paddingTop: 10 }}>
        {/* <Header
          centerComponent={{
            text: 'Post a New Event',
            style: { color: '#fff' }
          }}
          containerStyle={{ marginTop: -25 }}
        /> */}
        <Input
          label='Title'
          value={this.state.title}
          placeholder='Enter title'
          onChangeText={title => this.setState({ title })}
          containerStyle={{ marginBottom: 15 }}
          errorStyle={{ color: 'red' }}
          errorMessage=''
        />
        <Input
          multiline
          label='Description'
          value={this.state.description}
          onChangeText={description => this.setState({ description })}
          placeholder='Enter description'
          containerStyle={{ marginBottom: 15 }}
          errorStyle={{ color: 'red' }}
          errorMessage=''
        />
        <Input
          label='Start Date'
          placeholder='Start Date'
          value={this.state.startDateView}
          onFocus={this.showStartDateTimePicker}
          containerStyle={{ marginBottom: 15 }}
          rightIcon={
            <TouchableOpacity onPress={this.showStartDateTimePicker}>
              <Icon
                name='calendar-o'
                color='rgba(0, 0, 0, 0.38)'
                size={25}
                style={{ backgroundColor: 'transparent' }}
              />
            </TouchableOpacity>
          }
        />
        <Input
          label='End Date'
          placeholder='End Date'
          value={this.state.endDateView}
          onFocus={this.showEndDateTimePicker}
          containerStyle={{ marginBottom: 15 }}
          rightIcon={
            <TouchableOpacity onPress={this.showEndDateTimePicker}>
              <Icon
                name='calendar-o'
                color='rgba(0, 0, 0, 0.38)'
                size={25}
                style={{ backgroundColor: 'transparent' }}
              />
            </TouchableOpacity>
          }
        />
        <DateTimePicker
          isVisible={this.state.startDateTimePickerVisible}
          onConfirm={this.handleStartDatePicked}
          onCancel={this.hideStartDateTimePicker}
          mode='datetime'
        />
        <DateTimePicker
          isVisible={this.state.endDateTimePickerVisible}
          onConfirm={this.handleEndDatePicked}
          onCancel={this.hideEndDateTimePicker}
          mode='datetime'
        />
        {this.renderLocationField()}
        <Button
          title='Submit'
          buttonStyle={styles.submit}
          onPress={this.createEvent}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textInput: {
    height: 40,
    width: 300,
    borderWidth: 1,
    paddingHorizontal: 16
  },
  inputWrapper: {
    marginTop: 80,
    flexDirection: 'row'
  },
  submit: {
    margin: 20
  }
});

EventFormScreen.propTypes = {
  createEvent: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
  event: PropTypes.object
};
const mapStateToProps = state => ({
  event: state.event.event
});

export default connect(
  mapStateToProps,
  { createEvent }
)(EventFormScreen);
