import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import TrackPlayer, { State, usePlaybackState } from 'react-native-track-player';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const PauseButton = () => {
    const playbackState = usePlaybackState();
    return (
        <View style={styles.right}>
            {playbackState === State.Playing ? (
                <TouchableOpacity onPress={async () => TrackPlayer.pause()}>
                    <FontAwesome5 name="pause" size={25} color="white" />
                </TouchableOpacity>
            ) : (
                <TouchableOpacity onPress={async () => TrackPlayer.play()}>
                    <FontAwesome5 name="play" size={25} color="white" />
                </TouchableOpacity>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    right: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    }
});

export default PauseButton;