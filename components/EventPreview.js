import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { like, unlike } from '../actions';

class EventPreview extends Component {
  render() {
    return (
      <View>
        <Card
          image={{
            uri: this.props.event.poster
          }}
          containerStyle={{ marginBottom: 10, height: 225 }}
          imageStyle={{ height: 100 }}
        >
          <View>
            <Icon
              containerStyle={{
                position: 'absolute',
                top: -135,
                right: -10
              }}
              raised
              name='close'
              type='font-awesome'
              color='#f50'
              size={15}
              onPress={() => this.props.onClosePreview()}
            />
            <Icon
              containerStyle={{
                position: 'absolute',
                top: -35,
                right: -10
              }}
              raised
              name='heart'
              type='font-awesome'
              color={this.props.event.liked ? 'red' : 'lightgrey'}
              size={15}
              onPress={() => {
                if (this.props.event.liked) {
                  this.props.unlike(this.props.event._id);
                } else {
                  this.props.like(this.props.event._id);
                }
              }}
            />
            <Text style={{ marginBottom: 5, fontSize: 14, fontWeight: 'bold' }}>
              {this.props.event.title}
            </Text>
            <Text style={{ marginBottom: 10, fontSize: 10 }}>
              {_.truncate(this.props.event.description, {
                length: 200,
                separator: ' '
              })}
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
                icon={<Icon name='date-range' color='#03A9F4' />}
                type='outline'
                buttonStyle={{ width: 140, height: 35 }}
                title='View Events'
                titleStyle={{ fontSize: 12, marginLeft: 5 }}
                onPress={() => this.props.openEventDetail()}
              />
              <Button
                icon={<Icon name='directions' color='#03A9F4' />}
                type='outline'
                buttonStyle={{ width: 140, height: 35 }}
                title='Get Directions'
                titleStyle={{ fontSize: 12, marginLeft: 5 }}
                onPress={() => this.props.getDirection(this.props.event)}
              />
            </View>
          </View>
        </Card>
      </View>
    );
  }
}

EventPreview.propTypes = {
  onClosePreview: PropTypes.func.isRequired,
  openEventDetail: PropTypes.func.isRequired,
  getDirection: PropTypes.func.isRequired,
  like: PropTypes.func.isRequired,
  unlike: PropTypes.func.isRequired,
  event: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  event: state.event.event || {}
});

export default connect(
  mapStateToProps,
  { like, unlike }
)(EventPreview);
