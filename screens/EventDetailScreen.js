import React, { Component } from 'react';
import {
  ScrollView,
  View,
  Text,
  Dimensions,
  StyleSheet,
  Linking,
  SafeAreaView,
  Image
} from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import Colors from '../constants/Colors';

const SCREEN_WIDTH = Dimensions.get('window').width;
const IMAGE_SIZE = SCREEN_WIDTH - 80;
class EventDetailScreen extends Component {
  getDirection = () => {
    Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${
        this.props.event.location.lat
      },${this.props.event.location.lng}`);
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            flex: 1
            // , backgroundColor: 'rgba(47,44,60,1)'
          }}
        >
          <View style={styles.navBar}>
            <Text style={styles.nameHeader}>{this.props.event.title}</Text>
          </View>
          <ScrollView>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Image
                source={{
                  uri: this.props.event.poster
                }}
                style={{
                  width: IMAGE_SIZE,
                  height: IMAGE_SIZE,
                  borderRadius: 0,
                  marginTop: 10
                }}
              />
            </View>

            <View
              style={{
                flex: 1,
                marginTop: 20,
                width: SCREEN_WIDTH - 80,
                marginLeft: 40
              }}
            >
              <Text
                style={{
                  flex: 1,
                  fontSize: 15,
                  color: Colors.tintColor,
                  fontFamily: 'regular'
                }}
              >
                {this.props.event.description}
              </Text>
            </View>
            <View style={{ flex: 1, marginTop: 30 }}>
              <Text
                style={{
                  flex: 1,
                  fontSize: 15,
                  color: 'rgba(216, 121, 112, 1)',
                  fontFamily: 'regular',
                  marginLeft: 40
                }}
              >
                INFO
              </Text>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  marginTop: 20,
                  marginHorizontal: 30
                }}
              >
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <View style={{ flex: 0.5 }}>
                    <Text style={styles.infoTypeLabel}>Start</Text>
                    <Text style={styles.infoTypeLabel}>End</Text>
                    <Text style={styles.infoTypeLabel}>Location</Text>
                  </View>
                  <View style={{ flex: 1, marginLeft: 10 }}>
                    <Text style={styles.infoAnswerLabel}>
                      {moment(this.props.event.start).format('LLL')}
                    </Text>
                    <Text style={styles.infoAnswerLabel}>
                      {moment(this.props.event.end).format('LLL')}
                    </Text>
                    <Text style={styles.infoAnswerLabel}>
                      {this.props.event.location.name}
                      {', '}
                      {this.props.event.location.formatted_address}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            {/* <Card
            image={{
              uri: this.props.event.poster
            }}
            imageProps={{ resizeMode: 'center' }}
            containerStyle={{ width: SCREEN_WIDTH, margin: 0 }}
          >
            <Text
              style={{
                marginBottom: 10,
                fontWeight: 'bold',
                textAlign: 'center'
              }}
            >
              {this.props.event.title}
            </Text>
            <View style={styles.dateContainer}>
              <View>
                <Text style={{ fontWeight: 'bold' }}>Start</Text>
                <Text>{moment(this.props.event.start).format('LLL')}</Text>
              </View>
              <View>
                <Text style={{ fontWeight: 'bold' }}>End</Text>
                <Text>{moment(this.props.event.end).format('LLL')}</Text>
              </View>
            </View>

            <Text style={styles.label}>Location</Text>
            <Text style={{ marginBottom: 10 }}>
              {this.props.event.location.name}
              {', '}
              {this.props.event.location.formatted_address}
            </Text>

            <Text style={styles.label}>Description</Text>
            <Text style={{ marginBottom: 10 }}>
              {this.props.event.description}
            </Text>
            <View
              style={{
                flex: 1,
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'stretch'
              }}
            >
              <Button
                icon={<Icon name='edit' color='#fff' size={15} />}
                buttonStyle={{ width: 150, height: 35 }}
                title='Register'
                titleStyle={{ fontSize: 12, marginLeft: 5 }}
                onPress={() => console.log('register')}
              />
              <Button
                icon={<Icon name='directions' color='#fff' size={15} />}
                buttonStyle={{ width: 150, height: 35 }}
                title='Get Directions'
                titleStyle={{ fontSize: 12, marginLeft: 5 }}
                onPress={() => this.getDirection()}
              />
            </View>
          </Card> */}
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  navBar: {
    height: 50,
    width: SCREEN_WIDTH,
    justifyContent: 'center',
    alignContent: 'center'
  },
  nameHeader: {
    color: Colors.lightTintColor,
    fontSize: 13,
    textAlign: 'center'
  },
  infoTypeLabel: {
    fontSize: 15,
    textAlign: 'left',
    color: 'rgba(126,123,138,1)',
    fontFamily: 'regular',
    paddingBottom: 10
  },
  infoAnswerLabel: {
    fontSize: 15,
    color: Colors.tintColor,
    fontFamily: 'regular',
    paddingBottom: 10
  }
});

const mapStateToProps = state => ({
  event: state.event.event || {}
});

export default connect(mapStateToProps)(EventDetailScreen);
