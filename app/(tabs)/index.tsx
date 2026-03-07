import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import { ActivityIndicator, FlatList, Image, ScrollView, Text, View } from "react-native";

export default function Index() {
  // useRouter — hook from expo-router that gives access to navigation.
  // router.push("/search") navigates to the search screen programmatically
  // (as opposed to clicking a tab or Link component).
  const router = useRouter();

  // useFetch — our custom hook. Fetches popular movies on mount (autoFetch defaults to true).
  // We pass an empty query so fetchMovies falls back to the popular movies endpoint.
  // Destructuring and renaming: data -> movies, loading -> moviesLoading, etc.
  const {
      data:movies,
      loading: moviesLoading,
      error: moviesError } = useFetch(() => fetchMovies({
      query: ''
  }))

  return (
    <View className="flex-1 bg-primary">
      {/* Background image sits behind everything using absolute positioning */}
      <Image source={images.bg} className="absolute w-full z-0" />

      {/* ScrollView — makes content scrollable when it overflows the screen.
          FlatList inside has scrollEnabled={false} so only this ScrollView scrolls. */}
      <ScrollView
          className="flex-1 px-5"
          showsVerticalScrollIndicator={false} contentContainerStyle={{minHeight: "100%", paddingBottom: 10}}
      >
          <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto"/>

          {/* Conditional rendering using ternary operators:
              if loading   -> show spinner
              if error     -> show error message
              else         -> show the search bar and movie list */}
          {moviesLoading? (
            <ActivityIndicator
                size="large"
                color="#0000ff"
                className="mt-10 self-center"
            />
            ) : moviesError ? (
              <Text>Error: {moviesError}</Text>
            ): (
              <View className="flex-1 mt-5 ">
                  {/* SearchBar used as a navigation button here —
                      onPress navigates to the search tab instead of typing inline */}
                  <SearchBar
                    onPress={() => router.push("/search")}
                    placeholder="Search for movies, TV shows, and more"
                    value=""
                    onChangeText={() => {}}
                  />

                  <>
                    <Text className="text-lg text-white font-bold mt-5 mb-3">Latest Movies</Text>

                    {/* FlatList — efficient list rendering. Only renders items visible on screen.
                        numColumns={3} creates a grid layout.
                        columnWrapperStyle styles each row of the grid.
                        scrollEnabled={false} because the parent ScrollView handles scrolling. */}
                    <FlatList
                        data={movies}
                        renderItem={({ item }) => (
                          // Spread operator {...item} passes all Movie properties as props
                          <MovieCard
                            {...item}
                          />
                        )}
                        keyExtractor={(item) => item.id.toString()}
                        numColumns = {3}
                        columnWrapperStyle={{
                            justifyContent: 'flex-start',
                            gap: 20,
                            paddingRight:5,
                            marginBottom: 10,
                        }}
                        className="mt-2 pb-32"
                        scrollEnabled={false}
                    />
                  </>
              </View>
            )}


      </ScrollView>

    </View>
  );
}
