import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import NavigationBar from './components/NavBar';
import Main from './screens/Main';
import Search from './screens/Search';
import Library from './screens/Library';
import PlayerBar from './components/PlayerBar';
import Player from './screens/Player';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TrackPlayer, { Capability, Event, Track, AppKilledPlaybackBehavior } from 'react-native-track-player';

async function initializePlayer() {
  try {
    await TrackPlayer.setupPlayer();
  } catch {
    console.log("Player already initialized");
    return;
  }
  await TrackPlayer.reset();
  const history = (await AsyncStorage.getItem('history')) ? JSON.parse(await AsyncStorage.getItem('history') as string)[0] : [];
  await TrackPlayer.add(history);

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
    compactCapabilities: [
      Capability.Play,
      Capability.Pause,
      Capability.SkipToNext,
      Capability.SkipToPrevious,
    ],
    android: {
      appKilledPlaybackBehavior: AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
    },
  });
}

initializePlayer();


const App = () => {
  const [activeTab, setActiveTab] = useState('Home');
  const [currentTrack, setTrack] = useState<void | Track | null>(null);
  const [recommendations, setRecommendations] = useState<any[]>([]);

  function getUniqueListBy(arr: Array<Object>, key: string) {
    return [...new Map(arr.map(item => [item[key], item])).values()]
  }

  async function getRecommendations() {
    setRecommendations([]);
    var history = (await AsyncStorage.getItem('history')
      ? JSON.parse(await AsyncStorage.getItem('history') as string)
      : []);

    // Get one recommendation for every track in history
    var rcmds: Object[] = [];
    await Promise.allSettled(
      history.map(async (track: any) => {
        const response = await fetch("https://streamify.jjhost.tk/search", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: track.title,
          })
        });

        const data = await response.json();
        var rcmd = data.filter(
          (value: any) => value.id !== track.id && value.artist === track.artist && value.title !== track.title
        )[0];
        console.log(rcmd)
        if (rcmd) rcmds.push(rcmd)
      })
    );
    setRecommendations(getUniqueListBy(rcmds, "id"));
  }

  useEffect(() => {
    getRecommendations();
  }, []);

  TrackPlayer.addEventListener(Event.PlaybackTrackChanged, async (event) => {
    if (event.nextTrack != null) {
      const track = await TrackPlayer.getTrack(event.nextTrack);
      setTrack(track);
    }
  });

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        {activeTab === 'Home' ? (
          <Main setActiveTab={setActiveTab} recommendations={recommendations} />
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