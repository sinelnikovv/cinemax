import React from "react";

import { NavigationContainerRef } from "@react-navigation/native";

import { AuthStackNavigatorParamList } from "@src/navigation/AuthStack";
import { MainBottomTabNavigatorParamList } from "@src/navigation/MainBottomTab";
import { RootStackNavigatorParamList } from "@src/navigation/RootStack";

type ParamList = RootStackNavigatorParamList &
  AuthStackNavigatorParamList &
  MainBottomTabNavigatorParamList;

type RouteName = keyof ParamList;

export const navigationRef =
  React.createRef<NavigationContainerRef<ParamList>>();

export function navigate(name: RouteName, params?: any) {
  navigationRef.current?.navigate(name, params);
}

export function reset(name: string, params = {}) {
  navigationRef.current?.reset({ routes: [{ name, ...params }] });
}

export function goBack() {
  navigationRef.current?.canGoBack() && navigationRef.current?.goBack();
}
