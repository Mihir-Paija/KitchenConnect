import {TouchableOpacity, Text, StyleSheet} from 'react-native'
import {windowWidth, windowHeight} from '@/utils/dimensions'

const LogoutButton = ({handleLogoutBtn}) =>{
    return(
        <TouchableOpacity style = {styles.btn} onPress={handleLogoutBtn}>
            <Text style ={styles.title}>Logout</Text>
        </TouchableOpacity>
    )
}

export default LogoutButton;

const styles = StyleSheet.create({
    btn: {
        backgroundColor: "red",
        justifyContent: "center",
        alignItems: "center",
        width: windowWidth * 0.3,
        height: windowHeight * 0.1,
        borderRadius: 30
    },

    title: {
        color: "white",
        fontFamily: "NunitoBold"
    }
})

