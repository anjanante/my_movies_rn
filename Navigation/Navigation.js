import { createStackNavigator, createAppContainer } from 'react-navigation';
import Search from '../components/Search';

const SearchStackNavigator = createStackNavigator({
    Search:{
        screen: Search,
        navigationOptions:{
            titme: "Search"
        }
    }
});

export default createAppContainer(SearchStackNavigator);