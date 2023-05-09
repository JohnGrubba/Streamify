import React from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";

const Main = ({ setActiveTab }: { setActiveTab: React.Dispatch<React.SetStateAction<string>> }) => {
    return (
        <ScrollView>
            <View style={styles.header}>
                <Image source={require("../static/logo.png")} style={styles.logo}></Image>
                <Text style={styles.title}>Welcome to Streamify</Text>
                <Text style={styles.subtitle}>Get the music you love, for free</Text>

            </View>
            <View style={styles.recentlyPlayed}>
                <Text style={styles.sectionTitle}>Recently Played</Text>
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
                <TouchableOpacity style={styles.songContainer} onPress={() => setActiveTab('Player')}>
                    <Image
                        style={styles.songImage}
                        source={{ uri: "https://i1.sndcdn.com/artworks-HpKm3lbkxQByw46m-YsaQog-t240x240.jpg" }}
                    />
                    <Text style={styles.songText}>Song 3</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    logo: {
        width: 128,
        height: 128,
        marginBottom: 16,
    },
    header: {
        alignItems: "center",
        paddingBottom: 16,
        marginBottom: 16
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