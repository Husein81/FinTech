import { StyleSheet, Text, View } from "react-native";
import SortableList from "./SortableList";
import Tile from "./Tile";
const Widgets = () => {
  const tiles = [
    {
      id: "spent",
    },
    {
      id: "cashback",
    },
    {
      id: "recent",
    },
    {
      id: "cards",
    },
  ];
  return (
    <View style={styles.container}>
      <SortableList
        editing={true}
        onDragEnd={(positions) =>
          console.log(JSON.stringify(positions, null, 2))
        }
      >
        {[...tiles].map((tile, index) => (
          <Tile
            onLongPress={() => true}
            key={tile.id + "-" + index}
            id={tile.id}
          />
        ))}
      </SortableList>
    </View>
  );
};
export default Widgets;
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginBottom: 80,
  },
});
