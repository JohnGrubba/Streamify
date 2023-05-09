import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import NavigationBar from './components/NavBar';
import Main from './screens/Main';
import Search from './screens/Search';
import Library from './screens/Library';
import PlayerBar from './components/PlayerBar';
import Player from './screens/Player';

const App = () => {
  const [activeTab, setActiveTab] = useState('Home');

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        {activeTab === 'Home' ? (
          <Main setActiveTab={setActiveTab} />
        ) : activeTab === 'Search' ? (
          <Search />
        ) : activeTab === "Library" ? (
          <Library />
        ) : activeTab === "Player" ? (
          <Player />
        ) : null}
      </View>
      <PlayerBar
        title="Song Title"
        artist="Artist Name"
        image="https://i1.sndcdn.com/artworks-yVGSQ19zPpELip8j-rR6k8w-t200x200.jpg"
        setActiveTab={setActiveTab}
        activeTab={activeTab}
      />
      <NavigationBar setActiveTab={setActiveTab} activeTab={activeTab} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  text: {
    color: '#FFF',
  },
  main: {
    flex: 1,
    backgroundColor: "#121212",
    paddingHorizontal: 16,
    paddingTop: 48,
  }
});

export default App;