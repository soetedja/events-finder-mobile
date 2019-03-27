import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import moment from 'moment';

class EventPreview extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Card
          // title='HELLO WORLD'
          // image={Marker1}
          image={{
            uri: this.props.event.poster
            // 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-01.jpg'
          }}
          containerStyle={{ marginBottom: 10, height: 210 }}
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
            <Text
              style={{ marginBottom: 10, fontSize: 14, fontWeight: 'bold' }}
            >
              {this.props.event.title}
            </Text>
            <Text style={{ marginBottom: 10, fontSize: 10 }}>
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

export default EventPreview;
