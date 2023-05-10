import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Track from '../components/Track';

const Library = ({ setActiveTab }: { setActiveTab: React.Dispatch<React.SetStateAction<string>> }) => {
    return <View>
        <Text style={styles.text}>Library</Text>
        <Track id="RfQPb-kz9Sc" setActiveTab={setActiveTab} thumbnail="https://i1.sndcdn.com/artworks-HpKm3lbkxQByw46m-YsaQog-t240x240.jpg" title="Goofy aah55" artist="JJTV"></Track>
        <Track id="RfQPb-kz9Sc" setActiveTab={setActiveTab} thumbnail="https://i1.sndcdn.com/artworks-HpKm3lbkxQByw46m-YsaQog-t240x240.jpg" title="Goofy aah55" artist="JJTV"></Track>
        <Track id="RfQPb-kz9Sc" setActiveTab={setActiveTab} thumbnail="https://i1.sndcdn.com/artworks-HpKm3lbkxQByw46m-YsaQog-t240x240.jpg" title="Goofy aah55" artist="JJTV"></Track>
    </View>
};

const styles = StyleSheet.create({
    text: {
        color: '#FFF'
    }
});

export default Library;