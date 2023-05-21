import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Track from '../components/Track';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Library = ({ setActiveTab }: { setActiveTab: React.Dispatch<React.SetStateAction<string>> }) => {
    const [tracks, setTracks] = useState<any[]>([]);

    useEffect(() => {
        const getTracks = async () => {
            try {
                const allKeys = await AsyncStorage.getAllKeys();
                const songKeys = allKeys.filter(key => key.startsWith("song_"));

                const trackPromises = songKeys.map(async key => {
                    const track = await AsyncStorage.getItem(key) as string;
                    return JSON.parse(track);
                });

                const trackData = await Promise.all(trackPromises);
                setTracks(trackData);
            } catch (error) {
                console.log("Error retrieving tracks from AsyncStorage:", error);
            }
        };

        getTracks();
    }, []);

    return (
        <View>
            <Text style={styles.text}>Cache</Text>
            {tracks.map(track => (
                <Track
                    key={track.id}
                    id={track.id}
                    setActiveTab={setActiveTab}
                    thumbnail={track.thumbnail}
                    title={track.title}
                    artist={track.artist}
                />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    text: {
        color: '#FFF',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16
    }
});

export default Library;
