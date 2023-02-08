import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Search from '../components/Search';
import FilmDetail from '../components/FilmDetail';
import Favorites from '../components/Favorites';
import { StyleSheet,Image } from 'react-native';

const SearchStackNavigator = createStackNavigator({
    Search:{
        screen: Search,
        navigationOptions:{
            titme: "Search"
        }
    },
    FilmDetail:{
        screen:FilmDetail
    },
});

const FavorisStackNavigator = createStackNavigator({
    Favorites:{
        screen: Favorites,
        navigationOptions:{
            titme: "Favorites"
        }
    },
    FilmDetail:{
        screen:FilmDetail
    },
});

const MoviestabNavigator = createBottomTabNavigator({
    Search:{
        screen: SearchStackNavigator,
        navigationOptions: {
            tabBarIcon: () => {
                return <Image 
                    source={require('../Images/ic_search.png')}
                    style={styles.icon}
                />
            }
        }
    },
    Favorites:{
        screen: FavorisStackNavigator,
        navigationOptions: {
            tabBarIcon: () => {
                return <Image 
                    source={require('../Images/ic_favorite.png')}
                    style={styles.icon}
                />
            }
        }
    },
}, {
    tabBarOptions:{
        showLabel: false,
        showIcon: true,
        activeBackgroundColor: '#dddddd',
        inactiveBackgroundColor: "#ffffff"
    }
})

const styles = StyleSheet.create({
    icon:{
        width:30,
        height:30,
    }
})
export default createAppContainer(MoviestabNavigator);