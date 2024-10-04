import React from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";

const CryptoDetailScreen = ({ route }) => {
  const { crypto } = route.params;

  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        data: [
          crypto.priceUSD - 500,
          crypto.priceUSD,
          crypto.priceUSD + 300,
          crypto.priceUSD - 200,
          crypto.priceUSD + 400,
          crypto.priceUSD + 100,
        ],
      },
    ],
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: crypto.image }} style={styles.cryptoImage} />
      <Text style={styles.title}>
        {crypto.name} ({crypto.code})
      </Text>
      <Text>
        Current Price: {crypto.symbol}
        {crypto.priceUSD}
      </Text>
      <Text
        style={[
          styles.percentageChange,
          crypto.percentageChange >= 0
            ? styles.positiveChange
            : styles.negativeChange,
        ]}
      >
        {crypto.percentageChange >= 0
          ? `+${crypto.percentageChange}%`
          : `${crypto.percentageChange}%`}
      </Text>

      <LineChart
        data={data}
        width={Dimensions.get("window").width - 16}
        height={420}
        yAxisLabel={crypto.symbol}
        chartConfig={{
          backgroundColor: "#afafaf",
          backgroundGradientFrom: "#afafaf",
          backgroundGradientTo: "#afafaf",
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        }}
        style={styles.chart}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  cryptoImage: {
    width: 80,
    height: 80,
    alignSelf: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  percentageChange: {
    fontSize: 16,
    textAlign: "center",
  },
  positiveChange: {
    color: "green",
  },
  negativeChange: {
    color: "red",
  },
  chart: {
    marginHorizontal: -10,
    marginVertical: 16,
    borderRadius: 5,
  },
});

export default CryptoDetailScreen;
