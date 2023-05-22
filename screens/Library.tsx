import React, { useState, useCallback, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from "react-native";
import Track from '../components/Track';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Feather from 'react-native-vector-icons/Feather';

const Library = ({ setActiveTab }: { setActiveTab: React.Dispatch<React.SetStateAction<string>> }) => {
    const [tracks, setTracks] = useState<any[]>([]);
    const [searchedTracks, setSearchedTracks] = useState<any[]>([]);

    function search(query: string) {
        console.log(query);
        if (query == "" || query == null) {
            setSearchedTracks(tracks);
            return;
        }
        const filteredTracks = tracks.filter(track => track.title.toLowerCase().includes(query.toLowerCase()) || track.artist.toLowerCase().includes(query.toLowerCase()));
        setSearchedTracks(filteredTracks);
    }

    const update = useCallback(async () => {
        try {
            const allKeys = await AsyncStorage.getAllKeys();
            const songKeys = allKeys.filter(key => key.startsWith("song_"));

            const trackPromises = songKeys.map(async key => {
                const track = await AsyncStorage.getItem(key) as string;
                return JSON.parse(track);
            });

            const trackData = await Promise.all(trackPromises);
            setTracks(trackData);
            setSearchedTracks(trackData);
        } catch (error) {
            console.log("Error retrieving tracks from AsyncStorage:", error);
        }
    }, []);

    useEffect(() => {
        update();
    }, [update]);

    return (
        <View style={{ height: "100%" }}>
            <View style={styles.inline}>
                <Text style={styles.text}>Cache</Text>
                <TouchableOpacity onPress={async () => update()}>
                    <Feather name="refresh-ccw" size={25} color="white" />
                </TouchableOpacity>
            </View>

            <View style={styles.searchContainer}>
                <TextInput
                    placeholder="Search cache..."
                    style={styles.searchInput}
                    placeholderTextColor={'#888'}
                    onChangeText={async (event) => search(event)}
                />
            </View>
            <ScrollView>
                {searchedTracks.map(track => (
                    <Track
                        key={track.id}
                        id={track.id}
                        setActiveTab={setActiveTab}
                        thumbnail={track.thumbnail}
                        title={track.title}
                        artist={track.artist}
                    />
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    text: {
        color: '#FFF',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10
    },
    searchContainer: {
        height: 60,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        marginBottom: 16
    },
    searchInput: {
        flex: 1,
        height: 40,
        backgroundColor: "#282828",
        borderRadius: 20,
        paddingHorizontal: 20,
        color: "#ffff",
        fontSize: 16,
        marginRight: 10,
    },
    inline: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "baseline",
        marginRight: 15
    }
});

export default Library;
