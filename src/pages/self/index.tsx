import {Text, View} from "@tarojs/components";
import TestComponent from "../../components/testComponent";

const Self = () => {
  return (
    <View className="self">
      <Text>This is a self page</Text>
      <TestComponent/>
    </View>
  )
}

export default Self;
