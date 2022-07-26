import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  Text,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';

const PER_PAGE = 5;

const LazyLoader = () => {
  const [userList, setUserList] = useState([]);
  const [page, setPage] = useState(1);
  const [isUserListLoaderVisible, setIsUserListLoaderVisible] = useState(false);
  const [isUserListEnd, setIsUserListEnd] = useState(false);

  const loadUsers = () => {
    if (isUserListLoaderVisible) {
      return;
    }

    setIsUserListLoaderVisible(true);
    fetch(`https://dummyapi.io/data/v1/user?page=${page}&limit=${PER_PAGE}`, {
      headers: {
        'app-id': '6135078fdb7c40bcbb107099',
      },
    })
      .then(response => {
        setIsUserListLoaderVisible(false);
        return response.json();
      })
      .then(data => {
        if (data.page <= data.total && data.data.length > 0) {
          setUserList(currentUserList => [...currentUserList, ...data.data]);
          setPage(currentPage => currentPage + 1);
        } else {
          setIsUserListEnd(true);
        }
      })
      .catch(error => {
        setIsUserListLoaderVisible(false);
        Alert.alert('', error.message);
      });
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const keyExtractor = item => item.id;

  const renderItem = ({item}) => {
    return (
      <View
        style={{
          flex: 1,
          paddingVertical: 12,
          marginBottom: 12,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          style={{
            width: 70,
            height: 70,
            borderRadius: 70 / 2,
          }}
          source={{uri: item.picture}}
        />
        <View
          style={{
            width: 165,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 18,
            }}>{`${item.firstName} ${item.lastName}`}</Text>
        </View>
      </View>
    );
  };

  const renderFooter = () =>
    isUserListLoaderVisible && !isUserListEnd ? (
      <ActivityIndicator size="large" color="red" />
    ) : null;

  return (
    <View style={{flex: 1}}>
      <FlatList
        contentContainerStyle={{padding: 24}}
        data={userList}
        numColumns={2}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        onEndReachedThreshold={0.5}
        onEndReached={loadUsers}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
};

export default LazyLoader;
