import React, { useState } from "react";
import {
    View,
    StyleSheet,
    ScrollView,
    TextInput,
} from "react-native";
import Track from '../components/Track';

const Search = ({ setActiveTab }: { setActiveTab: React.Dispatch<React.SetStateAction<string>> }) => {
    const [searchedTracks, setSearchedTracks] = useState<any[]>([]);

    async function search(query: string) {
        if (query == "" || query == null) {
            setSearchedTracks([]);
            return;
        }
        fetch("https://streamify.jjhost.tk/search", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                query: query,
            })
        }).then((res) => res.json()).then((data) => {
            setSearchedTracks(data);
        });
    }

    return (
        <View style={{ height: "100%" }}>
            <View style={styles.searchContainer}>
                <TextInput
                    placeholder="Search tracks..."
                    style={styles.searchInput}
                    placeholderTextColor={'#888'}
                    onSubmitEditing={async (event) => search(event.nativeEvent.text)}
                />
            </View>
            <ScrollView>
                {searchedTracks.map((track) => (
                    <Track key={track.id} id={track.id} setActiveTab={setActiveTab} thumbnail={track.thumb} title={track.title} artist={track.artist}></Track>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    searchContainer: {
        height: 60,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },
    searchText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#FFF",
        marginLeft: 10,
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
    trackCard: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 10,
        backgroundColor: "#282828",
        borderRadius: 10,
        padding: 10,
    },
    trackImage: {
        width: 50,
        height: 50,
        borderRadius: 5,
        marginRight: 10,
    },
    trackTitle: {
        fontSize: 16,
        color: "#FFF",
    },
});

export default Search;