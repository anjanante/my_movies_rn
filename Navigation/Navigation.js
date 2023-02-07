import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Search from '../components/Search';
import FilmDetail from '../components/FilmDetail';

const SearchStackNavigator = createStackNavigator({
    Search:{
        screen: Search,
        navigationOptions:{
            titme: "Search"
        }
    },
    FilmDetail:{
        screen:FilmDetail
    }
});

const MoviestabNavigator = createBottomTabNavigator({
    Search:{
        screen: SearchStackNavigator,
    },
})
export default createAppContainer(MoviestabNavigator);