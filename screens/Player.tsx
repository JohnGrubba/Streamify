import React, { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Slider from '@react-native-community/slider';
import Feather from 'react-native-vector-icons/Feather';

const Player = () => {
    const [progress, setProgress] = useState(0);

    return (
        <View style={styles.container}>
            <View style={styles.artworkContainer}>
                <Image
                    style={styles.artwork}
                    source={{ uri: "https://i1.sndcdn.com/artworks-2dn6bE12SwM8REHX-ohbJyg-t200x200.jpg" }}
                />
            </View>
            <Text style={styles.title}>Title of Song</Text>
            <Text style={styles.artists}>Artist 1, Artist 2</Text>
            <Slider
                style={styles.progress}
                value={progress}
                minimumValue={0}
                maximumValue={1}
                minimumTrackTintColor="#1db954"
                maximumTrackTintColor="#fff"
                thumbTintColor="#1db954"
                onValueChange={(value) => setProgress(value)}
            />
            <View style={styles.controls}>
                <Feather name="pause" size={35} style={{ color: "white" }} color="black" />
                <Text style={styles.controlButton}></Text>
                <Feather name="play" size={35} style={{ color: "white" }} color="black" />
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
        width: "100%",
        marginTop: 40,
    },
    controls: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "60%",
        marginTop: 40,
    },
    controlButton: {
        color: "#fff",
        fontSize: 24,
    },
});

export default Player;