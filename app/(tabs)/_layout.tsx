import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { Tabs } from "expo-router";
import React from "react";
import { Image, ImageBackground, Text, View } from "react-native";

// Reusable component — extracted so we don't repeat the same JSX for every tab.
// Props: focused (from the tab navigator), icon (which image to show), title (label).
// Using "any" for the type here keeps it simple — a stricter version would
// define an interface like: { focused: boolean; icon: any; title: string }
const TabIcon = ({focused, icon, title}: any) => {
    // Conditional rendering based on focused state.
    // When focused: show highlight background + icon + label.
    // When not focused: show icon only with muted colour.
    if(focused) {
        return (
            <ImageBackground
                source={images.highlight}
                className="flex flex-row w-full flex-1 min-w-[112px] min-h-16 mt-4 justify-center items-center rounded-full overflow-hidden"
            >
                <Image source={icon} tintColor="#151312" className="size-5" />
                <Text className="text-secondary text-base font-semibold ml-2">{title}</Text>
            </ImageBackground>
        )
    }else{
        return(
        <View className = "size-full justify-center items-center mt-4 rounded-full">
            <Image source={icon} tintColor="#A8b5db" className="size-5" />
        </View>
        )
    }
}

const _Layout = () => {
  return (
    // Tabs from expo-router — file-based tab navigation.
    // Each Tabs.Screen maps to a file in app/(tabs)/.
    // screenOptions applies styles to every tab at once.
    <Tabs
      screenOptions={{
        tabBarShowLabel: false, // hide default text labels (we render our own in TabIcon)
        tabBarItemStyle: {
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        },
        // Floating pill-shaped tab bar — positioned absolute so screen content
        // goes underneath it (screens need paddingBottom to avoid overlap).
        tabBarStyle: {
          backgroundColor: "#0F0D23",
          borderRadius: 50,
          marginHorizontal: 20,
          marginBottom: 36,
          height: 52,
          position: "absolute",
          overflow: "hidden",
          borderWidth: 1,
          borderColor: "#0F0D23",
        },
      }}
    >
        {/* Each Tabs.Screen name must match the filename in app/(tabs)/.
            tabBarIcon receives { focused } from the navigator — we pass it
            to TabIcon along with the icon image and label. */}
        <Tabs.Screen
            name="index"
            options={{
                title: "Home",
                headerShown: false,
                tabBarIcon: ({focused}) => (
                    <TabIcon focused={focused}
                     icon={icons.home}
                     title="Home"
                     />
                )
            }
        }
        />

        <Tabs.Screen
            name="search"
            options={{
                title: "Search",
                headerShown: false,
                tabBarIcon: ({focused}) => (
                    <TabIcon focused={focused}
                     icon={icons.search}
                     title="Search"
                     />
                )
            }
        }
        />

        <Tabs.Screen
            name="saved"
            options={{
                title: "Saved",
                headerShown: false,
                tabBarIcon: ({focused}) => (
                    <TabIcon focused={focused}
                     icon={icons.save}
                     title="Saved"
                     />
                )

            }
        }
        />

        <Tabs.Screen
            name="profile"
            options={{
                title: "Profile",
                headerShown: false,
                tabBarIcon: ({focused}) => (
                    <TabIcon focused={focused}
                     icon={icons.person}
                     title="Profile"
                     />
                )
            }
        }
        />

    </Tabs>

  )
}

export default _Layout;
