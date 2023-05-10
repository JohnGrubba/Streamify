import React from "react";
import { Text, StyleSheet, Image, TouchableOpacity, View, Easing } from "react-native";
import TextTicker from 'react-native-text-ticker';
import TrackPlayer from 'react-native-track-player';

async function playTrack(id: string, thumbnail: string, title: string, artist: string, setActiveTab: React.Dispatch<React.SetStateAction<string>>) {
    // Fetch Streaming URL
    fetch("https://streamify.jjhost.tk/stream/" + id, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    }).then((res) => res.text()).then(async (data) => {
        console.log(data);
        let track = {
            title: title,
            artist: artist,
            url: data,
            artwork: thumbnail,
        };
        await TrackPlayer.reset();
        await TrackPlayer.add(track);
        await TrackPlayer.play();
        setActiveTab("Player");
    });
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
        marginBottom: 8,
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