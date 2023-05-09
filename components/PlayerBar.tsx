import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import TrackPlayer, { usePlaybackState, State, useProgress } from 'react-native-track-player';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


const PlayerBar = ({ title, image, artist, setActiveTab, activeTab }: { title: string, image: string, artist: string, setActiveTab: React.Dispatch<React.SetStateAction<string>>, activeTab: string }) => {
    const playbackState = usePlaybackState();
    return (
        <View>
            {activeTab !== 'Player' ? (
                <TouchableOpacity style={styles.container} onPress={() => setActiveTab('Player')}>
                    <Image source={{ uri: image }} style={styles.image} />
                    <View style={styles.details}>
                        <Text style={styles.title}>{title}</Text>
                        <Text style={styles.artist}>{artist}</Text>
                    </View>
                    <View style={styles.right}>
                        {playbackState === State.Playing ? (
                            <TouchableOpacity onPress={TrackPlayer.pause}>
                                <FontAwesome5 name="pause" size={25} color="white" />
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity onPress={TrackPlayer.play}>
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