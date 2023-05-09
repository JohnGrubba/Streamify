import React from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";

const Main = ({ setActiveTab }: { setActiveTab: React.Dispatch<React.SetStateAction<string>> }) => {
    return (
        <ScrollView>
            <View style={styles.header}>
                <Text style={styles.title}>Welcome to Streamify</Text>
                <Text style={styles.subtitle}>Get the music you love, for free</Text>
            </View>
            <View style={styles.recentlyPlayed}>
                <Text style={styles.sectionTitle}>Recently Played</Text>
                <View style={styles.songContainer}>
                    <Image
                        style={styles.songImage}
                        source={{ uri: "https://i1.sndcdn.com/artworks-HpKm3lbkxQByw46m-YsaQog-t240x240.jpg" }}
                    />
                    <Text style={styles.songText}>Song 1</Text>
                </View>
                <TouchableOpacity style={styles.songContainer} onPress={() => setActiveTab('Player')}>
                    <Image
                        style={styles.songImage}
                        source={{ uri: "https://i1.sndcdn.com/artworks-HpKm3lbkxQByw46m-YsaQog-t240x240.jpg" }}
                    />
                    <Text style={styles.songText}>Song 2</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.songContainer} onPress={() => setActiveTab('Player')}>
                    <Image
                        style={styles.songImage}
                        source={{ uri: "https://i1.sndcdn.com/artworks-HpKm3lbkxQByw46m-YsaQog-t240x240.jpg" }}
                    />
                    <Text style={styles.songText}>Song 3</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.recommendations}>
                <Text style={styles.sectionTitle}>Recommended for You</Text>
                <View style={styles.songContainer}>
                    <Image
                        style={styles.songImage}
                        source={{ uri: "https://i1.sndcdn.com/artworks-HpKm3lbkxQByw46m-YsaQog-t240x240.jpg" }}
                    />
                    <Text style={styles.songText}>Song 4</Text>
                </View>
                <View style={styles.songContainer}>
                    <Image
                        style={styles.songImage}
                        source={{ uri: "https://i1.sndcdn.com/artworks-HpKm3lbkxQByw46m-YsaQog-t240x240.jpg" }}
                    />
                    <Text style={styles.songText}>Song 5</Text>
                </View>
                <View style={styles.songContainer}>
                    <Image
                        style={styles.songImage}
                        source={{ uri: "https://i1.sndcdn.com/artworks-HpKm3lbkxQByw46m-YsaQog-t240x240.jpg" }}
                    />
                    <Text style={styles.songText}>Song 6</Text>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    header: {
        alignItems: "center",
        marginBottom: 32,
    },
    title: {
        color: "#FFF",
        fontSize: 36,
        fontWeight: "bold",
    },
    subtitle: {
        color: "#FFF",
        fontSize: 24,
        marginTop: 16,
    },
    recentlyPlayed: {
        marginBottom: 32,
    },
    recommendations: {},
    sectionTitle: {
        color: "#FFF",
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 16,
    },
    songContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
    },
    songImage: {
        width: 64,
        height: 64,
        marginRight: 16,
        borderRadius: 8,
    },
    songText: {
        color: "#FFF",
        fontSize: 18,
    },
});

export default Main;