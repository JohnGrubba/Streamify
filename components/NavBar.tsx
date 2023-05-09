import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

const NavigationBar = ({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: React.Dispatch<React.SetStateAction<string>> }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={[
                    styles.tab,
                    activeTab === 'Home' ? styles.activeTab : null,
                ]}
                onPress={() => setActiveTab('Home')}
            >
                <Feather
                    name="home"
                    size={24}
                    color={activeTab === 'Home' ? '#FFF' : '#8E8E93'}
                />
            </TouchableOpacity>
            <TouchableOpacity
                style={[
                    styles.tab,
                    activeTab === 'Search' ? styles.activeTab : null,
                ]}
                onPress={() => setActiveTab('Search')}
            >
                <Feather
                    name="search"
                    size={24}
                    color={activeTab === 'Search' ? '#FFF' : '#8E8E93'}
                />
            </TouchableOpacity>
            <TouchableOpacity
                style={[
                    styles.tab,
                    activeTab === 'Library' ? styles.activeTab : null,
                ]}
                onPress={() => setActiveTab('Library')}
            >
                <Feather
                    name="book"
                    size={24}
                    color={activeTab === 'Library' ? '#FFF' : '#8E8E93'}
                />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#1E1E1E',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderTopWidth: 1,
        borderTopColor: '#282828',
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        paddingVertical: 5,
    },
    activeTab: {
        backgroundColor: '#353535',
    },
});

export default NavigationBar;