import { icons } from "@/constants/icons";
import React from "react";
import { Image, TextInput, View } from "react-native";

// Props interface — defines the shape of the data this component accepts.
// Using an interface makes the component typed: TypeScript will error if you
// forget a required prop or pass the wrong type.
// onPress is optional (?) — not every screen needs it (e.g. search screen handles
// typing instead, home screen uses it to navigate).
interface Props{
    placeholder: string;
    onPress?: () => void;
    value: string;
    onChangeText: (text: string) => void;
}

// Reusable component — used on both the home screen (navigates on press)
// and the search screen (controlled input that filters results).
// Props make it flexible enough to work in both contexts.
const SearchBar = ({placeholder, onPress, value, onChangeText}: Props) => {
    return (
        <View className="flex-row items-center bg-dark-200 rounded-full px-5 py-4">
            <Image source={icons.search} className="size-5" resizeMode="contain" tintColor = "#ab8bff" />
            {/* TextInput — the React Native equivalent of <input type="text" />.
                value + onChangeText makes this a "controlled input": the parent component
                owns the state, and passes it down. This is how React manages form inputs. */}
            <TextInput
                onPress={onPress}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                placeholderTextColor="#a8b5db"
                className="flex-1 ml-2 text-white"
            />
        </View>
    )

}

export default SearchBar;
