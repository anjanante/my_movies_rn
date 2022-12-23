import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
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

export default createAppContainer(SearchStackNavigator);