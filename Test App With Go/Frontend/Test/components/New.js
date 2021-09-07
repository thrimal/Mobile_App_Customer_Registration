import axios from 'axios';
import React, { Component } from 'react'
import { Text, View, KeyboardAvoidingView, StyleSheet, TextInput, StatusBar, ImageBackground, TouchableOpacity, Alert, Image } from 'react-native'


StatusBar.setBarStyle('default');

var img = require('../asserts/images/login4.jpg')

export default class New extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: "",
            name: "",
            address: "",
            contact: "",
            password: "",
        }
    }

    clearText = () => {
        this.setState({ id: "" })
        this.setState({ name: "" })
        this.setState({ address: "" })
        this.setState({ contact: "" })
        this.setState({ password: "" })
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <KeyboardAvoidingView style={styles.container}>

                <ImageBackground source={img} style={{ width: 450, height: '100%', position: 'absolute' }}>
                </ImageBackground>
                <Image
                    resizeMode='contain'
                    style={{
                        width: 100,
                        height: 100,
                        marginTop: 10,
                        position: 'absolute',
                        top: 0,
                        left: 10
                    }}
                    source={require('../asserts/images/man.png')} />
                <Text style={styles.text}> Sign Up </Text>

                <TextInput style={styles.input} onChangeText={(value) => this.setState({ id: value })}
                    value={this.state.id}
                    placeholder="Id..." placeholderTextColor="grey" />

                <TextInput style={styles.input} onChangeText={(value) => this.setState({ name: value })}
                    value={this.state.name}
                    placeholder="Name..." placeholderTextColor="grey" />

                <TextInput style={styles.input} onChangeText={(value) => this.setState({ address: value })}
                    value={this.state.address}
                    placeholder="Address..." placeholderTextColor="grey" />

                <TextInput style={styles.input} onChangeText={(value) => this.setState({ contact: value })}
                    value={this.state.contact}
                    placeholder="Contact..." placeholderTextColor="grey" />

                <TextInput style={styles.input} onChangeText={(value) => this.setState({ password: value })}
                    value={this.state.password}
                    placeholder="Password..." placeholderTextColor="grey" />

                <TouchableOpacity style={styles.button} onPress={() => {
                    if (this.state.id.length != 0 || this.state.name.length != 0 || this.state.address.length != 0 || this.state.contact.length != 0 || this.state.password.length != 0) {
                        // const headers = {
                        //     Accept: 'application/json',
                        //     'Content-Type': 'application/json'
                        // };

                        // const mailForm = {
                        //     "id": this.state.id,
                        //     "name": this.state.name,
                        //     "address": this.state.address,
                        //     "contact": this.state.contact,
                        //     "password": this.state.password,
                        // };

                        // axios.post("http://192.168.43.203:8000/api/customers", mailForm
                        //     , { headers: headers }
                        // )
                        //     .then(response => {
                        //         if (response.data.success) {
                        //             console.log("success");
                        //         }
                        //     })
                        //     .catch(async error => {
                        //         console.log(error);
                        //     });
                        fetch("http://192.168.43.113:8000/api/customers", {
                            method: 'POST',
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                id: this.state.id,
                                name: this.state.name,
                                address: this.state.address,
                                contact: this.state.contact,
                                password: this.state.password
                            })
                        })
                            .then((response) => response.json())
                            .then((responseJson) => {
                                if (responseJson) {
                                    Alert.alert(
                                        "Signed Up Successfully..., Please Login..!",
                                    );
                                    this.clearText();
                                }
                            })
                            .catch((error) => {
                                Alert.alert("Fields Empty...")
                                console.log(error);
                            })

                    } else {
                        Alert.alert("Fields Empty...")
                    }
                }
                }
                >
                    <Text style={{ fontSize: 20, letterSpacing: 3, fontFamily: 'serif', }}>Save</Text></TouchableOpacity>
                <View style={styles.container2}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center'
                    }}
                    >
                        <Text style={{
                            color: 'black',
                            paddingRight: 15,
                            fontSize: 16
                        }}>
                            Already have an account ?
                        </Text>
                        <TouchableOpacity
                            onPress={() => navigate('Login', { name: 'Login' })}
                        >
                            <Text style={{
                                color: 'white',
                                fontWeight: '700',
                                textAlign: 'center',
                                fontSize: 16
                            }}>
                                Login
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </KeyboardAvoidingView>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        fontSize: 20,
        letterSpacing: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2f3640',
    },

    text: {
        // color: '#CAD3C8',
        color: 'black',
        fontSize: 50,
        fontFamily: 'serif',
        paddingBottom: 30,
        letterSpacing: 3,
        marginBottom: 10
    },

    button: {
        color: 'black',
        borderRadius: 30,
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: 'lightgreen',
        marginHorizontal: 50,
        marginVertical: 30,
        width: 150,
        height: 50,

    },

    input: {
        marginTop: 1,
        marginHorizontal: 10,
        marginVertical: 8,
        top: 10,
        color: 'black',
        width: '90%',
        fontSize: 15,
        padding: 8,
        letterSpacing: 1,
        backgroundColor: 'white',
        borderRadius: 30,
    }

})