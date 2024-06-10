import { NavigationContainerRef } from "@react-navigation/native";
import { RootStackNavigatorParamList } from "./RootStack";
import React from "react";

type ParamList = RootStackNavigatorParamList;

type RouteName = keyof ParamList;

export const navigationRef =
  React.createRef<NavigationContainerRef<ParamList>>();

export function navigate(name: RouteName, params?: any) {
  // @ts-ignore: pretty difficult to create a type and therefore it is limited to a description of the name
  navigationRef.current?.navigate(name, params);
}

export function reset(name: string, params = {}) {
  navigationRef.current?.reset({ routes: [{ name, ...params }] });
}

export function goBack() {
  navigationRef.current?.canGoBack() && navigationRef.current?.goBack();
}
