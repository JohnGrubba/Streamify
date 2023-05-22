import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useProgress } from 'react-native-track-player';

const ProgressBar = () => {
    const { position, duration } = useProgress();
    return (
        <View style={styles.progressBarContainer}>
            <View style={[styles.progressBar, { width: `${duration != 0 ? (position / duration) * 100 : 0}%` }]} />
        </View>
    )
}

const styles = StyleSheet.create({
    progressBarContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 2
    },
    progressBar: {
        height: '100%',
        backgroundColor: '#1ED760',
    }
});

export default ProgressBar;