import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import TrackPlayer, { usePlaybackState, State, Track } from 'react-native-track-player';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


const PlayerBar = ({ currentTrack, setActiveTab, activeTab }: { currentTrack: void | Track | null, title: string, image: string, artist: string, setActiveTab: React.Dispatch<React.SetStateAction<string>>, activeTab: string }) => {
    const playbackState = usePlaybackState();
    return (
        <View>
            {activeTab !== 'Player' ? (
                <TouchableOpacity style={styles.container} onPress={() => setActiveTab('Player')}>
                    <Image source={{ uri: currentTrack?.artwork as string != null ? currentTrack?.artwork as string : "https://www.namepros.com/attachments/empty-png.89209/" }} style={styles.image} />
                    <View style={styles.details}>
                        <Text style={styles.title}>{currentTrack?.title}</Text>
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
        marginLeft: 16,
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
    right: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    }
});

export default PlayerBar;