
import React, {Component} from 'react';
import {Image, StyleSheet, Text, View,FlatList, Button} from 'react-native';

export default class Home extends Component { 
  constructor() {
    super();
    this.state = {
      demoList:[],
      ascending : true
    }
  }

  componentDidMount() {
    fetch('https://raw.githubusercontent.com/RyanHemrick/star_wars_movie_app/master/movies.json')
      .then((response) => response.json())
      .then((json) => {
        this.setState({ demoList: json.movies });
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }
  sortListEpisodeNumber(){
     if(this.state.ascending === true){
      this.state.demoList.sort(function(a, b) {
      return b.episode_number - a.episode_number;
      });
      }
     else{
      this.state.demoList.sort(function(a, b) {
      return a.episode_number - b.episode_number;
      });
      }
      this.setState(previousState => (
        { demoList: previousState.demoList},
        { ascending: !this.state.ascending}
      ))      
  }

  render() {
    let Image_Http_URL = { uri: 'https://raw.githubusercontent.com/RyanHemrick/star_wars_movie_app/master/public/images/star_wars_episode_1_poster.png'};
    return (     
        <View  style={{alignItems:'center'}}>
          <FlatList
          data={ this.state.demoList }
          extraData={this.state}//rerender when the state changes.
          renderItem={({item}) =>             
              <View style={{flexDirection:'row'}}>
                <Image source={Image_Http_URL} style = {{height: 20, width : 15, margin: 20 }}/>
                <Text style={{fontSize:20, margin: 15}}>{item.episode_number}</Text>
                <Text style={{fontSize:20, margin: 15}}>{item.title}</Text>
              </View>            
          }
          />
          <View>
            <Button
              title="Sort Movies"
              onPress={() => this.sortListEpisodeNumber()}
            />
          </View>
        </View> 
       
    );
  }
}
 

