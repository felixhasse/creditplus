import React, {Dispatch, SetStateAction, useState} from 'react';
import styled from 'styled-components';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faChevronDown} from '@fortawesome/free-solid-svg-icons'
import {faCheck} from '@fortawesome/free-solid-svg-icons'
import {Property} from "csstype";
import Display = Property.Display;


// Define the types for the DropdownProps
interface DropdownProps {
    options: Set<string>;
    selectedOption: string | undefined;
    setSelectedOption: Dispatch<SetStateAction<string | undefined>>;
    menuText: string;
}

interface ItemProps {
    isSelected: boolean
}

interface ButtonProps {
    isOpen: boolean
}

// Define the styled components
const DropdownWrapper = styled.div`
  margin-top: 1rem;
  position: relative;
  width: 320px;
  text-align: left;
`;

const DropdownButton = styled.button<ButtonProps>`
  border: ${props => props.isOpen ? '1px solid var(--primary-600) !important' : '1px solid var(--gray-200)'};
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-radius: 10px;
  background-color: white;
  font-size: 16px;
  cursor: pointer;

  h4 {
    color: ${props => props.isOpen ? 'black' : 'var(--gray-700)'};
  }

  :hover, :focus {
    border: 1px solid black;
    color: black;

    h4 {
      color: black;
    }
  }
`;

const DropdownIcon = styled(FontAwesomeIcon)`
  color: black;
`;

const DropdownContent = styled.div`
  position: absolute;
  width: 100%;
  border-radius: 10px;
  margin-top: 0.25rem;
  box-shadow: 0px 3px 9px #00000029;
  z-index: 1;

  & h4 {
    color: black;
  }

  & h4:hover {
  }
`;
const DropdownItem = styled.div<ItemProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background-color: ${props => props.isSelected ? 'var(--selected-background)' : 'white'};

  :hover {
    background-color: #ddd;
  }

  h4 {
    color: ${props => props.isSelected ? 'var(--primary-600)' : 'black'};
  }

  .checkIcon {
    color: var(--primary-600);
    display: ${props => props.isSelected ? 'block' : 'none'};
  }

`;

const Dropdown: React.FC<DropdownProps> = ({options, selectedOption, setSelectedOption, menuText}) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <DropdownWrapper>
            <DropdownButton onClick={() => setIsOpen(!isOpen)} isOpen={isOpen}>
                <h4>{selectedOption !== undefined ? selectedOption : menuText}</h4><DropdownIcon
                icon={faChevronDown}/></DropdownButton>
            {isOpen && (
                <DropdownContent>
                    {Array.from(options).map((option, index) => (
                        <DropdownItem key={index} onClick={() => {
                            setSelectedOption(option !== selectedOption ? option : undefined);
                            setIsOpen(false);
                        }}
                                      isSelected={option === selectedOption}>
                            <h4>
                                {option}
                            </h4>
                            <FontAwesomeIcon icon={faCheck} className={"checkIcon"}/>
                        </DropdownItem>
                    ))}
                </DropdownContent>
            )}
        </DropdownWrapper>
    );
};

export default Dropdown;