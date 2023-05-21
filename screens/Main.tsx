import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, Image, ScrollView, Animated, Easing } from "react-native";
import Track from '../components/Track';
import AsyncStorage from '@react-native-async-storage/async-storage';

async function getHistory(setHistory: React.Dispatch<React.SetStateAction<any[]>>) {
    var history = (await AsyncStorage.getItem('history')
        ? JSON.parse(await AsyncStorage.getItem('history') as string)
        : []);
    setHistory(history);
}

var recommendations: any[] = [];

async function getRecommendations() {
    recommendations = [];
    var history = (await AsyncStorage.getItem('history')
        ? JSON.parse(await AsyncStorage.getItem('history') as string)
        : []);

    // Get one recommendation for every track in history
    await Promise.all(
        history.map(async (track: any) => {
            const response = await fetch("https://streamify.jjhost.tk/search", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    query: track.title + " " + track.artist,
                })
            });

            const data = await response.json();
            var rcmd = data.filter(
                (value: any) => value.id !== track.id && value.artist === track.artist
            )[0];
            if (rcmd) recommendations.push(rcmd);
        })
    );
    console.log(recommendations);
}
getRecommendations();
const Main = ({ setActiveTab }: { setActiveTab: React.Dispatch<React.SetStateAction<string>> }) => {
    const [history, setHistory] = useState<any[]>([]);
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(-100)).current;

    const fadeIn = () => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true
        }).start();
    };

    const slideIn = () => {
        Animated.timing(slideAnim, {
            toValue: 0,
            duration: 800,
            easing: Easing.out(Easing.exp),
            useNativeDriver: true
        }).start();
    };

    useEffect(() => {
        getHistory(setHistory);
        fadeIn();
        slideIn();
    }, []);

    return (
        <ScrollView>
            <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
                <Image source={require("../static/logo.png")} style={styles.logo}></Image>
                <Text style={styles.title}>Welcome to Streamify</Text>
                <Text style={styles.subtitle}>Get the music you love, for free</Text>
            </Animated.View>
            <Text style={styles.sectionTitle}>Recently Played</Text>
            <Animated.View style={[styles.recentlyPlayed, { transform: [{ translateX: slideAnim }] }]}>
                {history.map((track) => (
                    <Track
                        key={track.id}
                        id={track.id}
                        setActiveTab={setActiveTab}
                        thumbnail={track.artwork}
                        title={track.title}
                        artist={track.artist}
                    />
                ))}
            </Animated.View>
            <Animated.View style={[styles.recommendations, { opacity: fadeAnim }]}>
                <View style={styles.inline}>
                    <Text style={styles.sectionTitle}>Recommended for You</Text>
                </View>
                {recommendations.map((track) => (
                    <Track
                        key={track.id}
                        id={track.id}
                        setActiveTab={setActiveTab}
                        thumbnail={track.thumb}
                        title={track.title}
                        artist={track.artist}
                    />
                ))}
            </Animated.View>
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
    inline: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "baseline",
        marginBottom: 16,
        paddingRight: 16
    }
});

export default Main;
