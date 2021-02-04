import React, { useState } from 'react'
import { View } from 'react-native'


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
            </View>
        </View>
    )
}

export default Purpose
