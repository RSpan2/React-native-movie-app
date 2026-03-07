import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, View, } from "react-native";

const Search = () => {
  // useState — stores the current search query string.
  // searchQuery updates on every keystroke via the SearchBar's onChangeText prop.
  const [searchQuery, setSearchQuery] = useState('');

  // useFetch with autoFetch=false (second argument) — don't fetch on mount.
  // We want to wait until the user types something before hitting the API.
  // refetch is renamed to loadMovies for clarity.
  const {
      data:movies,
      loading,
      error,
      refetch: loadMovies,
      reset,           // clears data/error/loading back to null
    } = useFetch(() => fetchMovies({
      query: searchQuery
  }), false)

  // useEffect with [searchQuery] dependency — runs every time searchQuery changes.
  // Debounce pattern: wait 500ms after the user stops typing before calling the API.
  // This prevents firing a request on every single keystroke.
  // The cleanup function (return) cancels the timeout if searchQuery changes again
  // before 500ms — so only the final value triggers a fetch.
  useEffect(() => {
    const timeoutId = setTimeout( async () => {
      if(searchQuery.trim()){
        await loadMovies();  // fetch results for the current query
      } else{
        reset()              // clear results if the search box is emptied
      }
    }, 500);
    return () => clearTimeout(timeoutId); // cleanup: cancel previous timeout
  }, [searchQuery])

  return (
    <View className="flex-1 bg-primary">
        <Image source={images.bg} className="flex-1 absolute w-full z-0" resizeMode ="cover" />

        {/* FlatList handles all scrolling here — no ScrollView wrapper needed.
            ListHeaderComponent renders above the list (search bar, loading, errors).
            ListEmptyComponent renders when data is empty. */}
        <FlatList
          data={movies}
          renderItem={({ item }) => <MovieCard {...item} />}
          keyExtractor={(item) => item.id.toString()}
          className="px-5"
          numColumns={3}
          columnWrapperStyle={{
            justifyContent: 'center',
            gap: 16,
            marginVertical: 16
          }}
          contentContainerStyle={{ paddingBottom: 100 }}
          ListHeaderComponent={
            <>
              <View className="w-full flex-row justify-center mt-20 item-center">
                <Image source={icons.logo} className="w-12 h-10" />
              </View>
              <View className="my-5">
                {/* Controlled input — value and onChangeText are both wired up,
                    so React owns the state (searchQuery) and the input just displays it. */}
                <SearchBar
                  placeholder="Search movies..."
                  value={searchQuery}
                  onChangeText={(text:string ) => setSearchQuery(text)}
                  />
              </View>
              {loading && (
                  <ActivityIndicator size="large" color= "#0000ff" className="my-3"/>
              )}
              {error && (
                <Text className="text-red-500 px-5 my-3">
                  Error: {error}
                </Text>
              )}
              {/* Only show the results header when there are actual results */}
              {!loading && !error && searchQuery.trim() && movies?.length > 0 &&(
                <Text className="text-xl text-white font-bold">
                  Search Results for {''}
                  <Text className="text-accent">
                    {searchQuery}
                  </Text>
                </Text>
              )}
            </>
          }
          ListEmptyComponent={
            // Show different messages depending on whether the user has typed or not
            !loading && !error ? (
              <View className="mt-10 px-10">
                <Text className="text-center text-gray-500">
                  {searchQuery.trim() ? 'No movies found' : 'Search for a movie'}
                </Text>
              </View>
            ) : null
          }
        />
    </View>
  )
}

export default Search;
