import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Slider from '@react-native-community/slider';
import Feather from 'react-native-vector-icons/Feather';
import TrackPlayer, { usePlaybackState, State, useProgress, Track } from 'react-native-track-player';

// format the time in minutes:seconds
const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const leadingZero = remainingSeconds < 10 ? '0' : '';
    return `${minutes}:${leadingZero}${remainingSeconds}`;
};

const Player = ({ currentTrack }: { currentTrack: void | Track | null }) => {
    const playbackState = usePlaybackState();
    const { position, duration } = useProgress();

    return (
        <View style={styles.container}>
            <View style={styles.artworkContainer}>
                <Image
                    style={styles.artwork}
                    source={{ uri: currentTrack?.artwork as string != null ? currentTrack?.artwork as string : "https://www.namepros.com/attachments/empty-png.89209/" }}
                />
            </View>
            <Text style={styles.title}>{currentTrack?.title}</Text>
            <Text style={styles.artists}>{currentTrack?.artist}</Text>
            <View style={styles.progressContainer}>
                <Text style={styles.progressText}>{formatTime(position)}</Text>
                <Slider
                    style={styles.progress}
                    value={position}
                    minimumValue={0}
                    maximumValue={duration}
                    minimumTrackTintColor="#1db954"
                    maximumTrackTintColor="#fff"
                    thumbTintColor="#1db954"
                    onValueChange={(value) => TrackPlayer.seekTo(value)}
                />
                <Text style={styles.progressText}>{formatTime(duration)}</Text>
            </View>
            <View style={styles.controls}>
                <TouchableOpacity onPress={async () => TrackPlayer.skipToPrevious()}>
                    <Feather name="skip-back" size={35} color="white" />
                </TouchableOpacity>

                {playbackState === State.Playing ? (
                    <TouchableOpacity onPress={async () => TrackPlayer.pause()}>
                        <Feather name="pause" size={35} color="white" />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity onPress={async () => TrackPlayer.play()}>
                        <Feather name="play" size={35} color="white" />
                    </TouchableOpacity>
                )}
                <TouchableOpacity onPress={async () => TrackPlayer.skipToNext()}>
                    <Feather name="skip-forward" size={35} color="white" />
                </TouchableOpacity>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 30,
        alignItems: "center",
        justifyContent: "space-between",
        height: "100%",
    },
    artworkContainer: {
        width: 280,
        height: 280,
        overflow: "hidden",
        borderRadius: 10
    },
    artwork: {
        flex: 1,
        width: undefined,
        height: undefined,
    },
    title: {
        color: "#fff",
        fontSize: 24,
        fontWeight: "bold",
        marginTop: 20,
    },
    artists: {
        color: "#fff",
        fontSize: 16,
        marginTop: 5,
    },
    progress: {
        flex: 1,
        marginHorizontal: 10,
    },
    controls: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "60%",
        marginTop: 40,
    },
    progressContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginTop: 40,
    },
    progressText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Player;