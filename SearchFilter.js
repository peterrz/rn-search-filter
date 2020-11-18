'use strict'

import React ,{ Component} from 'react';
import {
Text,
View,
ScrollView,
TouchableOpacity,
StyleSheet
} from 'react-native';
import PropTypes from 'prop-types'

import {debounce} from 'lodash';

// the 'onPress' will be called with the corresponding 'options' String as the argument
// the first 'option' will be highlighted as the default selection

const propTypes = {
options: PropTypes.arrayOf(PropTypes.string).isRequired,
onPress: PropTypes.func.isRequired,
containerStyle: PropTypes.oneOfType([PropTypes.object,PropTypes.number]).isRequired,
buttonStyle: PropTypes.oneOfType([PropTypes.object,PropTypes.number]).isRequired,
inactivebuttonStyle: PropTypes.oneOfType([PropTypes.object,PropTypes.number]).isRequired,
showsHorizontalScrollIndicator: PropTypes.bool,
textStyle:PropTypes.oneOfType([PropTypes.object,PropTypes.number]).isRequired,
inactivetextStyle:PropTypes.oneOfType([PropTypes.object,PropTypes.number]).isRequired,
};

export default class SearchOptionBar extends Component {

constructor(props){
  super(props);
  this.state = {
    selectedTab: props.options[0],
  };
};

selectNewTab = (option) => {
  this.setState({ selectedTab: option });
};

render(){

  let _this = this;
  let { onPress, buttonStyle, containerStyle, textStyle ,inactivebuttonStyle, inactivetextStyle} = this.props

  let options = this.props.options.map( function(option,i){
    return(
      <TabOption
        key={ i }
        index={ i }
        option={ option }
        selectedTab={ _this.state.selectedTab }
        onPress={ onPress }
        selectNewTab={ _this.selectNewTab }
        buttonStyle={ buttonStyle }
        inactivebuttonStyle={ inactivebuttonStyle }
        inactivetextStyle= {inactivetextStyle}
        textStyle={ textStyle }
      />
    )
  });

  return(
    <View style ={ containerStyle }>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={this.props.showsHorizontalScrollIndicator}
        contentContainerStyle={{alignItems:'center'}}>
        {options}
      </ScrollView>
    </View>
  )
};
};

SearchOptionBar.propTypes = propTypes;

class TabOption extends React.Component {

constructor(props){
  super(props);
  this.handlePress = debounce(this.handlePress.bind(this),200,{leading:true} );
  this.state ={
    backgroundColor: StyleSheet.flatten(props.buttonStyle).backgroundColor,
    inactivebackground: StyleSheet.flatten(props.inactivebuttonStyle).backgroundColor,
    textColor: StyleSheet.flatten(props.textStyle).color,
    inactivetextColor: StyleSheet.flatten(props.inactivetextStyle).color,
  }
};

setBackgroundColor(){
  if (this.props.selectedTab === this.props.option) {
    return {backgroundColor: this.state.backgroundColor }
  } else {
    return { backgroundColor: this.state.inactivebackground }
  }
};

setTextColor(){
  if (this.props.selectedTab === this.props.option) {
    return {color: this.state.textColor }
  } else {
    return { color: this.state.inactivetextColor }
  }
};

handlePress(){
  let option = this.props.option;
  this.props.onPress(option);
  this.props.selectNewTab(option);
};

render(){
  let { buttonStyle, textStyle, option,} = this.props
  return(
    <View style={{paddingHorizontal: 4}}>
      <TouchableOpacity
        onPress={this.handlePress}
        style={[{
          alignItems: 'center',
          justifyContent: 'center',
        },buttonStyle,this.setBackgroundColor()]}>
        <Text style={[textStyle,this.setTextColor()]} numberOfLines={1}>
          {option}
        </Text>
      </TouchableOpacity>
    </View>
  )
};
};
