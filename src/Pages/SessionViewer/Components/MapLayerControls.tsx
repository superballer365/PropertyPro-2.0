import React from "react";
import { MapContext } from "../../../Contexts/MapContext";
import DropdownButton from "react-bootstrap/esm/DropdownButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLayerGroup,
  IconDefinition,
  faEyeSlash,
  faTrafficLight,
  faBiking,
  faSubway,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./MapLayerControls.module.scss";
import Dropdown from "react-bootstrap/esm/Dropdown";
import Button from "react-bootstrap/esm/Button";
import ButtonGroup from "react-bootstrap/esm/ButtonGroup";
import classNames from "classnames";

export default function MapLayerControls() {
  const { map } = React.useContext(MapContext);

  const layerOptions: LayerOption[] = React.useMemo(
    () => [
      { label: "None", value: undefined, icon: faEyeSlash },
      // NOTE: TransitLayer types are messed up, hence the cast here
      {
        label: "Transit",
        value: new google.maps.TransitLayer(),
        icon: faSubway,
      } as unknown as LayerOption,
      {
        label: "Bicycle",
        value: new google.maps.BicyclingLayer(),
        icon: faBiking,
      },
      {
        label: "Traffic",
        value: new google.maps.TrafficLayer(),
        icon: faTrafficLight,
      },
    ],
    []
  );

  const [selectedOption, setSelectedOption] = React.useState(layerOptions[0]);
  const [showDropdown, setShowDropdown] = React.useState(false);

  const onToggleHandler = (
    isOpen: boolean,
    event: React.SyntheticEvent<Dropdown, Event>,
    metadata: {
      source: "select" | "click" | "rootClose" | "keydown";
    }
  ) => {
    if (metadata.source != "select") {
      setShowDropdown(isOpen);
    }
  };

  const handleLayerClick = (selectedOption: LayerOption) => {
    setSelectedOption(selectedOption);
    layerOptions.forEach((option) => {
      if (option === selectedOption) {
        option.value && map && option.value.setMap(map);
      } else {
        option.value && option.value.setMap(null);
      }
    });
  };

  return (
    <DropdownButton
      className={classNames(styles.dropdown, "shadow")}
      variant="light"
      title={<FontAwesomeIcon icon={faLayerGroup} />}
      as={ButtonGroup}
      show={showDropdown}
      menuAlign="right"
      onToggle={(isOpen, e, metadata) => onToggleHandler(isOpen, e, metadata)}
    >
      {layerOptions.map((option) => (
        <Dropdown.Item
          className={styles.item}
          key={option.label}
          as={Button}
          onClick={() => handleLayerClick(option)}
          active={option === selectedOption}
        >
          <FontAwesomeIcon className="mr-2" icon={option.icon} />
          {option.label}
        </Dropdown.Item>
      ))}
    </DropdownButton>
  );
}

interface LayerOption {
  label: string;
  icon: IconDefinition;
  value:
    | undefined
    | {
        getMap: () => google.maps.Map | null;
        setMap: (map: google.maps.Map | null) => void;
      };
}
