import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TextInput,
} from "react-native";

const Search = () => {
    const [searchedTracks, setSearchedTracks] = useState<any[]>([]);

    function search(query: string) {
        fetch("https://streamify.jjhost.tk/search", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                query: query,
            })
        }).then((res) => res.json()).then((data) => {
            console.log(data);
            setSearchedTracks(data);
        });
    }

    return (
        <View>
            <View style={styles.searchContainer}>
                <TextInput
                    placeholder="Search tracks..."
                    style={styles.searchInput}
                    placeholderTextColor={'#888'}
                    onChangeText={(query) => search(query)}
                />
            </View>
            <ScrollView>
                {searchedTracks.map((track) => (
                    <View style={styles.trackCard} key={track.id}>
                        <Image source={{ uri: track.thumb }} style={styles.trackImage} />
                        <Text style={styles.trackTitle}>{track.title}</Text>
                    </View>
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