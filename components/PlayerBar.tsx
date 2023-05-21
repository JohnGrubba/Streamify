import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Easing } from 'react-native';
import TrackPlayer, { usePlaybackState, State, Track } from 'react-native-track-player';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import TextTicker from 'react-native-text-ticker';


const PlayerBar = ({ currentTrack, setActiveTab, activeTab }: { currentTrack: void | Track | null, setActiveTab: React.Dispatch<React.SetStateAction<string>>, activeTab: string }) => {
    const playbackState = usePlaybackState();
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
    },
    image: {
        width: 46,
        height: 46,
        borderRadius: 4,
    },
    details: {
        marginHorizontal: 16
    },
    title: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4
    },
    artist: {
        color: '#ccc',
        fontSize: 14,
    },
    right: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    txt: {
        width: 250
    }
});

export default PlayerBar;