import { Colors } from "@/app/theme/Colors";
import RoundButton from "@/components/RoundButton";
import { useState } from "react";
import { View } from "react-native";
import { Menu } from "react-native-paper";
import * as DropdownMenu from "zeego/dropdown-menu";

interface MenuItemProps {
  onPress?: () => void;
  title: string;
  icon: string;
}

const Dropdown = () => {
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const menuItems: MenuItemProps[] = [
    { title: "Statement", icon: "format-list-bulleted-square" },
    { title: "Converter", icon: "currency-usd" },
    { title: "Background", icon: "image" },
    { title: "Add new account", icon: "account-plus" },
  ];
  return (
    <View
      style={{
        paddingTop: 50,
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <Menu
        visible={visible}
        contentStyle={{ backgroundColor: Colors.background }}
        onDismiss={closeMenu}
        anchor={
          <View style={{ marginTop: -50 }}>
            <RoundButton
              icon="ellipsis-horizontal"
              text="More"
              onPress={openMenu}
            />
          </View>
        }
      >
        {menuItems.map((item, index) => (
          <View key={index}>
            <Menu.Item
              onPress={() => {}}
              title={item.title}
              leadingIcon={item.icon}
            />
          </View>
        ))}
      </Menu>
    </View>
  );
};
export default Dropdown;
