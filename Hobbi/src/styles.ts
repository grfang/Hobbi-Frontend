import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 20,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 20,
    marginHorizontal: 10,
    color: "#5878A7",
    textAlign: "center",
  },
  titleCaption: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  textInput: {
    height: 390,
    borderColor: "gray",
    borderWidth: 1,
    width: "80%",
    marginVertical: 20,
    padding: 10,
  },
  captionText: {
    fontSize: 25,
    color: "#333333",
    marginBottom: 5,
    textAlign: "center",
  },
  regularText: {
    fontSize: 32,
    color: "#333333",
    marginBottom: 5,
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 32,
    color: "#FFFFFF",
    textAlign: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
