import React from "react";
import { Text, StyleSheet, Image, TouchableOpacity, View, Easing } from "react-native";
import TextTicker from 'react-native-text-ticker';
import TrackPlayer from 'react-native-track-player';
import AsyncStorage from '@react-native-async-storage/async-storage';

async function playTrack(id: string, thumbnail: string, title: string, artist: string, setActiveTab: React.Dispatch<React.SetStateAction<string>>) {
    // Fetch Streaming URL
    let track = {
        id: id,
        title: title,
        artist: artist,
        url: "https://streamify.jjhost.tk/stream/" + id,
        artwork: thumbnail,
    };
    await TrackPlayer.reset();
    await TrackPlayer.add(track);
    await TrackPlayer.play();
    setActiveTab("Player");
    // Add Track to recently played tracks
    var history = (await AsyncStorage.getItem('history') ? JSON.parse(await AsyncStorage.getItem('history') as string) : []) as any[];
    var new_thingy = [track, ...history.slice(0, 5)];
    new_thingy = new_thingy.filter((value, index, self) =>
        index === self.findIndex((t) => (
            t.id === value.id
        ))
    )
    try {
        await AsyncStorage.setItem('history', JSON.stringify(new_thingy))
    } catch (e) {
        // saving error
    }
}

const Track = ({ id, thumbnail, title, artist, setActiveTab }: { id: string, thumbnail: string, title: string, artist: string, setActiveTab: React.Dispatch<React.SetStateAction<string>> }) => {
    return (
        <TouchableOpacity style={styles.songContainer} onPress={async () => await playTrack(id, thumbnail, title, artist, setActiveTab)}>
            <Image
                style={styles.songImage}
                source={{ uri: thumbnail }}
            />
            <View>
                <TextTicker scrollSpeed={10} loop numberOfLines={1} animationType="bounce" easing={Easing.linear} bounceDelay={1000}>
                    <Text style={styles.songText}>{title}</Text>
                </TextTicker>
                <Text style={styles.artist}>{artist}</Text>
            </View>
        </TouchableOpacity >
    )
}

const styles = StyleSheet.create({
    songContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8
    },
    songImage: {
        width: 64,
        height: 64,
        marginRight: 16,
        borderRadius: 8,
    },
    songText: {
        color: "#FFF",
        fontSize: 16
    },
    artist: {
        color: "#BBB",
        fontSize: 14
    }
});

export default Track;