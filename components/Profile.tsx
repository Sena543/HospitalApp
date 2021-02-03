import React from 'react'
import { Image, StyleSheet } from 'react-native'
import { View, Text } from './Themed'

function Profile() {
    return (
        <View style={styles.container}>
            <View style={styles.imageView}>
                <Image
                style={styles.image}
                 source={require("../assets/images/moon.jpg")}
                />
            </View>
            <View style={styles.profileDetails}>
                <View style={{marginLeft:40}}>
                    <View>
                        <Text style={styles.title}>Name</Text>
                        <Text style={styles.data}>Sandra Ashong</Text>
                    </View>
                    <View>
                        <Text style={styles.title}>Gender</Text>
                        <Text style={styles.data}>Female</Text>
                    </View>
                     <View>
                        <Text style={styles.title}>Student Level</Text>
                        <Text style={styles.data}>300</Text>
                    </View>
                      <View>
                        <Text style={styles.title}>Student Level</Text>
                        <Text style={styles.data}>Cape Coast</Text>
                    </View>
                </View>
                <View style={{marginRight:40}}>
                    <View>
                        <Text style={styles.title}>Student Type</Text>
                        <Text style={styles.data}>Undergraduate</Text>
                    </View>
                    <View>
                        <Text style={styles.title}>Residential Status</Text>
                        <Text style={styles.data}>Hilla Liman Hall</Text>
                    </View>
                     <View>
                        <Text style={styles.title}>Room Number</Text>
                        <Text style={styles.data}>B35</Text>
                    </View>
                    <View>
                        <Text style={styles.title}>Last Appointment</Text>
                        <Text style={styles.data}>21/21/21</Text>
                    </View>
                </View>
            </View>
          </View>

    )
}

export default Profile

const styles = StyleSheet.create({
    container:{
         flex: 1,
        alignContent:'center',
        display:'flex',
        backgroundColor: '#fff',
        },
    title:{
        color:"#818181",
        fontSize:20,
        margin:5
    },
    data:{
        color:"#000000",
        fontSize:20,
        margin:5
    },
    image:{
            width:"100%",
            height:"90%",
        },
    imageView:{
        flex:1,
    },
    profileDetails:{
        flex:2,
        // alignItems:"space-around",
        justifyContent:"space-between",
        marginTop:20,
        flexDirection:'row'},
})