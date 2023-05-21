import React, { useState, useEffect } from 'react';
import { StyleSheet, View, AppState } from 'react-native';
import NavigationBar from './components/NavBar';
import Main from './screens/Main';
import Search from './screens/Search';
import Library from './screens/Library';
import PlayerBar from './components/PlayerBar';
import Player from './screens/Player';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TrackPlayer, { Capability, Event, Track, AppKilledPlaybackBehavior } from 'react-native-track-player';

async function player() {
  try {
    await TrackPlayer.setupPlayer()
  }
  catch {
    console.log("Player already initialized");
  }

  await TrackPlayer.reset();
  TrackPlayer.updateOptions({
    // Media controls capabilities
    capabilities: [
      Capability.Play,
      Capability.Pause,
      Capability.SkipToNext,
      Capability.SkipToPrevious,
      Capability.Stop
    ],

    // Capabilities that will show up when the notification is in the compact form on Android
    compactCapabilities: [Capability.Play, Capability.Pause, Capability.SkipToNext, Capability.SkipToPrevious],
    android: {
      appKilledPlaybackBehavior: AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification
    }
  });
  console.log("Player initialized");
  var history = (await AsyncStorage.getItem('history') ? JSON.parse(await AsyncStorage.getItem('history') as string) : [])[0]
  await TrackPlayer.add(history);
  await TrackPlayer.pause();
}
player();

const App = () => {
  const [activeTab, setActiveTab] = useState('Home');
  const [currentTrack, setTrack] = useState<void | Track | null>(null);

  TrackPlayer.addEventListener(Event.PlaybackTrackChanged, async (event) => {
    if (event.nextTrack != null) {
      const track = await TrackPlayer.getTrack(event.nextTrack);
      setTrack(track);
    }
  });

  useEffect(() => {
    return () => {
      console.log("App Closed / Unmounting Track Player")
      TrackPlayer.reset();
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        {activeTab === 'Home' ? (
          <Main setActiveTab={setActiveTab} />
        ) : activeTab === 'Search' ? (
          <Search setActiveTab={setActiveTab} />
        ) : activeTab === "Library" ? (
          <Library setActiveTab={setActiveTab} />
        ) : activeTab === "Player" ? (
          <Player currentTrack={currentTrack} />
        ) : null}
      </View>
      <PlayerBar
        setActiveTab={setActiveTab}
        activeTab={activeTab}
        currentTrack={currentTrack}
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