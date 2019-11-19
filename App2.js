import React, { Component } from 'react';
import { Platform, StyleSheet, TouchableOpacity, Text, ScrollView, View } from 'react-native';
import I18n from './i18n';

// Enable fallbacks if you want `en-US`
// and `en-GB` to fallback to `en`
const language = [
      {lang: "English", code: "en"},
      {lang: "French", code: "fr"},
      {lang: "French Canada", code: "fr-CA"},
      {lang: "Spanish", code: "es"},
    ]

export default class extends Component {
  constructor() {
    super();
    this.state = {
      languages: [],
      value: false,
      langValue: "en",
      select: "Select Language",
    }
    this.onLanguage=this.onLanguage.bind(this);
  }
  componentWillMount() {
    //I18n.locale = "fr-CA";

    //*Change language of app according to mobile app*
    // console.log(this.state.languages)
    // getLanguages().then(languages => {
    //   console.log(languages)
    //   this.setState({ languages });
    // });
  }

  onSelectLanguage() {
    return(
      language.map((data, i)=>{
        return (
           <View key={i} style={styles.dropDownView}>
             <TouchableOpacity onPress={()=>this.onSelectedLang(data)}>
               <Text style={styles.dropDownText}>{data.lang}</Text>
             </TouchableOpacity>
           </View>
        )
      })
    )
  }

  onSelectedLang(text) {
    this.setState({
      value: false,
      select: text.lang,
    }),
    I18n.locale = text.code;
  }
  onLanguage() {
    this.setState({
      value: true,
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.mainTitle}>React-native langauge translation example</Text>
        <View style={styles.subContainer}>
          <View style={styles.block}>
            <Text style={styles.title}>Langauge Translation</Text>
            <Text style={styles.textStyle}>{I18n.t('hello world')}</Text>
            <Text style={styles.textStyle}>{I18n.t('thank you')}</Text>
            <Text style={styles.textStyle}>{I18n.t('Bye')}</Text>
          </View>
          <View>
            <TouchableOpacity onPress={this.onLanguage}>
              <View style={styles.buttonView}>
                <Text style={styles.buttontext}>{this.state.select}</Text>
              </View>
           </TouchableOpacity>
           <View>
            {(this.state.value) ? this.onSelectLanguage() : null}
           </View>
        </View>
     </View>
    </View>
   );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    padding: 24,
  },
  subContainer: {
    flexDirection: "row",
  },
  mainTitle: {
    color: "#3b5998",
    fontSize: 30,
    marginBottom: 20,
    fontWeight: "bold",
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
  },
  buttonView: {
    backgroundColor: "#3b5998",
    padding: 10,
  },
  block: {
    width: 230,
  },
  textStyle: {
    marginTop: 10,
  },
  buttontext: {
    color: "#fff",
  },
  dropDownView: {
    backgroundColor: "#8b9dc3",
    padding: 10,
  },
  dropDownText: {
    paddingTop: 2,
    color: "#fff",
  }
});


















// import React, { Component } from 'react';
// import I18n from 'react-native-i18n';
// import {
//   Platform,
//   StyleSheet,
//   Text,
//   View
// } from 'react-native';

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' +
//     'Cmd+D or shake for dev menu',
//   android: 'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });

// type Props = {};
// export default class App extends Component<Props> {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.welcome}>
//           {I18n.t("greeting")}
//         </Text>
//         <Text style={styles.instructions}>
//           {I18n.t("goodbye")}
//         </Text>
//         <Text style={styles.instructions}>
//           {instructions}
//         </Text>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });
// I18n.fallbacks = true;
// I18n.translations = {
//   en: {
//     greeting: 'hello',
//     goodbye: 'Bye'
//   },
//   es: {
//     greeting: 'hola',
//     goodbye: 'Adios'
//   },
//   fr: {
//     greeting: 'Bonjour',
//     goodbye: 'Au Revoir'
//   }
// }
