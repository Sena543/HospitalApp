import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import Profile from '../components/Profile';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import Appointment from '../screens/Appointment';
import TabTwoScreen from '../screens/TabTwoScreen';
import { BottomTabParamList, ProfileParamList, TabOneParamList, TabTwoParamList } from '../types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      <BottomTab.Screen
        name="Appointment"
        component={AppointmentNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="business-outline" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Booking"
        component={TabTwoNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="book-outline" color={color} />,
        }}
      />
       <BottomTab.Screen
        name="Profile"
        component={ProfileNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="person-outline" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const AppointmentStack = createStackNavigator<TabOneParamList>();

function AppointmentNavigator() {
  return (
    <AppointmentStack.Navigator>
      <AppointmentStack.Screen
        name="AppointmentScreen"
        component={Appointment}
        options={{ headerTitle: 'Appointment History' }}
      />
    </AppointmentStack.Navigator>
  );
}

const ProfileStack = createStackNavigator<ProfileParamList>()
function ProfileNavigator() {
  return (
    <ProfileStack.Navigator>
      <AppointmentStack.Screen
        name="Profile"
        component={Profile}
        options={{ headerTitle: 'User Profile' }}
      />
    </ProfileStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="TabTwoScreen"
        component={TabTwoScreen}
        options={{ headerTitle: 'Tab Two Title' }}
      />
    </TabTwoStack.Navigator>
  );
}
