import React, { useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import Track from '../components/Track';
import AsyncStorage from '@react-native-async-storage/async-storage';

async function getHistory(setHistory: React.Dispatch<React.SetStateAction<any[]>>) {
    var history = (await AsyncStorage.getItem('history') ? JSON.parse(await AsyncStorage.getItem('history') as string) : [])
    setHistory(history);
}

const Main = ({ setActiveTab }: { setActiveTab: React.Dispatch<React.SetStateAction<string>> }) => {
    var [history, setHistory] = useState<any[]>([]);
    getHistory(setHistory);
    return (
        <ScrollView>
            <View style={styles.header}>
                <Image source={require("../static/logo.png")} style={styles.logo}></Image>
                <Text style={styles.title}>Welcome to Streamify</Text>
                <Text style={styles.subtitle}>Get the music you love, for free</Text>

            </View>
            <View style={styles.recentlyPlayed}>
                <Text style={styles.sectionTitle}>Recently Played</Text>
                {history.map((track) => (
                    <Track key={track.id} id={track.id} setActiveTab={setActiveTab} thumbnail={track.artwork} title={track.title} artist={track.artist}></Track>
                ))}
            </View>
            <View style={styles.recommendations}>
                <Text style={styles.sectionTitle}>Recommended for You</Text>
                <Track id="RfQPb-kz9Sc" setActiveTab={setActiveTab} thumbnail="https://i1.sndcdn.com/artworks-HpKm3lbkxQByw46m-YsaQog-t240x240.jpg" title="Goofy aah2" artist="JJTV"></Track>
                <Track id="RfQPb-kz9Sc" setActiveTab={setActiveTab} thumbnail="https://i1.sndcdn.com/artworks-HpKm3lbkxQByw46m-YsaQog-t240x240.jpg" title="Goofy aah3" artist="JJTV"></Track>
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
    }
});

export default Main;