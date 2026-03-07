import { icons } from "@/constants/icons";
import { Link } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

// Movie is a global TypeScript interface declared in interfaces/interfaces.d.ts.
// Because it's in a .d.ts file it's available everywhere without importing —
// just destructure the props you need directly from the Movie type.
const MovieCard = ({
  id,
  poster_path,
  title,
  vote_average,
  release_date,
}: Movie) => {
    return (
        // Link from expo-router — wraps a component to make it navigate on press.
        // asChild passes the navigation behaviour down to the TouchableOpacity
        // instead of rendering its own element.
        // The href uses a template literal to build a dynamic route: /movies/123
        <Link href={`/movies/${id}`} asChild>
            <TouchableOpacity className="w-[30%]">
                <Image
                source={{
                    // If poster_path exists, build the full TMDB image URL.
                    // Otherwise show a placeholder so the layout doesn't break.
                    uri: poster_path
                    ? `https://image.tmdb.org/t/p/w500${poster_path}`
                    : "https://placehold.co/600x400/1a1a1a/FFFFFF.png",
                }}
                className="w-full h-52 rounded-lg"
                resizeMode="cover"
                />

                <Text className="text-sm font-bold text-white mt-2" numberOfLines={1}>
                {title}
                </Text>

                {/* TMDB rates out of 10, divide by 2 to show out of 5 stars */}
                <View className="flex-row items-center justify-start gap-x-1">
                        <Image source ={icons.star} className="size-4"/>
                        <Text className="text-xs text-white font-bold uppercase"> {Math.round(vote_average / 2)}</Text>
                </View>

                <View className="Flex-row item-center justify-between">
                    {/* release_date is "YYYY-MM-DD" — split on "-" and take index 0 for just the year */}
                    <Text className="text-xs text-light-300 font-medium mt-1">
                        {release_date?.split('-')[0]}
                    </Text>
                </View>
            </TouchableOpacity>
        </Link>
    )
}

export default MovieCard
