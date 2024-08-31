import {View} from "@tarojs/components";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <View className="root-layout p-8">
      {children}
    </View>
  );
}

export default RootLayout;
