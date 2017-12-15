import React, { PureComponent } from 'react';
import { Text, View, ActivityIndicator, Image, StyleSheet, Alert } from 'react-native';
import { Container, Header, Body, Title, Content, List, ListItem } from 'native-base';

import Modal from '../components/modal';
import DataItem from '../components/list_item';
import { getArticles } from '../services/news';


export class HomeScreen extends PureComponent {

    constructor(props) {
        super(props);

        this._handleItemDataOnPress = this._handleItemDataOnPress.bind(this)
        this._handleModalClose = this._handleModalClose.bind(this)

        this.state = {
            isLoading: true,
            data: null,
            isError: false,
            setModalVisible: false,
            modalArticleData: {}
        }
    }

    _handleItemDataOnPress(articleData) {
        this.setState({
            setModalVisible: true,
            modalArticleData: articleData
        })
    }

    _handleModalClose() {
        this.setState({
            setModalVisible: false,
            modalArticleData: {}
        })
    }

    componentDidMount() {
        getArticles().then(data => {
            this.setState({
                isLoading: false,
                data: data
            })
        }, error => {
            Alert.alert("Error", "Ops, algo deu errado :(")
        })
    }

    render() {
        let view = this.state.isLoading ? (
            <View style={[styles.container]}>
                <Image  style={{ width: 50, height: 50 }}
                  source={require('../images/mundo.png') } />
                <Text style={{ marginTop: 8 }} children="Carregando..." />
                <ActivityIndicator animating={this.state.isLoading} color="#fff" />

            </View>
        ) : (
                <List
                    dataArray={this.state.data}
                    renderRow={(item) => {
                        return (
                            <ListItem>
                                <DataItem onPress={this._handleItemDataOnPress} data={item} />
                            </ListItem>
                        )
                    }} />

            )
        return (
            <Container>
                <Header>
                    <Body>
                        <Title children="Mundo News" />
                    </Body>
                </Header>
                <Content
                    contentContainerStyle={{ flex: 1, backgroundColor: '#fff' }}
                    padder={false}>
                        {view}
                </Content>
                <Modal
                    showModal={this.state.setModalVisible}
                    articleData={this.state.modalArticleData}
                    onClose={this._handleModalClose}/>
            </Container>
        )
    }

}


    const styles = StyleSheet.create({
      container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'

      },
      horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
      }
    })
