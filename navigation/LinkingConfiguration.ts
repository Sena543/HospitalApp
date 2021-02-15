import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          AppointmentScreen: {
            screens: {
              Appointment: 'one',
            },
          },
          BookingScreen: {
            screens: {
              TabTwoScreen: 'two',
            },
          },
          SignInScreen:{
            screens:{
              Login: "three"
            }
          },
          Settings:{
            screens:{
              Settings:"Settings"
            }
          }
        },
      },
      NotFound: '*',
    },
  },
};
