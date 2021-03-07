import React, {useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {View, Text, FlatList, TouchableOpacity, Dimensions} from 'react-native';
import {useSpring, animated, config, useTransition} from 'react-spring/native';

function Tabs(props) {
  const {width, height, scale} = Dimensions.get('window');
  const positionRef = useRef();
  const [current, setCurrent] = useState(0);
  const [preIndex, setPreIndex] = useState(0);
  const AnimatedView = animated(View);
  const AnimatedText = animated(Text);
  const selectedViewState = useSpring({
    from: {marginLeft: 5, marginRight: 5},
    to: {borderBottomWidth: 2, borderBottomColor: 'blue'},
    config: config.default && {duration: 1000},
    reset: true,
  });
  const selectedTextState = useSpring({
    from: {
      opacity: 0.5,
      color: '#cecece',
      fontSize: 20,
      fontWeight: 'bold',
    },
    to: {
      color: 'red',
      opacity: 1,
      paddingBottom: 3,
    },
    config: config.default && {duration: 1000},
    reset: true,
  });
  const transitions = useTransition(current, (p) => p, {
    from: {
      opacity: 1,
      translateX: current < preIndex ? -width : width,
    },
    enter: {opacity: 1, translateX: 0},
    leave: {
      opacity: 0,
      translateX:  current < preIndex ? width : -width,
    },
  });
  const renderItem = ({item, index}) => {
    return (
      <View>
        {current === index && (
          <AnimatedView key={index} style={selectedViewState}>
            <TouchableOpacity
              onPress={() => {
                positionRef.current.scrollToIndex({
                  animated: true,
                  index: index,
                  viewPosition: 0.5,
                });
              }}>
              <AnimatedText style={selectedTextState}>
                {item.title}
              </AnimatedText>
            </TouchableOpacity>
          </AnimatedView>
        )}
        {current !== index && (
          <View style={{marginLeft: 5, marginRight: 5}}>
            <TouchableOpacity
              onPress={() => {
                setPreIndex(current);
                setCurrent(index);
                positionRef.current.scrollToIndex({
                  animated: true,
                  index: index,
                  viewPosition: 0.5,
                });
              }}>
              <Text
                style={{
                  opacity: 0.5,
                  color: '#cecece',
                  fontSize: 20,
                  fontWeight: 'bold',
                }}>
                {item.title}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };
  return (
    <View>
      <FlatList
        showsHorizontalScrollIndicator={false}
        ref={positionRef}
        renderItem={renderItem}
        data={props.data}
        horizontal={true}
        keyExtractor={(item, index) => index.toString()}
      />
      <View>
        {transitions.map(({item, props, key}) => {
          return (
            <AnimatedView style={props} key={key}>
              <View style={{position: 'absolute'}}>
                <Text>S</Text>
              </View>
            </AnimatedView>
          );
        })}
      </View>
    </View>
  );
}

Tabs.propTypes = {};

export default Tabs;
