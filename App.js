import React from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

export default class App extends React.Component {
  state = {
    text: '',
    radio: 0,
    capitalize: false,
    multiline: false
  }
  onChangeText(text) {
    let newText = text;
    let wasTextAdded = text.length > this.state.text.length;
    let cursorAtEnd = this.state.selection && (this.state.selection.end >= (text.length - 1))

    if (wasTextAdded && cursorAtEnd) {

      if (this.state.radio === 5) { // Change last char
        newText = text.substr(0, text.length - 1) + text[text.length - 1].toUpperCase();
      }

      if (this.state.radio === 4) { // Change first char
        newText = getChar().toUpperCase() + text.substr(1);
      }

      if (this.state.radio === 3) { // Append first char
        newText = getChar() + text;
      }

      if (this.state.radio === 2) { // Toggle case
        let lastChar = text[text.length - 1];
        if (lastChar === ' ') {
          this.setState({capitalize: !this.state.capitalize});
        }
      } else if (this.state.capitalize) {
        this.setState({capitalize: false});
      }

      if (this.state.radio === 1) { // Calculate Pi
        this.setState({pi: calculatePi(1000000)});
      }
    }

    this.setState({text: newText});
  }
  onSelectionChange(selection) {
    this.setState({selection: selection});
  }

  render() {
    return (
      <View style={styles.container}>

        <TextInput
          multiline={this.state.multiline}
          style={{width: '100%', height: '90%', textAlignVertical: 'top'}}
          ref={(input) => this.input = input}
          value={this.state.text ? this.state.text : ''}
          onChangeText={(text) => this.onChangeText(text)}
          onSelectionChange={(event) => this.onSelectionChange(event.nativeEvent.selection)}
          autoCapitalize={this.state.capitalize ? 'words' : 'sentences'}
          placeholder="Type here"/>

        <View style={{position: 'absolute', bottom: 0, width: '100%', margin: 5}}>
          <RadioForm
            radio_props={radioProps}
            initial={this.state.radio}
            ref={(radio) => this.radio = radio}
            onPress={(value) => {
              this.setState({radio: value}); 
            }}
          />
          <Button
            onPress={() => this.input && this.input.clear()}
            title='Clear'
          />
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    margin: 20,
    marginTop: 50,
    justifyContent: 'center',
  },
});

const radioProps = [
  {label: 'None', value: 0 },
  {label: 'Calculate Pi', value: 1 },
  {label: 'Toggle case', value: 2 },
  {label: 'Append first char', value: 3 },
  {label: 'Change first char', value: 4 },
  {label: 'Capitalize last char', value: 5 },
];

const letters = 'abcdefghijklmnopqrstuvwxyz';

function getChar() {
  return letters[Math.floor(Math.random() * letters.length)];
}

function calculatePi(accuracy) {
  var r = 5;
  var points_total = 0;
  var points_inside = 0;

  while (points_total++ < accuracy) {
    var x = Math.random() * r * 2 - r;
    var y = Math.random() * r * 2 - r;
    
    if (Math.pow(x, 2) + Math.pow(y, 2) < Math.pow(r, 2))
      points_inside++;

  }
  return (4 * points_inside / points_total);
}