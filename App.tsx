import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import NavigationBar from './components/NavBar';
import Main from './screens/Main';
import Search from './screens/Search';
import Library from './screens/Library';
import PlayerBar from './components/PlayerBar';
import Player from './screens/Player';
import TrackPlayer, { Capability } from 'react-native-track-player';

const ex_track = {
  url: 'https://cdn.pixabay.com/audio/2023/05/07/audio_a614cb257b.mp3', // Load media from the file system
  title: 'Ice Age',
  artist: 'deadmau5',
  // Load artwork from the file system:
  artwork: 'https://i1.sndcdn.com/artworks-yVGSQ19zPpELip8j-rR6k8w-t200x200.jpg',
  duration: 411
};

async function player() {
  await TrackPlayer.setupPlayer().catch((e) => console.log(e));
  TrackPlayer.updateOptions({
    // Media controls capabilities
    capabilities: [
      Capability.Play,
      Capability.Pause,
      Capability.SkipToNext,
      Capability.SkipToPrevious,
      Capability.Stop,
    ],

    // Capabilities that will show up when the notification is in the compact form on Android
    compactCapabilities: [Capability.Play, Capability.Pause, Capability.SkipToNext, Capability.SkipToPrevious],
  });
  console.log("Player initialized")
  await TrackPlayer.add([ex_track])
  await TrackPlayer.pause();
}
player();

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