import React from "react";
import { StyleSheet, Text, View } from "react-native";
import axios from "../../plugins/axios";
import AsyncStorage from "@react-native-async-storage/async-storage"; // npm install @react-native-async-storage/async-storage // dili mag run saimuhang end
import { useQuery, QueryClientProvider} from "react-query";

const Prof = () => {
  function UserInfo(){
    const token = AsyncStorage.getItem("token");
    return axios.get("http://localhost:8000/api/v1/accounts/users/me",{
      headers:{
        Authorization: 'Token' + token,
      },
    })
    .then((response)=>{
      return response.data;
    });
  }

  const {data, isLoading, error} = useQuery('user', UserInfo, {retry: 0});

  if(isLoading && !error){
    return(
      <View>
        <Text>Loading...</Text>
      </View>
    );
  } else if (error){
    return(
      <View>
        <Text>An error has occured</Text>
      </View>
    );
  }

  return (
    <>
      <View style={styles.container}>
        {/* Render user data */}
        <Text style={styles.label}>Email:</Text>
      </View>
    </>
  );
};

export default Prof;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    paddingVertical: 35,
  },
  label: {
    fontSize: 23,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  value: {
    fontSize: 16,
    marginBottom: 15,
  },
});
