import React from "react";
import ReactTooltip from "react-tooltip";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Nav from "react-bootstrap/Nav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function withTooltip<T extends object>(
  Component: React.ComponentType<T>
): React.FC<T & CustomTooltipElementProps> {
  return (props) => {
    const { tooltipText, elementId, ...restProps } = props;

    return (
      <>
        <Component
          {...(restProps as T)}
          data-tip={tooltipText}
          data-for={elementId}
        />
        <ReactTooltip id={elementId} delayShow={500} />
      </>
    );
  };
}

interface CustomTooltipElementProps {
  tooltipText: string;
  elementId: string;
}

// TODO: find a better way to do this than exporting every component we need
export const ButtonWithTooltip = withTooltip(Button);
export const ButtonGroupWithTooltip = withTooltip(ButtonGroup);
export const NavItemWithTooltip = withTooltip(Nav.Item);
export const IconWithTooltip = withTooltip(FontAwesomeIcon);
