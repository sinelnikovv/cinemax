import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import DropDownPicker from "react-native-dropdown-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { moderateScale } from "react-native-size-matters";

import ArrowIcon from "@assets/images/ArrowIcon";
import { discoverFilters } from "@src/store/types";
import { colors } from "@src/theme";

import Button from "../shared/Button";
import { Checkbox } from "../shared/inputs";
import RegularText from "../shared/RegularText";

type Props = {
  filters: discoverFilters;
  setFilters: React.Dispatch<React.SetStateAction<discoverFilters>>;
};

const Filters = ({ filters, setFilters }: Props) => {
  const [isYearVisible, setYearVisibility] = useState(false);
  const [isBeforeVisible, setBeforeVisibility] = useState(false);
  const [isAfterVisible, setAfterVisibility] = useState(false);
  const [isOpenSorting, setOpenSorting] = useState(false);

  const sortingOptions = [
    {
      label: "Name",
      value: "title.asc",
      icon: () => <ArrowIcon direction='up' />,
    },
    {
      label: "Name",
      value: "title.desc",
      icon: () => <ArrowIcon direction='down' />,
    },
    {
      label: "Popularity",
      value: "popularity.asc",
      icon: () => <ArrowIcon direction='up' />,
    },
    {
      label: "Popularity",
      value: "popularity.desc",
      icon: () => <ArrowIcon direction='down' />,
    },
    {
      label: "Revenue",
      value: "revenue.asc",
      icon: () => <ArrowIcon direction='up' />,
    },
    {
      label: "Revenue",
      value: "revenue.desc",
      icon: () => <ArrowIcon direction='down' />,
    },
    {
      label: "Release Date",
      value: "release_date.asc",
      icon: () => <ArrowIcon direction='up' />,
    },
    {
      label: "Release Date",
      value: "release_date.desc",
      icon: () => <ArrowIcon direction='down' />,
    },
    {
      label: "Votes",
      value: "vote_average.asc",
      icon: () => <ArrowIcon direction='up' />,
    },
    {
      label: "Votes",
      value: "vote_average.desc",
      icon: () => <ArrowIcon direction='down' />,
    },
  ];

  return (
    <View style={styles.container}>
      <DropDownPicker
        placeholder='Sort by ...'
        open={isOpenSorting}
        value={filters.sort_by}
        setValue={(callback) =>
          setFilters((prev) => ({
            ...prev,
            sort_by: callback(prev.sort_by),
          }))
        }
        items={sortingOptions}
        setOpen={setOpenSorting}
        closeAfterSelecting={true}
        itemSeparator={true}
        theme='DARK'
        mode='BADGE'
        style={styles.selectorContainer}
        dropDownContainerStyle={styles.dropDownContainerStyle}
      />
      <View style={styles.row}>
        <RegularText>Release Year</RegularText>
        <TouchableOpacity
          onPress={() => setYearVisibility(true)}
          style={styles.input}
        >
          <RegularText>{filters.primary_release_year}</RegularText>
          <DateTimePickerModal
            isVisible={isYearVisible}
            mode='date'
            onConfirm={(date) => {
              setFilters((prev) => ({
                ...prev,
                primary_release_year: date.getFullYear(),
              }));
              setYearVisibility(false);
            }}
            onCancel={() => setYearVisibility(false)}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <RegularText>Released Before</RegularText>
        <TouchableOpacity
          onPress={() => setBeforeVisibility(true)}
          style={styles.input}
        >
          <RegularText>{filters["primary_release_date.lte"]}</RegularText>
          <DateTimePickerModal
            isVisible={isBeforeVisible}
            mode='date'
            onConfirm={(date) => {
              setFilters((prev) => ({
                ...prev,
                "primary_release_date.lte": date.getFullYear().toString(),
              }));
              setBeforeVisibility(false);
            }}
            onCancel={() => setBeforeVisibility(false)}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <RegularText>Released After</RegularText>
        <TouchableOpacity
          onPress={() => setAfterVisibility(true)}
          style={styles.input}
        >
          <RegularText>{filters["primary_release_date.gte"]}</RegularText>
          <DateTimePickerModal
            isVisible={isAfterVisible}
            mode='date'
            onConfirm={(date) => {
              setFilters((prev) => ({
                ...prev,
                "primary_release_date.gte": date.getFullYear().toString(),
              }));
              setAfterVisibility(false);
            }}
            onCancel={() => setAfterVisibility(false)}
          />
        </TouchableOpacity>
      </View>
      <Checkbox
        value={filters.include_adult}
        onChange={() =>
          setFilters((prev) => ({
            ...prev,
            include_adult: !prev.include_adult,
          }))
        }
        label={<RegularText textAlign='left'>Include adult</RegularText>}
        type='rounded'
      />
      <View style={{ flexDirection: "row", gap: moderateScale(16) }}>
        <Button
          containerStyle={{ flex: 1 }}
          onPress={() => setFilters(filters)}
        >
          Apply
        </Button>
        <Button
          containerStyle={{ flex: 1 }}
          type='outlined'
          onPress={() => {
            setFilters({
              include_adult: true,
              sort_by: "popularity.desc",
            });
            setFilters({
              include_adult: true,
              sort_by: "popularity.desc",
            });
          }}
        >
          Cancel
        </Button>
      </View>
    </View>
  );
};

export default Filters;

const styles = StyleSheet.create({
  container: {
    paddingBottom: moderateScale(16),
    paddingTop: moderateScale(56),
    paddingHorizontal: moderateScale(16),
    backgroundColor: colors.soft,
    height: moderateScale(400),
    justifyContent: "space-between",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  input: {
    padding: 6,
    backgroundColor: colors.dark,
    borderRadius: moderateScale(40),
    width: moderateScale(70),
    color: colors.white,
    textAlign: "center",
  },
  selectorContainer: {
    borderWidth: 0,
    backgroundColor: colors.dark,
    marginBottom: moderateScale(16),
  },
  dropDownContainerStyle: {
    borderColor: colors.soft,
  },
});
