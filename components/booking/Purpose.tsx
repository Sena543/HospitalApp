import React, { useState } from 'react'
import { View } from 'react-native'
import RNPickerSelect from 'react-native-picker-select';


function Purpose() {
    const [selectPurpose, setSelectPurpose] = useState()

    const purposes = [
        {label:"Regular Checkup", value:"Regular"},
        {label:"Dental Checkup", value:"Dental"},
        {label:"Results Collection", value:"Reesults Collection"},
        {label:"Medication", value:"Medication"},
        {label:"Suirgery", value:"Surgery"},

]

    return (
        <View>
            <View>
                <RNPickerSelect
                items ={purposes}
                onchange={(purpose:any)=> console.log(purpose.value)}
                />
            </View>
        </View>
    )
}

export default Purpose
