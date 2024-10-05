import { SearchBar } from "@rneui/themed"
import { View } from "react-native"
import { ColorItem, styles } from "../../../../styles/StylesGlobal"

export const CustomSeachBar = ({searchText, handleSearchBarClear, selectedOption, setSearchText}) => {
    return(
        <View style={styles.searchArea}>
            <SearchBar
              platform="android"
              containerStyle={styles.search}
              inputContainerStyle={{ 
                borderRadius:5,
                color:"#fff",
                backgroundColor: "#ccc" }}
              onChangeText={(t) => setSearchText(t)}
              placeholder={`Buscar ${selectedOption}`}
              placeholderTextColor={ColorItem.DeepFir}
              value={searchText}
              onCancel={handleSearchBarClear}
              onClear={handleSearchBarClear}
            />
          </View>
    )
}