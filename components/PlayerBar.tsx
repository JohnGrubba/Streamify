import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Easing } from 'react-native';
import { Track } from 'react-native-track-player';
import TextTicker from 'react-native-text-ticker';
import ProgressBar from './helpers/Progress';
import PauseButton from './helpers/PauseButton';

const PlayerBar = ({ currentTrack, setActiveTab, activeTab }: { currentTrack: void | Track | null, setActiveTab: React.Dispatch<React.SetStateAction<string>>, activeTab: string }) => {
    return (
        <View>
            {activeTab !== 'Player' ? (
                <TouchableOpacity style={styles.container} onPress={() => setActiveTab('Player')}>
                    <Image source={{ uri: currentTrack?.artwork as string != null ? currentTrack?.artwork as string : "https://www.namepros.com/attachments/empty-png.89209/" }} style={styles.image} />
                    <View style={styles.details}>
                        <TextTicker scrollSpeed={10} loop numberOfLines={1} animationType="bounce" easing={Easing.linear} bounceDelay={1000} style={styles.txt}>
                            <Text style={styles.title}>{currentTrack?.title}</Text>
                        </TextTicker>
                        <Text style={styles.artist}>{currentTrack?.artist}</Text>
                    </View>
                    <PauseButton />
                    <ProgressBar />
                </TouchableOpacity>
            ) : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#333',
        height: 60,
        paddingHorizontal: 16,
        position: 'relative',
        borderRadius: 5
    },
    image: {
        width: 46,
        height: 46,
        borderRadius: 4,
    },
    details: {
        marginHorizontal: 16,
    },
    title: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    artist: {
        color: '#ccc',
        fontSize: 14,
    },
    txt: {
        width: 250,
    },
    right: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
});

export default PlayerBar;
