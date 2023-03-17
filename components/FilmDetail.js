import { ActivityIndicator, TouchableOpacity, Image, ScrollView, StyleSheet, Text, View, Share, Platform, Button } from "react-native";
import React from 'react';
import { getFilmDetailFromApi, getImageFromApi } from "../API/TMDBApi";
import moment from 'moment';
import numeral from 'numeral';
import { connect } from "react-redux";

class FilmDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            film: undefined,
            isLoading: true,
        }
        this.searchedText = ''
    }

    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state
        // On accède à la fonction shareFilm et au film via les paramètres qu'on a ajouté à la navigation
        // if (params.film != undefined && Platform.OS === 'web') {
        if (params.film != undefined && Platform.OS === 'ios') {
            return {
                // On a besoin d'afficher une image, il faut donc passe par une Touchable une fois de plus
                headerRight: () => <TouchableOpacity
                    style={styles.share_touchable_headerrightbutton}
                    onPress={() => params.shareFilm()}>
                    <Image
                        style={styles.share_image}
                        // source={require('../Images/ic_share.png')} //for auto platform (error lo hatreto) 
                        source={require('../Images/ic_share.ios.png')} 
                        />
                </TouchableOpacity>
            }
        }
    }


    // _loadDetailFilms(idFilm) {
    //     // console.log('_loadDetailFilms');
    //     getFilmDetailFromApi(idFilm)
    //         .then(res => {
    //             this.setState({
    //                 film: res,
    //                 isLoading: false
    //             })
    //         }, () => { this._updateNavigationParams() }).catch((error) => {
    //             console.log(error)
    //         })
    // }

    _toggleFavorite() {
        // console.log('_toggleFavorite');
        const action = { type: 'TOOGLE_FAVORITE', value: this.state.film };
        this.props.dispatch(action);
    }

    _displayFavoriteImage() {
        var sourceImage = require('../Images/ic_favorite_border.png');
        // console.log('_displayFavoriteImage');
        if (this.props.favoriteFilm.findIndex(item => item.id === this.state.film.id) !== -1) {
            sourceImage = require('../Images/ic_favorite.png');
        }
        return (
            <Image
                source={sourceImage}
                style={styles.favorite_image}
            />
        )
    }

    _displayFilm() {
        console.log('_displayFilm');
        const { film } = this.state
        console.log(film);
        if (film != undefined) {
            return (
                <ScrollView style={styles.scrollview_container}>
                    <Image
                        style={styles.image}
                        source={{ uri: getImageFromApi(film.backdrop_path) }}
                    />
                    <Text style={styles.title_text}>{film.title}</Text>
                    <TouchableOpacity
                        onPress={() => this._toggleFavorite()}
                        style={styles.favorite_container}>
                        {this._displayFavoriteImage()}
                    </TouchableOpacity>
                    <Text style={styles.description_text}>{film.overview}</Text>
                    <Text style={styles.default_text}>Sorti le {moment(new Date(film.release_date)).format('DD/MM/YYYY')}</Text>
                    <Text style={styles.default_text}>Note : {film.vote_average} / 10</Text>
                    <Text style={styles.default_text}>Nombre de votes : {film.vote_count}</Text>
                    <Text style={styles.default_text}>Budget : {numeral(film.budget).format('0,0[.]00 $')}</Text>
                    <Text style={styles.default_text}>Genre(s) : {film.genres.map(function (genre) {
                        return genre.name;
                    }).join(" / ")}
                    </Text>
                    <Text style={styles.default_text}>Companie(s) : {film.production_companies.map(function (company) {
                        return company.name;
                    }).join(" / ")}
                    </Text>
                </ScrollView>
            )
        }
    }

    _displayLoading() {
        if (this.state.isLoading) {
            return (
                <View style={styles.loading_container}>
                    <ActivityIndicator size='large' />
                </View>
            )
        }
    }

    _shareFilm = () => {
        const { film } = this.state;
        // alert('Share');
        Share.share({ title: film.title, message: film.overview })
    }

    // Fonction pour faire passer la fonction _shareFilm et le film aux paramètres de la navigation. Ainsi on aura accès à ces données au moment de définir le headerRight
    _updateNavigationParams() {
        // console.log('_updateNavigationParams');
        this.props.navigation.setParams({
            shareFilm: this._shareFilm,
            film: this.state.film
        })
    }

    _displayFloatingActionButton() {
        const { film } = this.state;
        if (film != undefined && (Platform.OS === 'android' || Platform.OS === 'web')) {
            return (
                <TouchableOpacity
                    style={styles.share_touchable_floatingactionbutton}
                    onPress={() => this._shareFilm()}>
                    <Image
                        style={styles.share_image}
                        // source={require('../Images/ic_share.png')}  //for auto choice platform (Error aloha hatreto)
                        source={require('../Images/ic_share.android.png')}  //for auto choice platform
                    />
                </TouchableOpacity>
            )
        }
    }

    componentDidMount() {
        // console.log('componentDidMount');
        const favoriteFilmIndex = this.props.favoriteFilm.findIndex(item => item.id === this.props.navigation.state.params.idFilm)
        if (favoriteFilmIndex !== -1) {
            this.setState({
                film: this.props.favoriteFilm[favoriteFilmIndex]
            }, () => { this._updateNavigationParams() })
            return
        }

        this.setState({ isLoading: true })
        getFilmDetailFromApi(this.props.navigation.state.params.idFilm).then(data => {
            this.setState({
                film: data,
                isLoading: false
            }, () => { this._updateNavigationParams() })
        })

        // this._loadDetailFilms(this.props.navigation.state.params.idFilm);
    }

    render() {
        const idFilm = this.props.navigation.state.params.idFilm;
        return (
            <View style={styles.main_container}>
                {this._displayFilm()}
                {this._displayLoading()}
                {this._displayFloatingActionButton()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    scrollview_container: {
        flex: 1
    },
    image: {
        height: 169,
        margin: 5
    },
    title_text: {
        fontWeight: 'bold',
        fontSize: 35,
        flex: 1,
        flexWrap: 'wrap',
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        marginBottom: 10,
        color: '#000000',
        textAlign: 'center'
    },
    description_text: {
        fontStyle: 'italic',
        color: '#666666',
        margin: 5,
        marginBottom: 15
    },
    default_text: {
        marginLeft: 5,
        marginRight: 5,
        marginTop: 5,
    },
    favorite_container: {
        alignItems: 'center',
    },
    favorite_image: {
        width: 40,
        height: 40
    },
    share_touchable_floatingactionbutton: {
        position: 'absolute',
        width: 60,
        height: 60,
        right: 30,
        bottom: 30,
        borderRadius: 30,
        backgroundColor: '#35bb98',
        justifyContent: 'center',
        alignItems: 'center'
    },
    share_image: {
        width: 30,
        height: 30
    },
    share_touchable_headerrightbutton: {
        marginRight: 8
    }
});

const mapStateToProps = (state) => {
    return {
        favoriteFilm: state.favoritesFilm
    }
}
export default connect(mapStateToProps)(FilmDetail)